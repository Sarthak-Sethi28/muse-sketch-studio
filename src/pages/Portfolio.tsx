import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft, Download, Trash2, Heart, HeartOff, Sparkles,
  Filter, X, ChevronLeft, ChevronRight, Play, Image, Palette,
  User, Video, FolderOpen
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export interface SavedDesign {
  id: string;
  name: string;
  category: string;
  garmentType: string;
  gender: string;
  prompt: string;
  sketchUrl: string | null;
  coloredUrl: string | null;
  modelUrl: string | null;
  runwayUrl: string | null;
  angleViews?: Array<{ angle: string; imageUrl: string }>;
  colors: string[];
  favorite: boolean;
  createdAt: string;
}

type Stage = 'sketch' | 'colored' | 'model' | 'runway';

const STAGE_CONFIG: { id: Stage; label: string; icon: React.ElementType }[] = [
  { id: 'sketch',  label: 'Sketch',      icon: Image   },
  { id: 'colored', label: 'Colored',     icon: Palette },
  { id: 'model',   label: 'Model Photo', icon: User    },
  { id: 'runway',  label: 'Runway',      icon: Video   },
];

function getStageUrl(design: SavedDesign, stage: Stage): string | null {
  switch (stage) {
    case 'sketch':  return design.sketchUrl;
    case 'colored': return design.coloredUrl;
    case 'model':   return design.modelUrl;
    case 'runway':  return design.runwayUrl;
  }
}

function getBestStage(design: SavedDesign): Stage {
  if (design.runwayUrl) return 'runway';
  if (design.modelUrl)  return 'model';
  if (design.coloredUrl) return 'colored';
  return 'sketch';
}

