import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Scissors } from "lucide-react";

const ACCENT = "#C084FC";
const BG     = "#0D0819";

export const BLOG_POSTS = [
  {
    slug: "future-of-fashion-design-ai",
    category: "Technology",
    date: "February 14, 2026",
    readTime: "8 min read",
    title: "The Future of Fashion Design: How AI is Revolutionising the Atelier",
    excerpt: "Artificial intelligence is no longer a buzzword in fashion — it has become the invisible apprentice inside ateliers from Paris to Tokyo. We explore how AI tools are transforming the creative process without replacing the designer's soul.",
    accent: "#C084FC",
    body: `
The fashion industry has always been at the intersection of craft and culture, tradition and transformation. But the arrival of AI-powered design tools marks something genuinely new: a shift in where creativity begins.

For most of fashion history, the design process started with paper. A rough pencil sketch, gestural and imprecise, that held the shape of an idea. From there, weeks of draping, toiling, and sampling would follow before anything close to the final vision existed. AI does not eliminate that process — it compresses the distance between the first sketch and the first real decision.

Designers using Muse Sketch Studio report that their concept-to-conversation speed has increased dramatically. Instead of presenting a moodboard and asking a client to imagine, they present a rendered illustration. Instead of commissioning a sample to see if a silhouette works, they generate ten variants in an afternoon. The creative instinct remains entirely human. The computational grunt work does not.

What makes this genuinely different from earlier CAD or digital illustration tools is the generative quality of AI. These systems understand the language of fashion at a semantic level. When you type "bias-cut ivory silk evening gown with architectural bodice and pleated train," the output reflects an understanding of construction, fabric behaviour and proportion that previously required years of technical training to communicate.

The concern, of course, is homogenisation. If every designer uses the same tool, does every collection begin to look the same? The evidence so far suggests not. AI tools are stylistically neutral — they amplify the designer's aesthetic rather than imposing one. The output of a Rei Kawakubo-inspired designer looks nothing like the output of someone working in the tradition of Christian Dior, even if both are using the same software. The tool is a medium, not a muse.

The deeper shift is in who can design. When the technical barrier to sketching and presenting is dramatically lowered, the population of people who can make serious fashion work expands. Independent designers without atelier backing, students in developing fashion markets, artisans who have mastered construction but never formal illustration — all of them gain access to a professional presentation layer that was previously the domain of large studios.

This is, ultimately, what technology does at its best in any craft: it democratises access to quality without flattening the quality itself.
    `.trim(),
  },
  {
    slug: "sketch-to-runway-digital-illustration-guide",
    category: "Design Craft",
    date: "February 7, 2026",
    readTime: "11 min read",
    title: "From Sketch to Runway: A Complete Guide to Digital Fashion Illustration",
    excerpt: "Whether you are transitioning from hand-drawing to digital, or starting your illustration practice from scratch, this guide covers every stage of the digital fashion illustration workflow — tools, technique, and professional presentation.",
    accent: "#F9A8D4",
    body: `
Digital fashion illustration occupies a strange space — it is simultaneously more accessible than ever and more technically demanding than it appears. The proliferation of tablets, styluses, and AI tools means that the barrier to starting has never been lower. But producing work that reads as professional in a competitive industry requires an understanding of proportion, construction, and visual language that no software can substitute.

This guide is for designers who want to work well, not just quickly.

**Understanding the Fashion Croquis**

The fashion croquis — the elongated, stylised figure used as the basis for garment illustration — is not just a convention. It exists for functional reasons. The exaggerated proportions (typically nine to ten heads tall, compared to the natural seven-and-a-half) create space to show garment detail without distortion. The figure becomes a scaffold, not the subject.

In digital illustration, the croquis is your underlay. Whether you draw it yourself, use a pre-built template, or generate one via AI, the croquis should feel like breathing — automatic, invisible, foundational. Spend time understanding how weight distributes across a standing figure, how contrapposto shifts the hip and shoulder lines, how the garment responds to body position.

**Building Garments in Layers**

The best digital fashion illustrations are built in layers, mirroring how garments are actually constructed: understructure first, then silhouette, then surface, then detail.

Begin with the silhouette — a single clean shape that reads as the garment even without internal detail. If the silhouette doesn't work, nothing added on top will save it. This is the principle every atelier teaches to pattern cutters, and it translates directly to illustration.

Then build the fabric surface. Understand how your chosen fabric would fall, fold, and catch light. A draped jersey behaves differently from a structured organza. The visual language of each fabric — where the darks fall, where the highlights live, how the folds originate — is what separates a skilled illustrator from a competent one.

**Using AI to Accelerate, Not Replace**

AI illustration tools like those in Muse Sketch Studio should be positioned as a sketch engine, not a final output tool. Use them to generate rapid variants of a concept, to explore silhouettes you wouldn't have thought to draw, to produce the seventh iteration of an idea when your hand is tired at 11pm.

Then edit. Refine. Make the AI output yours. The designer's eye is what the client is paying for — and that eye has to be applied, with or without software assistance.

**Colour and Presentation**

Digital colour is faster and more flexible than working with markers or painted gouache. Use this to your advantage — experiment radically, and settle deliberately. Produce a colour-blocked version and a detailed fabric-realistic version. Show both; let the client choose.

Presentation layout matters as much as the illustration itself. A beautifully composed lookbook page, with the right typography and white space, elevates average illustration to professional-grade communication. Treat your portfolio as an editorial document, not a collection of drawings.
    `.trim(),
  },
  {
    slug: "embroidery-digital-age",
    category: "Craftsmanship",
    date: "January 28, 2026",
    readTime: "9 min read",
    title: "Embroidery in the Digital Age: Ancient Craft Meets Modern Technology",
    excerpt: "Embroidery is one of the oldest forms of surface decoration in the history of dress. Digital tools are now allowing designers to plan, simulate, and present embroidery work with unprecedented precision — without touching a single needle.",
    accent: "#6EE7B7",
    body: `
There is something almost paradoxical about designing embroidery digitally. The craft is defined by its slowness — a master embroiderer might spend six hundred hours on a single couture gown, placing beads and thread by hand with a precision that no machine can fully replicate. And yet the digital simulation of that embroidery — the ability to see how a peony medallion will read from a distance, how the colour of the thread interacts with the silk beneath, how the distribution of motifs creates visual rhythm — is an enormous creative and commercial advantage.

**The Language of Embroidery**

Embroidery has its own vocabulary: satin stitch, chain stitch, French knot, couching, tambour beading. Each creates a different visual and tactile texture. A satin stitch produces a smooth, directional sheen; a French knot creates raised, matte texture; tambour beading catches light with a hard brilliance quite different from the soft gleam of silk thread.

Understanding this vocabulary is essential before attempting to design embroidery digitally. The computer screen is a flat light source; the embroidered surface is three-dimensional and responds to every shift of ambient light. A design that looks balanced on screen might read as top-heavy under stage lighting, or disappear under warm atmospheric light. The designer must compensate for this — thinking in light, not pixels.

**What Digital Tools Offer**

The primary advantage of digital embroidery design is iteration speed. In the traditional process, the only way to know whether an embroidered motif will work on the garment is to stitch a sample — a process that might take a skilled embroiderer days. Digitally, the same iteration takes minutes.

The secondary advantage is communication. Presenting an embroidery concept to a client or an embroidery house is dramatically easier when you can show a detailed, colour-accurate rendering of the finished piece. The conversation moves from "here is a rough sketch of what I am imagining" to "here is almost exactly what this will look like" — and that shift has real commercial consequences.

**Designing for the Hand**

The greatest risk in digital embroidery design is losing touch with the material reality of the craft. Embroidery is built by hand, and hands have constraints. Thread paths must be logical. Needle access must be possible. The structural behaviour of the base fabric must be considered — heavy beading on a fluid silk chiffon will distort the fabric; the same beading on a structured duchess satin will lie flat.

The best digital embroidery designers think backwards from the needle, not forwards from the screen. They design with the embroiderer's challenges in mind, and they visit workshops. They understand what a thread hand is, why tambour hook technique produces a different result from freehand beading, and how the colour of a thread changes between spool and stitched surface.

Technology serves craft; it does not replace it. The digital tool is, in the end, a very sophisticated sketchbook.
    `.trim(),
  },
  {
    slug: "colour-theory-fashion-designers",
    category: "Colour & Palette",
    date: "January 18, 2026",
    readTime: "10 min read",
    title: "Colour Theory for Fashion Designers: Building Cohesive Collections",
    excerpt: "Colour is the first thing a viewer sees and the last thing they remember. Understanding how colours interact, how they shift across different fabrics, and how to build a cohesive seasonal palette is one of the most powerful skills a designer can develop.",
    accent: "#FCD34D",
    body: `
Every season, the industry produces forecasts: Pantone announces its Colour of the Year, trend agencies publish their palettes, mills release their seasonal swatch books. And every season, the most interesting designers do something slightly different with those forecasts. They interpret, subvert, or ignore them — because they understand colour at a level that transcends trend.

This is the goal of serious colour education in fashion: not to follow a palette, but to understand why palettes work.

**The Architecture of a Seasonal Palette**

A well-constructed seasonal palette typically has several components working together. There is a foundation — usually one or two neutrals that ground the collection and work across multiple pieces. There is a signature colour — the one that becomes associated with the collection in memory, that appears on the cover of the lookbook, that the press photographs. And there are supporting accents, which create visual rhythm and allow individual pieces to relate to each other without being identical.

The proportion of each matters as much as the choice. A palette of fifteen equal quantities of fifteen different colours reads as chaos. The same fifteen colours organised with one dominant (60%), two or three secondaries (25%), and several accents (15%) reads as a collection.

**Colour on Fabric vs. Colour on Screen**

This is the most critical distinction in fashion colour work, and it is one that digital tools have only partly solved. Colour on screen is additive — it is made of light. Colour on fabric is subtractive — it is made of dye absorbing and reflecting specific wavelengths. The same hex code can produce dramatically different results in different fabrics.

Matte wools absorb light and appear deeper and slightly cooler than their digital equivalent. Glossy duchesse satins reflect and appear lighter, slightly warmer. Silk chiffon scatters light and appears to glow. This means that designing colour digitally requires mental adjustment — building in a habit of asking "how will this read in the physical fabric?" at every stage.

The best colour designers work simultaneously with physical swatches and digital reference. The screen is a tool for rapid iteration and communication; the swatch is the ground truth.

**The Psychology of Collection Colour**

Colour communicates before the silhouette is even registered. A collection in deep burgundy, forest green, and cognac reads differently from one in pale lavender, white, and shell pink — even if the silhouettes are identical. The first evokes richness, warmth, autumnal confidence. The second evokes lightness, femininity, spring aperture.

This is not merely subjective. Research in colour psychology is well established, and fashion designers intuitively apply it — choosing palettes that speak to the emotional register they want the collection to occupy. The skill is in applying this understanding with enough sophistication that the communication is felt rather than understood.
    `.trim(),
  },
  {
    slug: "sustainable-fashion-design-technology",
    category: "Sustainability",
    date: "January 9, 2026",
    readTime: "7 min read",
    title: "Sustainable Fashion Design: How Technology is Helping Designers Go Green",
    excerpt: "The fashion industry is one of the largest contributors to global environmental pollution. Digital design tools are emerging as a significant part of the solution — reducing physical sampling, overproduction, and material waste.",
    accent: "#93C5FD",
    body: `
The numbers are stark. The fashion industry produces approximately 92 million tonnes of textile waste every year. A significant portion of that waste — estimated at between 10% and 30% of production — occurs before a garment ever reaches a consumer, in the form of sample overproduction, incorrect orders, unsold inventory, and rejected production runs.

Digital design tools cannot solve all of this. But they can meaningfully address the early stages of the supply chain, where many of the most avoidable inefficiencies occur.

**The Sample Problem**

The traditional fashion development process is sample-intensive. A designer conceives a garment; a pattern is drafted; a sample is cut and sewn; the designer reviews it; changes are made; another sample is produced. This cycle can repeat four, five, six times before the design is finalised. Each sample requires fabric, labour, and time. Many samples are destroyed after review.

Digital design and 3D garment simulation are changing this. When a designer can view a photorealistic simulation of a garment on a digital figure — seeing how the fabric drapes, how the seams lie, how the proportions read — the number of physical samples required decreases significantly. Brands using these tools report reductions in physical sampling of 50% to 80%. The environmental impact is substantial.

**Reducing Overproduction**

The second major sustainability benefit of digital tools is in the buying and ordering process. Historically, buyers made purchasing decisions based on physical samples at trade shows — which meant committing to production runs before the design was fully tested in the market. The result was systematic overproduction: ordering more than would sell as a buffer against demand uncertainty.

Digital lookbooks and virtual runway presentations allow buyers to make more informed decisions with better visual information, earlier in the cycle. This tightens the relationship between design and demand, and reduces the number of units produced speculatively.

**The Design-for-Sustainability Opportunity**

Beyond reducing waste in the design process, digital tools create new opportunities to design for sustainability from the start. Software that integrates material databases — showing the carbon footprint, water usage, and circularity profile of different fabrics — allows designers to make more informed material choices without breaking creative flow.

This is not yet standard, but it is the direction of travel. The fashion industry's sustainability challenge is vast and structural; it will not be solved by software alone. But designers who understand these tools, and who use them to make better decisions faster, are part of the solution.
    `.trim(),
  },
  {
    slug: "rise-of-haute-couture-software",
    category: "Industry",
    date: "December 28, 2025",
    readTime: "12 min read",
    title: "The Rise of Haute Couture Software: Professional Tools for the Modern Designer",
    excerpt: "For decades, professional fashion design software meant expensive, complex CAD systems accessible only to large studios. A new generation of tools is changing this — bringing professional-grade capability to independent designers worldwide.",
    accent: "#F9A8D4",
    body: `
The history of fashion software is a history of two worlds that rarely spoke to each other. On one side: the enterprise CAD systems used by large fashion houses — Lectra, Gerber, Optitex — powerful, precise, expensive, and requiring months of training to use productively. On the other: the general-purpose creative tools used by independent designers and students — Adobe Illustrator, Photoshop, Procreate — flexible and accessible, but without fashion-specific functionality.

Between these worlds was a gap. The independent designer who wanted to produce technical drawings, generate fabric simulations, or present a virtual runway existed in a kind of professional limbo — either investing in enterprise tools they couldn't afford, or making do with general tools that didn't quite fit.

**The New Generation**

The tools emerging in the mid-2020s represent something genuinely different. They are built from the ground up for fashion design, with fashion-specific AI trained on garment construction, fabric behaviour, and design history. They are cloud-native, subscription-based, and accessible from anywhere. And they are designed to serve both the independent designer and the professional studio.

Muse Sketch Studio is part of this generation. The core insight is that the professional fashion designer's most valuable resource is not software capability — it is time and creative energy. Every hour spent on technical execution is an hour not spent on creative development. Tools that compress technical work free designers to do more of what only they can do.

**What "Professional Grade" Means Now**

The benchmark for professional-grade fashion software has shifted. It no longer means "accurate enough to cut from" — that is a CAD tool problem. Professional grade, in the context of design and presentation tools, means producing output that reads as authoritative to clients, buyers, and press.

This is a higher creative bar and a lower technical bar than the old definition. It requires the software to understand aesthetics — proportion, hierarchy, the visual grammar of luxury — not just geometry.

**The Global Designer**

The most significant effect of accessible professional tools may be geographic. When professional design software costs thousands of dollars and requires specialist training, the effective design industry concentrates in a small number of centres: Paris, Milan, New York, London, Tokyo. When those tools become affordable and intuitive, the industry can grow wherever there are talented, creative people — which is everywhere.

The independent designer in Lagos, the recent graduate in São Paulo, the artisan manufacturer in Jaipur who has extraordinary craft knowledge but no formal presentation training — all of them can now produce work that competes visually with output from established studios. That is a meaningful shift.

The fashion industry has always been global in its inspiration. It is becoming, for the first time, genuinely global in its participation.
    `.trim(),
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Technology", "Design Craft", "Craftsmanship", "Colour & Palette", "Sustainability", "Industry"];
  const filtered = activeCategory === "All" ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === activeCategory);

  return (
    <div style={{ minHeight:"100vh", background:BG, color:"#fff", fontFamily:"'Syne', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=Syne:wght@400;500;600;700;800&display=swap');
        @keyframes shimLogo { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .logo-b { background: linear-gradient(90deg,#C084FC,#F9A8D4,#FCD34D,#C084FC); background-size:200% 100%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation: shimLogo 4s linear infinite; }
        .blog-card { transition: transform 0.3s ease, background 0.3s; cursor:pointer; }
        .blog-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.04) !important; }
        .cat-pill { padding:6px 18px; font-size:10px; letter-spacing:2px; text-transform:uppercase; border:1px solid rgba(255,255,255,0.12); background:transparent; color:rgba(255,255,255,0.45); cursor:pointer; transition: all 0.25s; font-family:'Syne',sans-serif; }
        .cat-pill:hover { border-color:rgba(255,255,255,0.4); color:#fff; }
        .cat-pill.active { background:rgba(255,255,255,0.95); color:#0a0a0a; border-color:transparent; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.09); border-radius:3px; }
      `}</style>

      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, padding:"22px 56px", display:"flex", alignItems:"center", justifyContent:"space-between", background:`${BG}E8`, backdropFilter:"blur(22px)", borderBottom:"1px solid rgba(255,255,255,0.045)" }}>
        <Link to="/home" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:"50%", border:`1px solid ${ACCENT}42`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Scissors size={15} style={{ color:ACCENT }} strokeWidth={1.4} />
          </div>
          <span className="logo-b" style={{ fontSize:13, fontWeight:700, letterSpacing:3 }}>MUSE SKETCH STUDIO</span>
        </Link>
        <div style={{ display:"flex", gap:40, alignItems:"center" }}>
          {[["Home","/home"],["Gallery","/gallery"],["About","/about"]].map(([l,to])=>(
            <Link key={l} to={to} style={{ color:"rgba(255,255,255,0.5)", textDecoration:"none", fontSize:11, letterSpacing:2, textTransform:"uppercase", transition:"color 0.3s" }}
              onMouseEnter={e=>(e.currentTarget.style.color="#fff")}
              onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.5)")}
            >{l}</Link>
          ))}
          <Link to="/design" style={{ padding:"9px 26px", background:"rgba(255,255,255,0.95)", color:"#0a0a0a", fontSize:10, letterSpacing:2, textTransform:"uppercase", fontWeight:700, textDecoration:"none" }}>
            Start Free Trial
          </Link>
        </div>
      </nav>

      {/* HEADER */}
      <header style={{ padding:"100px 72px 64px", maxWidth:1440, margin:"0 auto" }}>
        <p style={{ fontSize:10, letterSpacing:7, textTransform:"uppercase", color:ACCENT, marginBottom:24 }}>The Journal</p>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:56 }}>
          <h1 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(52px,7vw,96px)", fontWeight:700, lineHeight:0.9 }}>
            Design<br /><em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.3)" }}>Thoughts</em>
          </h1>
          <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:19, fontStyle:"italic", color:"rgba(255,255,255,0.48)", lineHeight:1.75, maxWidth:380 }}>
            Essays on fashion, technology, craft and the future of design — written for people who care deeply about how clothes are made and why they matter.
          </p>
        </div>
        {/* Category filter */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {categories.map(c => (
            <button key={c} className={`cat-pill ${activeCategory===c?"active":""}`} onClick={()=>setActiveCategory(c)}>{c}</button>
          ))}
        </div>
      </header>

      <div style={{ height:1, background:"rgba(255,255,255,0.055)", maxWidth:1440, margin:"0 auto" }} />

      {/* FEATURED POST */}
      {filtered.length > 0 && (
        <section style={{ padding:"72px 72px 0", maxWidth:1440, margin:"0 auto" }}>
          <Link to={`/blog/${filtered[0].slug}`} style={{ textDecoration:"none", display:"block" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, background:"rgba(255,255,255,0.04)", marginBottom:2 }}>
              {/* Visual */}
              <div style={{ background:`linear-gradient(135deg, ${filtered[0].accent}22, ${filtered[0].accent}08)`, minHeight:360, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
                <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:180, fontWeight:700, color:filtered[0].accent, opacity:0.08, lineHeight:1, userSelect:"none" }}>01</div>
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <div style={{ width:120, height:120, border:`1px solid ${filtered[0].accent}44`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <div style={{ fontSize:48 }}>✍️</div>
                  </div>
                </div>
              </div>
              {/* Content */}
              <div style={{ padding:"56px 52px", background:"rgba(255,255,255,0.025)" }}>
                <div style={{ display:"flex", gap:16, marginBottom:28, alignItems:"center" }}>
                  <span style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase", color:filtered[0].accent, fontWeight:600 }}>{filtered[0].category}</span>
                  <span style={{ fontSize:9, color:"rgba(255,255,255,0.3)", letterSpacing:2 }}>—</span>
                  <span style={{ fontSize:9, letterSpacing:2, color:"rgba(255,255,255,0.35)", textTransform:"uppercase" }}>{filtered[0].date}</span>
                  <span style={{ fontSize:9, letterSpacing:2, color:"rgba(255,255,255,0.28)", textTransform:"uppercase" }}>{filtered[0].readTime}</span>
                </div>
                <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(26px,3vw,42px)", fontWeight:700, lineHeight:1.1, color:"#fff", marginBottom:24 }}>
                  {filtered[0].title}
                </h2>
                <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:18, fontStyle:"italic", color:"rgba(255,255,255,0.52)", lineHeight:1.75, marginBottom:40 }}>
                  {filtered[0].excerpt}
                </p>
                <div style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:11, letterSpacing:3, textTransform:"uppercase", color:filtered[0].accent, fontWeight:600 }}>
                  Read Essay <ArrowRight size={13} />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* GRID — remaining posts */}
      <section style={{ padding:"2px 72px 120px", maxWidth:1440, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, background:"rgba(255,255,255,0.04)" }}>
          {filtered.slice(1).map((post, i) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration:"none" }}>
              <div className="blog-card" style={{ background:"#0D0819", height:"100%" }}>
                {/* Visual strip */}
                <div style={{ height:200, background:`linear-gradient(135deg, ${post.accent}1A, ${post.accent}06)`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
                  <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:120, fontWeight:700, color:post.accent, opacity:0.09, lineHeight:1 }}>
                    0{i+2}
                  </div>
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:post.accent, opacity:0.4 }} />
                </div>
                {/* Content */}
                <div style={{ padding:"32px 36px 40px" }}>
                  <div style={{ display:"flex", gap:12, marginBottom:18, alignItems:"center" }}>
                    <span style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase", color:post.accent, fontWeight:600 }}>{post.category}</span>
                    <span style={{ fontSize:9, color:"rgba(255,255,255,0.28)", letterSpacing:2 }}>{post.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:22, fontWeight:700, lineHeight:1.2, color:"#fff", marginBottom:16 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:15, color:"rgba(255,255,255,0.44)", lineHeight:1.72, marginBottom:28 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:20 }}>
                    <span style={{ fontSize:9, color:"rgba(255,255,255,0.3)", letterSpacing:2, textTransform:"uppercase" }}>{post.date}</span>
                    <span style={{ fontSize:9, letterSpacing:2, textTransform:"uppercase", color:post.accent, display:"flex", alignItems:"center", gap:6 }}>
                      Read <ArrowRight size={10} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ padding:"80px 72px 100px", background:"rgba(255,255,255,0.02)", borderTop:"1px solid rgba(255,255,255,0.045)" }}>
        <div style={{ maxWidth:640, margin:"0 auto", textAlign:"center" }}>
          <p style={{ fontSize:10, letterSpacing:6, textTransform:"uppercase", color:ACCENT, marginBottom:20 }}>The Journal</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:700, lineHeight:1.05, marginBottom:20 }}>
            Essays in your inbox, <em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.3)" }}>fortnightly</em>
          </h2>
          <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:17, fontStyle:"italic", color:"rgba(255,255,255,0.44)", marginBottom:40, lineHeight:1.75 }}>
            Considered writing on fashion, design, craft and technology — no noise, no trends, just depth.
          </p>
          <div style={{ display:"flex", gap:0, maxWidth:480, margin:"0 auto" }}>
            <input type="email" placeholder="your@email.com" style={{
              flex:1, padding:"16px 22px", background:"rgba(255,255,255,0.06)",
              border:"1px solid rgba(255,255,255,0.15)", borderRight:"none", color:"#fff",
              fontSize:13, outline:"none", fontFamily:"'Syne',sans-serif",
            }} />
            <button style={{
              padding:"16px 28px", background:"rgba(255,255,255,0.95)", color:"#0a0a0a",
              fontSize:10, letterSpacing:2, textTransform:"uppercase", fontWeight:700,
              border:"none", cursor:"pointer", fontFamily:"'Syne',sans-serif",
            }}>Subscribe</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:"32px 72px", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span className="logo-b" style={{ fontSize:13, fontWeight:700, letterSpacing:3 }}>MUSE SKETCH STUDIO</span>
        <div style={{ display:"flex", gap:24 }}>
          {[["Home","/home"],["Gallery","/gallery"],["About","/about"],["Portfolio","/portfolio"]].map(([l,to])=>(
            <Link key={l} to={to} style={{ color:"rgba(255,255,255,0.26)", textDecoration:"none", fontSize:10, letterSpacing:2, textTransform:"uppercase", transition:"color 0.3s" }}
              onMouseEnter={e=>(e.currentTarget.style.color="#fff")}
              onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.26)")}
            >{l}</Link>
          ))}
        </div>
        <div style={{ fontSize:9, color:"rgba(255,255,255,0.17)", letterSpacing:1 }}>© 2026 Muse Sketch Studio</div>
      </footer>
    </div>
  );
}
