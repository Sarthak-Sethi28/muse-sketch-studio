import { useState, useRef } from "react";
import { FashionPipeline } from "@/components/FashionPipeline";
import { FashionCanvas } from "@/components/FashionCanvas";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, FolderOpen } from "lucide-react";
import { saveToPortfolio } from "@/pages/Portfolio";

type DesignStep = 'prompt' | 'sketch' | 'colors' | 'model' | '3d' | 'runway';

interface DesignState {
  prompt: string;
  category: string;
  garmentType: string;
  gender: string;
  detailedFeatures: {
    shoulders: string;
    sleeves: string;
    waist: string;
    neckline: string;
    length: string;
    fit: string;
    fabric: string;
    pattern: string;
    embellishments: string;
    closure: string;
    collar: string;
    hemStyle: string;
    pockets: string;
    backDetail: string;
  };
  sketchUrl: string | null;
  coloredUrl: string | null;
  modelUrl: string | null;
  threeDUrl: string | null;
  angleViews?: Array<{ angle: string; imageUrl: string }>; // 6 different angle photos
  runwayUrl: string | null;
  selectedColors: string[];
  currentStep: DesignStep;
  previousSketchUrl: string | null; // For edit history
  previousColoredUrl: string | null; // For edit history
  uploadedImageUrl: string | null; // User uploaded image
  uploadedLogoUrl: string | null; // User uploaded logo
  useUploadedImage: boolean; // Flag to use uploaded image instead of generation
  designHistory: string[]; // Track all design changes like a conversation
}