// ─── Expand Modal ────────────────────────────────────────────────────────────
function ExpandModal({
  design,
  initialStage,
  onClose,
  onDelete,
  onToggleFavorite,
}: {
  design: SavedDesign;
  initialStage: Stage;
  onClose: () => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}) {
  const [activeStage, setActiveStage] = useState<Stage>(initialStage);
  const { toast } = useToast();

  const availableStages = STAGE_CONFIG.filter(s => getStageUrl(design, s.id));
  const currentUrl = getStageUrl(design, activeStage);

  const downloadFile = async (url: string, filename: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      toast({ title: "Downloaded!" });
    } catch {
      toast({ title: "Download failed", variant: "destructive" });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="font-semibold text-lg text-gray-900 truncate max-w-sm">{design.name}</h2>
            <p className="text-sm text-gray-500">{design.garmentType} · {design.gender} · {new Date(design.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={() => onToggleFavorite(design.id)}>
              {design.favorite
                ? <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                : <Heart className="h-4 w-4" />}
            </Button>
            <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600" onClick={() => { onDelete(design.id); onClose(); }}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stage Tabs */}
        <div className="flex gap-1 px-4 pt-3">
          {availableStages.map(s => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStage(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeStage === s.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Media */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 mx-4 my-3 rounded-xl overflow-hidden min-h-[400px]">
          {currentUrl ? (
            activeStage === 'runway' ? (
              <video
                src={currentUrl}
                controls
                autoPlay
                className="max-h-[450px] max-w-full rounded-lg"
              />
            ) : (
              <img
                src={currentUrl}
                alt={`${activeStage} view`}
                className="max-h-[450px] max-w-full object-contain rounded-lg"
              />
            )
          ) : (
            <p className="text-gray-400 text-sm">Not generated yet</p>
          )}
        </div>

        {/* Download + Colors */}
        <div className="flex items-center justify-between px-4 pb-4 gap-3">
          <div className="flex items-center gap-2">
            {design.colors.slice(0, 6).map((c, i) => (
              <div key={i} className="w-5 h-5 rounded-full border border-gray-200" style={{ backgroundColor: c.toLowerCase() }} />
            ))}
            {design.colors.length > 6 && (
              <span className="text-xs text-gray-400">+{design.colors.length - 6}</span>
            )}
          </div>
          {currentUrl && (
            <Button
              size="sm"
              onClick={() => downloadFile(currentUrl, `${design.name}-${activeStage}.${activeStage === 'runway' ? 'mp4' : 'jpg'}`)}
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Download {STAGE_CONFIG.find(s => s.id === activeStage)?.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Design Card ─────────────────────────────────────────────────────────────
function DesignCard({
  design,
  onDelete,
  onToggleFavorite,
  onExpand,
}: {
  design: SavedDesign;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onExpand: (design: SavedDesign, stage: Stage) => void;
}) {
  const [activeStage, setActiveStage] = useState<Stage>(getBestStage(design));
  const { toast } = useToast();

  const availableStages = STAGE_CONFIG.filter(s => getStageUrl(design, s.id));
  const currentUrl = getStageUrl(design, activeStage);

  const downloadFile = async (url: string, filename: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      toast({ title: "Downloaded!" });
    } catch {
      toast({ title: "Download failed", variant: "destructive" });
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
      {/* Thumbnail */}
      <div
        className="relative bg-gray-100 cursor-pointer"
        style={{ aspectRatio: '3/4' }}
        onClick={() => onExpand(design, activeStage)}
      >
        {currentUrl ? (
          activeStage === 'runway' ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <Play className="h-12 w-12 text-white opacity-80" />
              <video src={currentUrl} className="absolute inset-0 w-full h-full object-cover opacity-60" muted />
            </div>
          ) : (
            <img src={currentUrl} alt={design.name} className="w-full h-full object-cover" />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Sparkles className="h-10 w-10 text-gray-300" />
          </div>
        )}

        {/* Favorite button */}
        <button
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={e => { e.stopPropagation(); onToggleFavorite(design.id); }}
        >
          {design.favorite
            ? <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
            : <Heart className="h-3.5 w-3.5 text-gray-600" />}
        </button>

        {/* Stage count badge */}
        <div className="absolute bottom-2 left-2">
          <Badge className="bg-black/60 text-white text-xs border-0">
            {availableStages.length} stage{availableStages.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </div>

      {/* Stage tabs (mini) */}
      <div className="flex border-b">
        {STAGE_CONFIG.map(s => {
          const Icon = s.icon;
          const available = !!getStageUrl(design, s.id);
          return (
            <button
              key={s.id}
              disabled={!available}
              onClick={() => available && setActiveStage(s.id)}
              title={s.label}
              className={`flex-1 py-2 flex justify-center items-center transition-colors ${
                !available
                  ? 'opacity-25 cursor-not-allowed'
                  : activeStage === s.id
                    ? 'bg-gray-900 text-white'
                    : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          );
        })}
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <div>
          <h3 className="font-semibold text-sm text-gray-900 truncate">{design.name}</h3>
          <p className="text-xs text-gray-500">{design.garmentType} · {design.gender}</p>
        </div>

        {design.colors.length > 0 && (
          <div className="flex gap-1">
            {design.colors.slice(0, 5).map((c, i) => (
              <div key={i} className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: c.toLowerCase() }} />
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400 line-clamp-1">{design.prompt}</p>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs h-8"
            onClick={() => onExpand(design, activeStage)}
          >
            View All
          </Button>
          {currentUrl && (
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-8 px-2"
              onClick={() => downloadFile(
                currentUrl,
                `${design.name}-${activeStage}.${activeStage === 'runway' ? 'mp4' : 'jpg'}`
              )}
            >
              <Download className="h-3 w-3" />
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 px-2 text-red-500 hover:text-red-600"
            onClick={() => onDelete(design.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

// ─── Main Portfolio Page ──────────────────────────────────────────────────────
export default function Portfolio() {
  const [designs, setDesigns] = useState<SavedDesign[]>([]);
  const [filteredDesigns, setFilteredDesigns] = useState<SavedDesign[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [favoriteFilter, setFavoriteFilter] = useState(false);
  const [expandedDesign, setExpandedDesign] = useState<{ design: SavedDesign; stage: Stage } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('fashion-portfolio');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDesigns(parsed);
        setFilteredDesigns(parsed);
      } catch {
        console.error('Failed to load portfolio');
      }
    }
  }, []);

  useEffect(() => {
    let f = [...designs];
    if (categoryFilter !== 'all') f = f.filter(d => d.category === categoryFilter);
    if (favoriteFilter) f = f.filter(d => d.favorite);
    setFilteredDesigns(f);
  }, [designs, categoryFilter, favoriteFilter]);

  const persist = (updated: SavedDesign[]) => {
    setDesigns(updated);
    localStorage.setItem('fashion-portfolio', JSON.stringify(updated));
  };

  const toggleFavorite = (id: string) => {
    persist(designs.map(d => d.id === id ? { ...d, favorite: !d.favorite } : d));
    toast({ title: "Updated favorites" });
  };

  const deleteDesign = (id: string) => {
    persist(designs.filter(d => d.id !== id));
    toast({ title: "Design deleted", variant: "destructive" });
  };

  const categories = Array.from(new Set(designs.map(d => d.category))).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate('/design')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Studio
              </Button>
              <div className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-gray-700" />
                <div>
                  <h1 className="font-semibold text-xl text-gray-900">My Portfolio</h1>
                  <p className="text-xs text-gray-500">{designs.length} design{designs.length !== 1 ? 's' : ''} saved</p>
                </div>
              </div>
            </div>
            <Button onClick={() => navigate('/design')}>
              <Sparkles className="h-4 w-4 mr-2" />
              New Design
            </Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-44 h-8 text-sm">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button
              variant={favoriteFilter ? "default" : "outline"}
              size="sm"
              className="h-8 text-sm"
              onClick={() => setFavoriteFilter(!favoriteFilter)}
            >
              {favoriteFilter ? <Heart className="h-3.5 w-3.5 mr-1.5 fill-current" /> : <HeartOff className="h-3.5 w-3.5 mr-1.5" />}
              Favorites
            </Button>
            {(categoryFilter !== 'all' || favoriteFilter) && (
              <Button variant="ghost" size="sm" className="h-8 text-sm" onClick={() => { setCategoryFilter('all'); setFavoriteFilter(false); }}>
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredDesigns.length === 0 ? (
          <div className="text-center py-24">
            <FolderOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {designs.length === 0 ? "No designs yet" : "No designs match your filters"}
            </h2>
            <p className="text-gray-400 mb-6 text-sm">
              {designs.length === 0
                ? "Designs are auto-saved as you create them in the studio"
                : "Try adjusting your filters"}
            </p>
            {designs.length === 0 && (
              <Button onClick={() => navigate('/design')}>
                <Sparkles className="h-4 w-4 mr-2" />
                Start Creating
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredDesigns.map(design => (
              <DesignCard
                key={design.id}
                design={design}
                onDelete={deleteDesign}
                onToggleFavorite={toggleFavorite}
                onExpand={(d, s) => setExpandedDesign({ design: d, stage: s })}
              />
            ))}
          </div>
        )}
      </main>

      {/* Expand Modal */}
      {expandedDesign && (
        <ExpandModal
          design={expandedDesign.design}
          initialStage={expandedDesign.stage}
          onClose={() => setExpandedDesign(null)}
          onDelete={deleteDesign}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}

// ─── Helper: save/update portfolio entry ─────────────────────────────────────
export const saveToPortfolio = (design: Omit<SavedDesign, 'id' | 'favorite' | 'createdAt'>) => {
  const saved = localStorage.getItem('fashion-portfolio');
  const existing: SavedDesign[] = saved ? JSON.parse(saved) : [];

  const newDesign: SavedDesign = {
    ...design,
    id: `design-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    favorite: false,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem('fashion-portfolio', JSON.stringify([newDesign, ...existing]));
  return newDesign;
};
