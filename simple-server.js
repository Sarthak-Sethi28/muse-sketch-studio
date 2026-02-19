// Simple server with real Replicate API calls
import http from 'http';
import https from 'https';
import { readFileSync } from 'fs';

const PORT = process.env.PORT || 3001;

// Read environment variables (from .env file and/or process.env - process.env wins)
let envVars = {};
try {
  const envContent = readFileSync('.env', 'utf8');
  envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...values] = line.split('=');
      envVars[key] = values.join('=').replace(/"/g, '').replace(/\r/g, '').trim();
    }
  });
} catch (error) {
  // No .env file - use process.env only (e.g. on Render, Vercel)
}
// process.env overrides .env (needed for Render/Vercel where vars are set in dashboard)
if (process.env.REPLICATE_API_TOKEN) envVars.REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
if (process.env.MODEL_ID) envVars.MODEL_ID = process.env.MODEL_ID;
if (process.env.PROMPT_TEMPLATE) envVars.PROMPT_TEMPLATE = process.env.PROMPT_TEMPLATE;

// Function to make Replicate API calls with retry logic for E003 service unavailable
async function callReplicateAPI(model, input, isVideo = false, attempt = 0) {
  const maxRetries = 4;
  const retryDelays = [5000, 10000, 20000, 40000]; // exponential backoff up to 40s

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ input });

    const options = {
      hostname: 'api.replicate.com',
      port: 443,
      path: `/v1/models/${model}/predictions`,
      method: 'POST',
      headers: {
        'Authorization': `Token ${envVars.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 201) {
            pollPrediction(response.id, resolve, reject, 0, isVideo, model, input, attempt);
          } else {
            reject(new Error(`API Error: ${res.statusCode} - ${data}`));
          }
        } catch (error) {
          reject(new Error(`Parse Error: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Request Error: ${error.message}`));
    });

    req.write(postData);
    req.end();
  }).catch(async (err) => {
    // Retry on E003 (service unavailable) or 500 transient errors
    const isRetryable = err.message.includes('E003') || 
                        err.message.includes('Service is currently unavailable') ||
                        err.message.includes('currently unavailable');
    if (isRetryable && attempt < maxRetries) {
      const delay = retryDelays[attempt];
      console.log(`⚠️ Replicate service busy (E003), retrying in ${delay / 1000}s... (attempt ${attempt + 1}/${maxRetries})`);
      await new Promise(r => setTimeout(r, delay));
      return callReplicateAPI(model, input, isVideo, attempt + 1);
    }
    throw err;
  });
}

// Function to poll prediction status
function pollPrediction(predictionId, resolve, reject, attempts = 0, isVideo = false, model = null, input = null, apiAttempt = 0) {
  const maxAttempts = isVideo ? 240 : 60; // 20 minutes for video, 5 minutes for images
  
  if (attempts >= maxAttempts) {
    reject(new Error('Prediction timeout'));
    return;
  }

  const options = {
    hostname: 'api.replicate.com',
    port: 443,
    path: `/v1/predictions/${predictionId}`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${envVars.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        
        if (response.status === 'succeeded') {
          resolve(response.output);
        } else if (response.status === 'failed') {
          const errMsg = response.error || '';
          // Retry the whole prediction if Replicate says service unavailable (E003)
          const isRetryable = errMsg.includes('E003') || errMsg.includes('Service is currently unavailable') || errMsg.includes('currently unavailable');
          const maxApiRetries = 4;
          if (isRetryable && model && input && apiAttempt < maxApiRetries) {
            const delay = [5000, 10000, 20000, 40000][apiAttempt];
            console.log(`⚠️ Prediction failed with E003, retrying in ${delay / 1000}s... (attempt ${apiAttempt + 1}/${maxApiRetries})`);
            setTimeout(() => {
              callReplicateAPI(model, input, isVideo, apiAttempt + 1).then(resolve).catch(reject);
            }, delay);
          } else {
            reject(new Error(`Prediction failed: ${errMsg}`));
          }
        } else if (response.status === 'processing' || response.status === 'starting') {
          // Still processing, poll again after 5 seconds
          setTimeout(() => {
            pollPrediction(predictionId, resolve, reject, attempts + 1, isVideo, model, input, apiAttempt);
          }, 5000);
        } else {
          reject(new Error(`Unknown status: ${response.status}`));
        }
      } catch (error) {
        reject(new Error(`Parse Error: ${error.message}`));
      }
    });
  });

  req.on('error', (error) => {
    reject(new Error(`Request Error: ${error.message}`));
  });

  req.end();
}

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      env_check: {
        replicate_token: !!envVars.REPLICATE_API_TOKEN,
        model_id: envVars.MODEL_ID || 'using default',
        prompt_template: !!envVars.PROMPT_TEMPLATE
      }
    }));
    return;
  }

  if (req.method === 'POST' && req.url === '/api/generate-sketch') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const { prompt, editInstruction, garmentType, gender, detailedFeatures, previousSketchUrl, uploadedImageUrl, uploadedLogoUrl, useUploadedImage, designHistory } = data;

        if (!prompt) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Prompt is required', success: false }));
          return;
        }

        if (!envVars.REPLICATE_API_TOKEN) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            error: 'REPLICATE_API_TOKEN not configured',
            success: false 
          }));
          return;
        }

        console.log('\n🎨 ===== GENERATION REQUEST =====');
        console.log('Original Design:', prompt);
        if (editInstruction) {
          console.log('🔄 EDIT INSTRUCTION:', editInstruction);
          console.log('   (Will preserve original design and only apply this edit)');
        }
        console.log('Gender:', gender, 'Garment:', garmentType);
        if (previousSketchUrl) {
          console.log('🔄 EDIT MODE: Refining based on previous sketch');
        }
        if (uploadedImageUrl) {
          console.log('📷 Using uploaded base image');
        }
        if (uploadedLogoUrl) {
          console.log('✨✨✨ LOGO DETECTED! Logo will be placed creatively on garment ✨✨✨');
          console.log('Logo data type:', uploadedLogoUrl.startsWith('data:') ? 'Base64 image' : 'URL');
          console.log('Logo data length:', uploadedLogoUrl.length, 'characters');
          console.log('Logo preview:', uploadedLogoUrl.substring(0, 100) + '...');
        } else {
          console.log('⚠️⚠️⚠️ NO LOGO PROVIDED - AI will create text/graphics instead of using your logo ⚠️⚠️⚠️');
          console.log('📌 TIP: Upload your logo image in the "Add Logo/Graphics" section');
        }
        console.log('================================\n');

        try {
          // Create comprehensive detailed description from ALL features
          const features = [];
          if (detailedFeatures) {
            if (detailedFeatures.fabric) features.push(`${detailedFeatures.fabric} fabric`);
            if (detailedFeatures.pattern) features.push(`${detailedFeatures.pattern} pattern`);
            if (detailedFeatures.shoulders) features.push(`${detailedFeatures.shoulders} shoulders`);
            if (detailedFeatures.sleeves) features.push(`${detailedFeatures.sleeves} sleeves`);
            if (detailedFeatures.neckline) features.push(`${detailedFeatures.neckline} neckline`);
            if (detailedFeatures.collar) features.push(`${detailedFeatures.collar} collar`);
            if (detailedFeatures.waist) features.push(`${detailedFeatures.waist} waist`);
            if (detailedFeatures.length) features.push(`${detailedFeatures.length} length`);
            if (detailedFeatures.fit) features.push(`${detailedFeatures.fit} fit`);
            if (detailedFeatures.embellishments && detailedFeatures.embellishments !== 'None') features.push(`with ${detailedFeatures.embellishments}`);
            if (detailedFeatures.closure) features.push(`${detailedFeatures.closure} closure`);
            if (detailedFeatures.pockets && detailedFeatures.pockets !== 'No pockets') features.push(`${detailedFeatures.pockets}`);
            if (detailedFeatures.backDetail && detailedFeatures.backDetail !== 'Plain') features.push(`${detailedFeatures.backDetail} back`);
            if (detailedFeatures.hemStyle) features.push(`${detailedFeatures.hemStyle} hem`);
          }
          const featureDescription = features.length > 0 ? `with ${features.join(', ')}` : '';

          const genderContext = gender ? `designed for ${gender.toLowerCase()}` : '';
          
          // Use google/nano-banana for fashion sketch generation
          let fullPrompt;
          let negativePrompt = "";
          
          // Determine if using uploaded image or AI-generated sketch
          const baseImage = useUploadedImage && uploadedImageUrl ? uploadedImageUrl : previousSketchUrl;
          
          if (baseImage) {
            // REFINEMENT MODE: Keep the original image/sketch, only modify what changed
            let logoInstruction = "";
            // IMPORTANT: Don't send logo instructions in edit mode - the logo is already placed
            // Sending it again confuses the AI and makes it recreate the whole design
            
            // Use editInstruction if provided (explicit edit), otherwise use the prompt text
            const changeToApply = editInstruction || prompt;
            
            // Build conversation context if design history exists
            let conversationContext = "";
            if (designHistory && designHistory.length > 0) {
              conversationContext = `\n📝 CONVERSATION HISTORY (for context only - DO NOT recreate these, the image already has them):\n`;
              designHistory.forEach((entry, index) => {
                conversationContext += `${index + 1}. ${entry}\n`;
              });
              conversationContext += `\nAll of the above are ALREADY in the image. Do NOT redo them.\n`;
            }
            
            fullPrompt = `🚨🚨🚨 ABSOLUTE CRITICAL RULE: THIS IS A MICRO-EDIT, NOT A REDESIGN 🚨🚨🚨

YOU ARE EDITING AN EXISTING IMAGE. YOUR JOB IS TO COPY IT 99.9% AND CHANGE ONLY 0.1%.

📸 REFERENCE IMAGE: This shows the CURRENT design state
✏️ YOUR ONLY TASK: "${changeToApply}"
${conversationContext}
🔒 IRONCLAD EDITING RULES - ZERO EXCEPTIONS:

1. COPY THE REFERENCE IMAGE EXACTLY:
   - Same jacket style, silhouette, shape
   - Same collar design and position  
   - Same zipper placement and style
   - Same pocket positions and shapes
   - Same sleeve style and cuffs
   - Same hem and waistband
   - Same construction lines and seams
   - Same proportions and fit

2. PRESERVE ALL EXISTING LOGOS/GRAPHICS:
   - Keep logos in the SAME positions
   - Keep logos at the SAME size (unless specifically asked to change size)
   - Keep logo styles identical
   - If changing logo size: make it 50% smaller or bigger, not 500% different

3. YOUR EDIT: "${changeToApply}"
   - This is the ONLY thing you can change
   - Change NOTHING else
   - Be LITERAL - if it says "make logo smaller", make it 30-50% smaller, not change its position
   - If it says "keep same", DO NOT TOUCH IT AT ALL

4. WHAT "KEEP THE SAME" MEANS:
   - 100% identical - no variation whatsoever
   - Same position, same size, same angle, same everything
   - Not "similar" - IDENTICAL

🚫 ABSOLUTELY FORBIDDEN - WILL RESULT IN FAILURE:
❌ Making the logo bigger when asked to make it smaller
❌ Moving logos to different positions when not asked
❌ Changing the jacket design or structure
❌ Adding new design elements
❌ Removing existing elements not mentioned
❌ "Improving" or "enhancing" anything
❌ Creating a new interpretation
❌ Making it "look better"

✅ CORRECT APPROACH:
1. Take the reference image
2. Copy it pixel-by-pixel (99.9% exact duplicate)
3. Make ONLY this microscopic change: "${changeToApply}"
4. Output the result

📚 EXAMPLES OF CORRECT MICRO-EDITS:
Example 1: "Make logo smaller"
  CORRECT: Keep jacket identical, reduce logo size by 40%, same position
  WRONG: Redesign jacket, change logo position, make it bigger instead

Example 2: "Add text on chest"
  CORRECT: Copy entire design, add small text only on chest, everything else identical
  WRONG: Redesign the whole garment, change existing logos, move elements around

Example 3: "Change sleeve pattern"  
  CORRECT: Duplicate everything, only modify sleeve pattern, keep logo/design/structure
  WRONG: New jacket design, different fit, moved logos, changed proportions

Think: "I'm using Photoshop's micro-edit tool, not the redesign button. CMD+C, CMD+V the image, then make ONE tiny change."

⚠️ CRITICAL: With image_strength=0.98, you MUST preserve 98% of the reference image exactly. Only 2% can change.

CONTEXT (ignore this, use the VISUAL reference): ${prompt}`;
            negativePrompt = "completely new design, different garment, redesigned, reimagined, alternative version, new interpretation, different style, changed silhouette, modified structure, new outfit, different design, recreated design, similar design, inspired by, large logo, oversized logo, huge branding, massive graphics, enlarged text, bigger logo, logo enlargement";
          } else {
            // INITIAL GENERATION MODE: Create new sketch
            if (uploadedLogoUrl) {
              fullPrompt = `🚨 LOGO PLACEMENT — TOP PRIORITY 🚨
A logo/graphic is provided in image_input. Place it on the garment. The user does not need to ask — this is your creative responsibility.

LOGO PLACEMENT RULES:
- Size: SMALL and refined — think Stone Island sleeve badge, Loro Piana chest crest, Lacoste croc, Polo pony, AMI heart — subtle luxury, not billboard
- Position: your creative choice — left chest, sleeve arm, collar, cuff, subtle hem — wherever feels most natural for this garment
- Copy it EXACTLY as provided (shape, colors, proportions) — do NOT redraw as text
- It should feel like a premium brand finishing detail, factory-embroidered or woven in

NOW DRAW THE GARMENT — Professional Fashion Design Sketch:
You are a senior designer at a Paris/Milan fashion house. Create a beautiful, fashion-forward design sketch.

Garment: ${garmentType || 'garment'} ${genderContext} ${featureDescription}
Design direction: ${prompt}

SKETCH REQUIREMENTS:
- Confident, expressive pencil line drawing on white paper — the kind you'd see in a Valentino or Bottega Veneta atelier
- Beautifully proportioned silhouette with strong fashion attitude
- Show all construction details: seams, topstitching, darts, closures, pockets — drawn with precision
- Include subtle shading and texture indication to show fabric quality
- Clean, sophisticated drape and fit — garment should look wearable and desirable
- The sketch itself should look like high-end designer portfolio work

Style reference: Central Saint Martins graduate portfolio, Vogue Paris illustration, atelier design sketch
Output: Hand-drawn fashion illustration, pencil on white paper, professional black line art`;

              negativePrompt = "photograph, photo, 3D render, photorealistic, finished product, product mockup, model, realistic fabric, childish drawing, amateur sketch, crude lines, messy, ugly proportions, unfashionable, frumpy, text labels, written words, brand names as text, recreated logo, oversized logo, huge logo, giant logo, massive logo, full back print, logo covering entire garment";
            } else {
              fullPrompt = `Professional Fashion Design Sketch — Atelier Quality

You are a senior designer at a Paris/Milan fashion house. Create a beautiful, fashion-forward design sketch.

Garment: ${garmentType || 'garment'} ${genderContext} ${featureDescription}
Design direction: ${prompt}

SKETCH REQUIREMENTS:
- Confident, expressive pencil line drawing on white paper — the kind you'd see in a Valentino or Bottega Veneta atelier
- Beautifully proportioned silhouette with strong fashion attitude and clear design point of view
- Show all construction details with precision: seams, topstitching, darts, closures, pockets, button placement
- Include subtle shading and cross-hatching to indicate fabric texture and drape
- Clean, sophisticated fit — garment should look wearable, desirable, and genuinely fashionable
- The sketch should feel like it belongs in a high-end designer portfolio or Vogue feature
- Think about the overall look: what makes this garment special, interesting, covetable?

Style reference: Central Saint Martins graduate portfolio, Maison Margiela technical sketches, Vogue Paris illustration, Rick Owens atelier drawings
Output: Hand-drawn fashion illustration on white paper, expressive black pencil line art, professional designer sketch`;

              negativePrompt = "photograph, photo, 3D render, photorealistic, finished product, product mockup, model wearing clothes, childish drawing, amateur sketch, crude lines, messy, ugly proportions, unfashionable, frumpy, boring design, generic garment, plain unremarkable clothing, text labels";
            }
          }
          
          // Build image_input array
          const imageInputs = [];
          if (baseImage) {
            imageInputs.push(baseImage);
            // In edit mode, DO NOT send the logo again — it's already baked into the base image
          } else {
            // NEW DESIGN: logo goes FIRST so the AI sees it as the primary reference
            if (uploadedLogoUrl) {
              imageInputs.push(uploadedLogoUrl);
              console.log('🏷️  Logo placed as image_input[0] — AI will use it as primary reference');
            }
            if (data.sketchSvg) {
              imageInputs.push(data.sketchSvg);
            }
          }
          
          const input = {
            prompt: fullPrompt,
            image_input: imageInputs.length > 0 ? imageInputs : undefined,
            output_format: "jpg"
          };
          
          // For edit mode, add image strength to preserve original design better
          if (baseImage && negativePrompt) {
            input.negative_prompt = negativePrompt;
            // MAXIMUM image strength for micro-edits - 0.98 means 98% preservation
            input.image_strength = 0.98; // Changed from 0.95 to 0.98 for better preservation
            console.log('🔒 EDIT MODE: Using image_strength 0.98 for MAXIMUM design preservation (micro-edits only)');
          }

          console.log(`\n📸 ===== API CALL INFO =====`);
          console.log(`Mode: ${baseImage ? '🔄 EDIT/REFINE (Micro-Edit)' : '✨ NEW DESIGN'}`);
          console.log(`Images: ${imageInputs.length} total`);
          if (baseImage) {
            console.log(`   📋 Image 1: Base design to preserve (contains existing design with logos already placed)`);
            console.log(`   🚫 NOT sending logo again - already in the design`);
            console.log(`Image Strength: ${input.image_strength} (0.98 = 98% preservation, only micro-changes allowed)`);
          } else {
            if (uploadedLogoUrl) {
              console.log(`   🏷️  Image 1: LOGO to place on garment`);
            }
          }
          console.log(`============================\n`);

          const output = await callReplicateAPI('google/nano-banana', input);
          
          // Extract image URL from output (could be array or direct URL)
          const imageUrl = Array.isArray(output) ? output[0] : output;
          
          if (!imageUrl) {
            throw new Error('No image URL returned from API');
          }

          console.log('Sketch generated successfully:', imageUrl);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            imageUrl: imageUrl,
            success: true,
            step: 'sketch'
          }));

        } catch (error) {
          console.error('Error generating sketch:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            error: `Generation failed: ${error.message}`,
            success: false 
          }));
        }

      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          error: 'Invalid JSON',
          success: false 
        }));
      }
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/add-colors') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const { sketchUrl, colors, prompt, previousColoredUrl } = data;

        if (!sketchUrl) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Sketch URL is required', success: false }));
          return;
        }

        console.log('Adding colors to sketch:', colors);
        if (previousColoredUrl) {
          console.log('Refining based on previous colored version:', previousColoredUrl);
        }

        const colorPrompt = colors && colors.length > 0 ? `ONLY ${colors.join(' and ')}` : "appropriate colors";
        const colorList = colors && colors.length > 0 ? colors.join(', ') : "";
        
        let fullPrompt;
        let negativePrompt = "rainbow colors, multicolor, multiple colors, varied colors, colorful mix, color variety";
        
        if (previousColoredUrl) {
          fullPrompt = `COLOR REFINEMENT — MICRO EDIT ONLY. Copy the reference garment 99% exactly and make ONLY this change: "${prompt || "refine the colors"}".

COLOR RULE: Use ONLY these colors: ${colorPrompt}. No other colors.

DESIGN PRINCIPLE: Use darker shades on heavier pieces (jacket, coat, blazer, outer layer) and lighter tones on lighter elements (shirt, liner, undershirt, inner layers). This creates a natural, fashionable hierarchy.

KEEP IDENTICAL: silhouette, proportions, all design details, seams, pockets, closures, logos, embellishments — everything except what is explicitly asked to change.

QUALITY: The result must look like a high-end fashion editorial product shot — rich color depth, beautiful fabric rendering, sophisticated color story. Colors should feel intentional and luxurious, not flat or washed out.`;
          negativePrompt += ", different design, new garment, redesigned, altered silhouette, changed proportions, new style, alternative design, modified structure, flat colors, dull colors, washed out, muddy colors";
        } else {
          fullPrompt = `Fashion Colorization — Luxury Editorial Quality

You are colorizing a fashion design sketch for a high-end brand lookbook. Your job: make this garment look genuinely beautiful, desirable, and fashion-forward.

COLOR PALETTE: Use ONLY ${colorPrompt}${colorList ? ` (${colorList})` : ''}. No other colors.

COLORIZATION APPROACH:
- Apply colors with depth and richness — show fabric weight, sheen, and texture through color variation
- Use tonal shading within the specified palette to create dimension (highlights, midtones, shadows)
- Make the garment look like it was photographed in a luxury fashion studio — saturated but sophisticated
- Preserve all sketch construction lines so the design detail remains crisp and clear
- ${prompt ? `Additional direction: ${prompt}` : "Make the color story feel cohesive and intentional — the kind of colorway you would see in a Zegna, Loro Piana, or JW Anderson collection"}

OUTPUT: The garment should look like it belongs in a high-end fashion lookbook — beautiful color rendering, professional illustration quality, desirable and covetable.`;
          negativePrompt += ", rainbow, multicolor, color variety, garish colors, clashing colors, neon, flat colors, dull colors, washed out, muddy, ugly color combination";
        }

        const input = {
          prompt: fullPrompt,
          image_input: previousColoredUrl ? [previousColoredUrl] : [sketchUrl],
          output_format: "jpg"
        };
        
        if (negativePrompt) {
          input.negative_prompt = negativePrompt;
        }
        
        // For refinement mode, use high image strength to preserve design
        if (previousColoredUrl) {
          input.image_strength = 0.90; // Very high preservation when editing colors
        }

        const output = await callReplicateAPI('google/nano-banana', input);
        const imageUrl = Array.isArray(output) ? output[0] : output;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          imageUrl: imageUrl,
          success: true,
          step: 'colored'
        }));

      } catch (error) {
        console.error('Error adding colors:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          error: `Color generation failed: ${error.message}`,
          success: false 
        }));
      }
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/generate-model') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const { designUrl, modelType = "diverse fashion model", gender = "", pose = "standing" } = data;

        if (!designUrl) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Design URL is required', success: false }));
          return;
        }

        console.log('Generating model photo from design:', designUrl.substring(0, 80) + '...');
        console.log('⚠️⚠️⚠️  CRITICAL: Model must wear the EXACT design from the reference image ⚠️⚠️⚠️');

        const isMale = gender === 'men' || gender === 'male';
        const isFemale = gender === 'women' || gender === 'female';
        const genderInstruction = isMale
          ? 'The model MUST be a MAN (male, masculine features, male body).'
          : isFemale
            ? 'The model MUST be a WOMAN (female, feminine features, female body).'
            : '';
        const genderNegative = isMale
          ? 'woman, female, girl, feminine, she, her,'
          : isFemale
            ? 'man, male, boy, masculine, he, him,'
            : '';

        const fullPrompt = `High-Fashion Editorial Photograph — Reproduce Exact Garment from Reference

${genderInstruction ? `MODEL: ${genderInstruction}` : ''}

Reproduce THE EXACT garment from the reference image onto a ${modelType}. Every color, texture, pattern, logo, and design detail must be faithfully recreated — no changes, no improvements, no interpretations.

GARMENT ACCURACY (non-negotiable):
- Exact colors and colorway
- Exact patterns at correct scale and placement
- Logos at exact same size and position (small/tasteful if present in reference)
- Same garment type, silhouette, cut, and construction
- All details: pockets, zippers, buttons, seams, collars, hems — identical
${isMale ? '- Male model — masculine features, male body proportions' : isFemale ? '- Female model — feminine features, female body proportions' : ''}

PHOTOGRAPHY & STYLING (make it look incredible):
- FULL BODY SHOT — model visible from head to toe. Face and head MUST be included — no cropping, no headless shots
- Model: slim, high-fashion physique, relaxed confident posture, face visible and well-lit
- Dramatic studio lighting: key light from 45° with soft fill, subtle rim light — the way Zegna or Brunello Cucinelli shoots their campaigns
- Clean off-white seamless studio background
- Sharp focus across the entire image — garment and model face both clearly visible
- The model should look genuinely stylish and confident, like they belong in this garment
- Retouched, polished, editorial quality — this is a luxury brand campaign hero shot

Think: "I'm the photographer for a luxury fashion house campaign — full body with face visible, garment is exact, model is perfect"`;

        const input = {
          prompt: fullPrompt,
          image_input: [designUrl],
          output_format: "jpg",
          image_strength: 0.92,
          negative_prompt: `${genderNegative} different outfit, different garment, changed design, altered colors, modified patterns, different clothing, new design, redesigned clothes, similar style, inspired by, alternative version, different interpretation, wrong garment type, unfashionable, frumpy, cheap looking, low quality, blurry, ugly, bad lighting, flat lighting, washed out, overexposed, cropped body, cropped head, headless, no face, face cut off, missing head, missing face, head cropped out, half body, torso only`
        };

        console.log('📸 Generating model photo with MAXIMUM design preservation (image_strength: 0.92)');
        console.log('🎯 Reference design URL is being sent to AI model...');

        const output = await callReplicateAPI('google/nano-banana', input);
        const imageUrl = Array.isArray(output) ? output[0] : output;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          imageUrl: imageUrl,
          success: true,
          step: 'model'
        }));

      } catch (error) {
        console.error('Error generating model photo:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          error: `Model generation failed: ${error.message}`,
          success: false 
        }));
      }
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/generate-angles') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const { modelPhotoUrl, coloredUrl, garmentType, detailedFeatures } = data;

        if (!modelPhotoUrl) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Model photo URL is required', success: false }));
          return;
        }

        console.log('Generating 6 different angle views...');
        if (coloredUrl) console.log('📋 Colored flat design provided as logo reference for angles');

        // Create detailed description from features
        const features = [];
        if (detailedFeatures) {
          if (detailedFeatures.fabric) features.push(`${detailedFeatures.fabric} fabric`);
          if (detailedFeatures.pattern) features.push(`${detailedFeatures.pattern} pattern`);
          if (detailedFeatures.shoulders) features.push(`${detailedFeatures.shoulders} shoulders`);
          if (detailedFeatures.sleeves) features.push(`${detailedFeatures.sleeves} sleeves`);
          if (detailedFeatures.neckline) features.push(`${detailedFeatures.neckline} neckline`);
          if (detailedFeatures.waist) features.push(`${detailedFeatures.waist} waist`);
          if (detailedFeatures.length) features.push(`${detailedFeatures.length} length`);
          if (detailedFeatures.fit) features.push(`${detailedFeatures.fit} fit`);
        }

        // Define 6 angles — each with which logo positions would be visible from that angle
        const angles = [
          {
            name: 'front',
            prompt: 'Direct front view, facing camera, full body shot',
            logoNote: 'Show any logos on the chest, front panels, or sleeves exactly as in the reference design'
          },
          {
            name: 'back',
            prompt: 'Back view, showing back details, full body shot',
            logoNote: 'Show any logos on the back or rear sleeves exactly as in the reference design'
          },
          {
            name: 'left_side',
            prompt: 'Left side profile view, full body shot',
            logoNote: 'Show any logos on the left sleeve or left chest panel exactly as in the reference design'
          },
          {
            name: 'right_side',
            prompt: 'Right side profile view, full body shot',
            logoNote: 'Show any logos on the right sleeve or right chest panel exactly as in the reference design'
          },
          {
            name: 'three_quarter_front',
            prompt: 'Three-quarter front view, 45 degree angle, full body shot',
            logoNote: 'Show any logos on the chest or sleeves exactly as in the reference design'
          },
          {
            name: 'three_quarter_back',
            prompt: 'Three-quarter back view, 45 degree angle, full body shot',
            logoNote: 'Show any logos on the back or rear sleeves exactly as in the reference design'
          }
        ];

        console.log('Generating 6 angle views in parallel...');

        // Build image inputs: model photo first, colored flat design second (for logo reference)
        const angleImageInputs = coloredUrl
          ? [modelPhotoUrl, coloredUrl]
          : [modelPhotoUrl];

        // Generate all 6 angles in parallel
        const anglePromises = angles.map(async (angle) => {
          const fullPrompt = `360° Fashion Campaign Shoot — ${angle.prompt}

Reproduce THE EXACT SAME OUTFIT from the reference images onto the same model. Nothing changes except the camera angle.

GARMENT (identical to reference):
- Same garment, colors, patterns, textures
- ${angle.logoNote} — logos at same small tasteful size, exact same position, do not enlarge or move them
- Every construction detail, seam, pocket, closure — identical

ANGLE: ${angle.prompt}

PHOTOGRAPHY QUALITY (luxury brand campaign standard):
- Dramatic studio lighting — key light, fill, rim light — professional fashion photography
- Clean off-white seamless background
- Full body visible head to toe, sharp focus across entire garment
- Model looks confident and stylish — same model and physique as reference
- This is a 360° luxury brand product campaign — every angle must look equally polished and beautiful

Think: "Same model, same garment, same studio — I'm just walking around to shoot from a different angle"`;

          const input = {
            prompt: fullPrompt,
            image_input: angleImageInputs,
            output_format: "jpg",
            image_strength: 0.90,
            negative_prompt: "different outfit, changed design, altered colors, modified garment, new clothes, missing logo, removed logo, oversized logo, enlarged logo, moved logo, different logo position, unfashionable, cheap looking, low quality, blurry, bad lighting, flat lighting, cropped body, missing feet, missing head, ugly"
          };

          try {
            const output = await callReplicateAPI('google/nano-banana', input);
            const imageUrl = Array.isArray(output) ? output[0] : output;
            console.log(`Generated ${angle.name} view successfully`);
            return { angle: angle.name, imageUrl };
          } catch (error) {
            console.error(`Error generating ${angle.name} view:`, error);
            return { angle: angle.name, imageUrl: null, error: error.message };
          }
        });

        const allViews = await Promise.all(anglePromises);
        
        // Filter out any failed generations
        const successfulViews = allViews.filter(v => v.imageUrl);
        
        if (successfulViews.length === 0) {
          throw new Error('Failed to generate any angle views');
        }

        console.log(`Successfully generated ${successfulViews.length} out of 6 angle views`);

        // Use the first successful view as the main image
        const imageUrl = successfulViews[0].imageUrl;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          imageUrl: imageUrl,
          allViews: successfulViews, // Return all views with their angles
          success: true,
          step: 'angles',
          model: 'nano-banana',
          viewCount: successfulViews.length
        }));

      } catch (error) {
        console.error('Error generating different angle views:', error);
        console.error('Error stack:', error.stack);
        console.error('Input data was:', JSON.stringify(data, null, 2));
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          error: `Different angle view generation failed: ${error.message}`,
          success: false,
          details: error.stack
        }));
      }
    });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/generate-ramp-walk') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const { modelPhotoUrl, walkStyle = "confident ramp walk", gender = "", garmentType = "outfit", prompt = "", detailedFeatures = {} } = data;

        if (!modelPhotoUrl) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Model photo URL is required', success: false }));
          return;
        }

        if (!envVars.REPLICATE_API_TOKEN) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            error: 'REPLICATE_API_TOKEN not configured',
            success: false
          }));
          return;
        }

        // Build garment description from features
        const featureParts = [];
        if (detailedFeatures.fabric) featureParts.push(`${detailedFeatures.fabric} fabric`);
        if (detailedFeatures.pattern && detailedFeatures.pattern !== 'None') featureParts.push(`${detailedFeatures.pattern} pattern`);
        if (detailedFeatures.fit) featureParts.push(`${detailedFeatures.fit} fit`);
        if (detailedFeatures.neckline) featureParts.push(`${detailedFeatures.neckline} neckline`);
        if (detailedFeatures.sleeves) featureParts.push(`${detailedFeatures.sleeves} sleeves`);
        if (detailedFeatures.length) featureParts.push(`${detailedFeatures.length} length`);
        const featureDesc = featureParts.length > 0 ? `, ${featureParts.join(', ')}` : '';

        const isMale = gender?.toLowerCase() === 'men' || gender?.toLowerCase() === 'male';
        const isFemale = gender?.toLowerCase() === 'women' || gender?.toLowerCase() === 'female';
        const modelDesc = isMale ? 'a male fashion model' : isFemale ? 'a female fashion model' : 'a fashion model';
        const garmentDesc = prompt ? `${garmentType || 'outfit'} - ${prompt}${featureDesc}` : `${garmentType || 'outfit'}${featureDesc}`;

        console.log('Generating ramp walk video with Google Veo 3.1 (image-to-video)...');

        const fullPrompt = `Dolly shot (camera motion) of ${modelDesc} (subject) wearing THE EXACT SAME OUTFIT from the reference image — same colors, same garment, same design — walking confidently down a luxury fashion week runway (context). Full body visible at all times. Model starts far and walks toward camera with powerful elegant stride. Spotlights from above, audience seated on both sides with cameras flashing, dark atmospheric runway background (style). Solo model only, cinematic quality, high-end fashion show.`;

        const input = {
          prompt: fullPrompt,
          image: modelPhotoUrl,
          duration: 8,
          aspect_ratio: "16:9",
          resolution: "1080p",
          generate_audio: true,
          negative_prompt: "different outfit, changed clothes, altered colors, new garment, different design, multiple models, cut, transition, static, blurry, low quality, cropped head, cropped feet"
        };

        console.log('Using Google Veo 3.1 (image-to-video) for ramp walk generation');
        console.log('Model photo being used as reference:', modelPhotoUrl.substring(0, 80) + '...');
        const output = await callReplicateAPI('google/veo-3.1', input, true); // true for video
        
        // Veo 3.1 returns video URL directly or in output array
        const videoUrl = Array.isArray(output) ? output[0] : output;
        
        if (!videoUrl) {
          throw new Error('No video URL returned from Google Veo 3.1 API');
        }

        console.log('Ramp walk video generated successfully with Veo 3.1:', videoUrl);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          videoUrl: videoUrl,
          success: true,
          step: 'ramp-walk'
        }));

      } catch (error) {
        console.error('Error generating ramp walk video:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          error: `Ramp walk video generation failed (Veo 3.1): ${error.message}`,
          success: false 
        }));
      }
    });
    return;
  }

  // 404 for other routes
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`🚀 Simple API server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🎨 Generate endpoint: http://localhost:${PORT}/api/generate`);
  
  console.log('\n🔧 Environment Status:');
  console.log(`  REPLICATE_API_TOKEN: ${envVars.REPLICATE_API_TOKEN ? '✅ Set' : '❌ Missing'}`);
  console.log(`  MODEL_ID: ${envVars.MODEL_ID || 'using default'}`);
  console.log(`  PROMPT_TEMPLATE: ${envVars.PROMPT_TEMPLATE || 'using default'}`);
  
  if (!envVars.REPLICATE_API_TOKEN) {
    console.log('\n⚠️  Install dependencies with "npm install" and use server.js for real AI generation');
  }
});