export default function FashionDesignTool() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [designState, setDesignState] = useState<DesignState>({
    prompt: "",
    category: "",
    garmentType: "",
    gender: "",
    detailedFeatures: {
      shoulders: "",
      sleeves: "",
      waist: "",
      neckline: "",
      length: "",
      fit: "",
      fabric: "",
      pattern: "",
      embellishments: "",
      closure: "",
      collar: "",
      hemStyle: "",
      pockets: "",
      backDetail: ""
    },
    sketchUrl: null,
    coloredUrl: null,
    modelUrl: null,
    threeDUrl: null,
    runwayUrl: null,
    selectedColors: [],
    currentStep: 'prompt',
    previousSketchUrl: null,
    previousColoredUrl: null,
    uploadedImageUrl: null,
    uploadedLogoUrl: null,
    useUploadedImage: false,
    designHistory: []
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string>("");
  const savedDesignIdRef = useRef<string | null>(null); // Ref so it's available synchronously (avoids duplicate saves)
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Auto-collapse sidebar on mobile
  const shouldCollapseSidebar = isMobile || isSidebarCollapsed;

  // Regenerate sketch with new prompt
  const handleRegenerateSketch = async (newPrompt: string) => {
    // When editing, keep the original prompt but add the edit instruction
    // We're in edit mode if there's a CURRENT sketch (not just a previous one)
    const isEditMode = !!designState.sketchUrl;
    
    if (isEditMode) {
      // In edit mode: add this edit to the design history
      setDesignState(prev => ({ 
        ...prev, 
        designHistory: [...prev.designHistory, newPrompt] 
      }));
      // Send the edit instruction separately
      // The previousSketchUrl will be set automatically in generateSketch
      await generateSketch(newPrompt, true);
    } else {
      // New design: update the main prompt and initialize history
      setDesignState(prev => ({ 
        ...prev, 
        prompt: newPrompt,
        designHistory: [newPrompt] // Start fresh history with the initial design
      }));
      await generateSketch(newPrompt, false);
    }
  };

  // Save/update portfolio entry whenever a stage completes
  const syncPortfolio = (updatedState: Partial<typeof designState>, existingId?: string | null) => {
    const merged = { ...designState, ...updatedState };
    if (!merged.sketchUrl) return; // Only save once we have at least a sketch

    const existing = JSON.parse(localStorage.getItem('fashion-portfolio') || '[]');

    const entry = {
      name: merged.prompt ? merged.prompt.slice(0, 40) + (merged.prompt.length > 40 ? '...' : '') : 'Untitled Design',
      category: merged.category || 'Uncategorized',
      garmentType: merged.garmentType || '',
      gender: merged.gender || '',
      prompt: merged.prompt || '',
      sketchUrl: merged.sketchUrl || null,
      coloredUrl: merged.coloredUrl || null,
      modelUrl: merged.modelUrl || null,
      runwayUrl: merged.runwayUrl || null,
      angleViews: merged.angleViews || [],
      colors: merged.selectedColors || [],
    };

    const idToUse = existingId ?? savedDesignIdRef.current;
    if (idToUse) {
      const updated = existing.map((d: { id: string }) =>
        d.id === idToUse ? { ...d, ...entry } : d
      );
      localStorage.setItem('fashion-portfolio', JSON.stringify(updated));
      return idToUse;
    } else {
      const saved = saveToPortfolio(entry);
      savedDesignIdRef.current = saved.id;
      return saved.id;
    }
  };

  // Generate sketch function (extracted for reuse)
  const generateSketch = async (prompt: string, isEditInstruction: boolean = false) => {
    if (!prompt.trim()) {
      toast({
        title: "No prompt provided",
        description: "Please enter a design description first.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setCurrentOperation(designState.previousSketchUrl ? "Refining sketch based on previous version..." : "Generating fashion sketch...");
    
    // DEBUG: Log logo status before sending
    console.log('🔍 FRONTEND DEBUG: Logo URL present?', !!designState.uploadedLogoUrl);
    if (designState.uploadedLogoUrl) {
      console.log('   Logo length:', designState.uploadedLogoUrl.length, 'chars');
    }
    
    try {
      const response = await fetch('http://localhost:3001/api/generate-sketch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: isEditInstruction ? designState.prompt : prompt, // Original design description
          editInstruction: isEditInstruction ? prompt : undefined, // Separate edit instruction
          garmentType: designState.garmentType,
          gender: designState.gender,
          detailedFeatures: designState.detailedFeatures,
          previousSketchUrl: isEditInstruction ? designState.sketchUrl : designState.previousSketchUrl, // Current sketch when editing
          uploadedImageUrl: designState.uploadedImageUrl, // User uploaded image
          uploadedLogoUrl: designState.uploadedLogoUrl, // User uploaded logo
          useUploadedImage: designState.useUploadedImage, // Flag to use uploaded image
          designHistory: designState.designHistory // Pass full conversation history
        })
      });

      const data = await response.json();
      
      if (data.success && data.imageUrl) {
        setDesignState(prev => {
          const newState = {
            ...prev,
            previousSketchUrl: prev.sketchUrl,
            sketchUrl: data.imageUrl,
            currentStep: 'colors',
            // When editing sketch, clear downstream outputs so user re-adds colors
            ...(isEditInstruction ? {
              coloredUrl: null,
              previousColoredUrl: null,
              modelUrl: null,
              threeDUrl: null,
              runwayUrl: null,
              angleViews: undefined
            } : {})
          };
          console.log('✅ State updated - Logo still present?', !!newState.uploadedLogoUrl);
          return newState;
        });
        syncPortfolio({ sketchUrl: data.imageUrl }, savedDesignIdRef.current);
        toast({ 
          title: designState.previousSketchUrl ? "Sketch refined!" : "Sketch generated!", 
          description: "Ready for coloring." 
        });
      } else {
        throw new Error(data.error || 'Failed to generate sketch');
      }
    } catch (error) {
      handleApiError(error, "sketch generation");
    } finally {
      setIsGenerating(false);
      setCurrentOperation("");
    }
  };

  // Step 1: Generate Sketch (wrapper)
  const handleGenerateSketch = async () => {
    // Initialize design history with the first prompt if it's empty
    if (designState.designHistory.length === 0) {
      setDesignState(prev => ({ 
        ...prev, 
        designHistory: [designState.prompt] 
      }));
    }
    await generateSketch(designState.prompt);
  };

  // Step 2: Add Colors
  const handleAddColors = async (refinementPrompt?: string) => {
    if (!designState.sketchUrl) return;

    // Only treat as refinement when we have a valid string (not event object from button click)
    const hasValidRefinement = typeof refinementPrompt === 'string' && refinementPrompt.trim().length > 0 && !!designState.coloredUrl;
    const isRefinement = hasValidRefinement;
    const promptToSend = isRefinement ? (refinementPrompt as string).trim() : designState.prompt;
    const previousUrl = isRefinement ? designState.coloredUrl : designState.previousColoredUrl;

    setIsGenerating(true);
    setCurrentOperation(isRefinement ? "Applying your color changes..." : (previousUrl ? "Refining colors..." : "Adding colors to design..."));
    
    try {
      const response = await fetch('http://localhost:3001/api/add-colors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          sketchUrl: designState.sketchUrl,
          colors: designState.selectedColors,
          prompt: promptToSend,
          previousColoredUrl: previousUrl
        })
      });

      const data = await response.json();
      
      if (data.success && data.imageUrl) {
        setDesignState(prev => ({
          ...prev,
          previousColoredUrl: prev.coloredUrl,
          coloredUrl: data.imageUrl,
          currentStep: 'model',
          // If refinement: clear downstream outputs so user regenerates model + angles + runway
          ...(isRefinement ? {
            modelUrl: null,
            threeDUrl: null,
            runwayUrl: null,
            angleViews: undefined
          } : {})
        }));
        syncPortfolio({ coloredUrl: data.imageUrl }, savedDesignIdRef.current);
        toast({ 
          title: isRefinement ? "Colors updated!" : (previousUrl ? "Colors refined!" : "Colors added!"), 
          description: isRefinement ? "Regenerate model photo to see changes." : "Ready for model generation." 
        });
      } else {
        throw new Error(data.error || 'Failed to add colors');
      }
    } catch (error) {
      handleApiError(error, "color generation");
    } finally {
      setIsGenerating(false);
      setCurrentOperation("");
    }
  };

  // Edit Sketch — inline refinement (no navigation to prompt page)
  const handleEditSketch = (instruction: string) => {
    generateSketch(instruction, true);
  };

  // Edit Colors — inline refinement (no navigation)
  const handleEditColors = (refinementPrompt: string) => {
    handleAddColors(refinementPrompt);
  };

  // Manual save — updates existing entry (avoids duplicates)
  const handleSaveToPortfolio = () => {
    syncPortfolio({}, savedDesignIdRef.current);
  };

  // Step 3: Generate Model Photo
  const handleGenerateModel = async () => {
    if (!designState.coloredUrl) return;

    setIsGenerating(true);
    setCurrentOperation("Creating model photo...");
    
    try {
      const genderLabel = designState.gender?.toLowerCase();
      const modelType = genderLabel === 'men' || genderLabel === 'male'
        ? 'male man fashion model'
        : genderLabel === 'women' || genderLabel === 'female'
          ? 'female woman fashion model'
          : 'diverse fashion model';

      const response = await fetch('http://localhost:3001/api/generate-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          designUrl: designState.coloredUrl,
          modelType,
          gender: genderLabel,
          pose: "standing"
        })
      });

      const data = await response.json();
      
      if (data.success && data.imageUrl) {
        setDesignState(prev => ({
          ...prev,
          modelUrl: data.imageUrl,
          currentStep: '3d'
        }));
        syncPortfolio({ modelUrl: data.imageUrl }, savedDesignIdRef.current);
        toast({ title: "Model photo created!", description: "Ready for 3D visualization." });
      } else {
        throw new Error(data.error || 'Failed to generate model photo');
      }
    } catch (error) {
      handleApiError(error, "model generation");
    } finally {
      setIsGenerating(false);
      setCurrentOperation("");
    }
  };

  // Step 4: Generate Different Angle Views
  const handleGenerateAngles = async () => {
    if (!designState.modelUrl) return;

    setIsGenerating(true);
    setCurrentOperation("Generating 6 different angle views... This will take a few minutes.");
    
    try {
      const response = await fetch('http://localhost:3001/api/generate-angles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          modelPhotoUrl: designState.modelUrl,
          coloredUrl: designState.coloredUrl,
          garmentType: designState.garmentType,
          detailedFeatures: designState.detailedFeatures
        })
      });

      const data = await response.json();
      
      if (data.success && data.allViews && data.allViews.length > 0) {
        setDesignState(prev => ({
          ...prev,
          threeDUrl: data.imageUrl, // Main image
          // Store all angle views for display
          angleViews: data.allViews,
          currentStep: 'runway'
        }));
        toast({ 
          title: `${data.viewCount} angle views created!`, 
          description: "Ready for runway video." 
        });
      } else {
        throw new Error(data.error || 'Failed to generate angle views');
      }
    } catch (error) {
      handleApiError(error, "angle view generation");
    } finally {
      setIsGenerating(false);
      setCurrentOperation("");
    }
  };

  // Step 5: Generate Ramp Walk Video
  const handleGenerateRunway = async () => {
    if (!designState.modelUrl) return;

    setIsGenerating(true);
    setCurrentOperation("Creating ramp walk video... (this may take a few minutes)");
    
    try {
      const response = await fetch('http://localhost:3001/api/generate-ramp-walk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          modelPhotoUrl: designState.modelUrl,
          walkStyle: "confident ramp walk",
          gender: designState.gender,
          garmentType: designState.garmentType,
          prompt: designState.prompt,
          detailedFeatures: designState.detailedFeatures
        })
      });

      const data = await response.json();
      
      if (data.success && data.videoUrl) {
        setDesignState(prev => ({
          ...prev,
          runwayUrl: data.videoUrl
        }));
        syncPortfolio({ runwayUrl: data.videoUrl }, savedDesignIdRef.current);
        toast({ title: "Runway video created!", description: "Your fashion show is ready!" });
      } else {
        throw new Error(data.error || 'Failed to generate runway video');
      }
    } catch (error) {
      handleApiError(error, "runway video generation");
    } finally {
      setIsGenerating(false);
      setCurrentOperation("");
    }
  };

  const handleApiError = (error: unknown, operation: string) => {
    console.error(`${operation} error:`, error);
    
    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      toast({
        title: "Server not running",
        description: "Please start the API server with 'npm run server'",
        variant: "destructive"
      });
    } else {
      toast({
        title: `${operation} failed`,
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    }
  };

  const handleUndo = () => {
    console.log("Undo action");
    // TODO: Implement undo functionality
  };

  const handleDownload = () => {
    console.log("Download design");
    // TODO: Implement download functionality
  };

  return (
    <div className="h-screen bg-surface-primary flex flex-col font-roboto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-4 border-b border-border-subtle bg-surface-secondary">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/home")}
            className="text-text-secondary hover:text-text-primary"
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </div>
        <h1 className="font-dancing text-2xl font-semibold text-text-primary">
          Muse Sketch Studio
        </h1>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/portfolio")}
            className="text-text-secondary hover:text-text-primary"
          >
            <FolderOpen className="h-4 w-4 mr-2" />
            Portfolio
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <FashionPipeline
          isCollapsed={shouldCollapseSidebar}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          designState={designState}
          onDesignStateChange={setDesignState}
          onGenerateSketch={handleGenerateSketch}
          onEditSketch={handleEditSketch}
          onAddColors={handleAddColors}
          onGenerateModel={handleGenerateModel}
          onGenerate3D={handleGenerateAngles}
          onGenerateRunway={handleGenerateRunway}
          onEditColors={handleEditColors}
          onSaveToPortfolio={handleSaveToPortfolio}
          isGenerating={isGenerating}
        />
        
        {/* Canvas Area */}
        <FashionCanvas 
          designState={designState}
          isGenerating={isGenerating}
          currentOperation={currentOperation}
          onRegenerateSketch={handleRegenerateSketch}
        />
      </div>
    </div>
  );
}