import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Scissors, Pencil, Palette, User } from "lucide-react";

const ACCENT = "#C084FC";
const BG = "#0D0819";

// Image sets: 3 real pipelines (sketch → color → model)
// Set 1: images 1,2,3 — Draped cape gown (red)
// Set 2: images 4,5,6 — Geometric structured jacket (black)
// Set 3: images 7,8,9 — Dragon fantasy coat (black/red/gold)

const DESIGNS = [
  {
    id: 1,
    imageSet: 1,
    title: "La Nuit Éternelle",
    category: "Haute Couture",
    season: "SS 2026",
    desc: "A sculptural draped gown with flowing cape sleeves. Hand-pleated silk chiffon meets a sweetheart bodice in deep crimson.",
    col: "#C084FC",
    dark: "#7C3AED",
    tags: ["Cape Gown", "Silk Chiffon", "Black Tie"],
  },
  {
    id: 2,
    imageSet: 2,
    title: "Midnight Atelier",
    category: "Ready-to-Wear",
    season: "AW 2025",
    desc: "Power dressing reimagined — geometric razor-sharp blazer with exaggerated angular structure and asymmetric peplum hem.",
    col: "#F9A8D4",
    dark: "#BE185D",
    tags: ["Power Dressing", "Tailoring", "Contemporary"],
  },
  {
    id: 3,
    imageSet: 3,
    title: "Jardin Enchanté",
    category: "Avant-Garde",
    season: "SS 2026",
    desc: "Dragon-motif embroidery coat with sculptural spiked collar, flame appliqué sleeves, and an asymmetric swirling hem.",
    col: "#6EE7B7",
    dark: "#059669",
    tags: ["Embroidery", "Statement Coat", "Fantasy"],
  },
  {
    id: 4,
    imageSet: 1,
    title: "Voile d'Ivoire",
    category: "Bridal",
    season: "SS 2026",
    desc: "The iconic draped cape silhouette reimagined in bridal white — flowing chiffon panels cascade from a ruched sweetheart bodice.",
    col: "#FCD34D",
    dark: "#B45309",
    tags: ["Bridal", "Cape Sleeve", "Draped"],
  },
  {
    id: 5,
    imageSet: 2,
    title: "The New Silhouette",
    category: "Ready-to-Wear",
    season: "AW 2025",
    desc: "Architectural angles challenge convention — structured geometric panels create unexpected volumes that redefine the modern power suit.",
    col: "#93C5FD",
    dark: "#1D4ED8",
    tags: ["Deconstructed", "Volume", "Conceptual"],
  },
  {
    id: 6,
    imageSet: 3,
    title: "Côte d'Azur",
    category: "Resort",
    season: "Resort 2026",
    desc: "Bold artisanal embroidery on structured canvas — the spirit of avant-garde fantasy translated into resort-ready wearable art.",
    col: "#FDE68A",
    dark: "#D97706",
    tags: ["Resort", "Embroidery", "Artisanal"],
  },
];

type Stage = "sketch" | "color" | "model";

// Map imageSet + stage → real JPEG path
function getImage(imageSet: number, stage: Stage): string {
  const base = (imageSet - 1) * 3;
  if (stage === "sketch") return `./image-${base + 1}.jpeg`;
  if (stage === "color")  return `./image-${base + 2}.jpeg`;
  return `./image-${base + 3}.jpeg`;
}

const STAGES: { key: Stage; label: string; icon: React.ElementType }[] = [
  { key: "sketch", label: "AI Sketch",     icon: Pencil  },
  { key: "color",  label: "Colour Design", icon: Palette },
  { key: "model",  label: "Runway Model",  icon: User    },
];

export default function Gallery() {
  const [activeStage, setActiveStage] = useState<Record<number, Stage>>({});
  const getStage = (id: number): Stage => activeStage[id] || "sketch";

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "#fff", fontFamily: "'Syne', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Syne:wght@400;500;600;700;800&display=swap');
        @keyframes shimLogo { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .logo-g {
          background: linear-gradient(90deg,#C084FC,#F9A8D4,#FCD34D,#C084FC);
          background-size:200% 100%;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          animation: shimLogo 4s linear infinite;
        }
        .g-card { transition: transform 0.4s ease, box-shadow 0.4s ease; }
        .g-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
        .stage-btn { cursor:pointer; padding:8px 14px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:rgba(255,255,255,0.45); font-size:8px; letter-spacing:1.5px; text-transform:uppercase; display:flex; align-items:center; gap:5px; transition: all 0.3s ease; font-family:'Syne',sans-serif; font-weight:500; }
        .stage-btn:hover { border-color:rgba(255,255,255,0.3); color:rgba(255,255,255,0.7); }
        .stage-btn.active { border-color:currentColor; }
        .g-tag { display:inline-block; padding:3px 10px; font-size:8px; letter-spacing:1.5px; text-transform:uppercase; border:1px solid rgba(255,255,255,0.12); color:rgba(255,255,255,0.45); margin:0 3px 5px 0; }
        .gallery-img { width:100%; height:100%; object-fit:cover; object-position:top center; display:block; transition: transform 0.5s ease, opacity 0.35s ease; }
        .g-card:hover .gallery-img { transform: scale(1.04); }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "22px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", background: `${BG}E8`, backdropFilter: "blur(22px)", borderBottom: "1px solid rgba(255,255,255,0.045)" }}>
        <Link to="/home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", border: `1px solid ${ACCENT}42`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Scissors size={15} style={{ color: ACCENT }} strokeWidth={1.4} />
          </div>
          <span className="logo-g" style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3 }}>MUSE SKETCH STUDIO</span>
        </Link>
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {[["Home", "/home"], ["Blog", "/blog"], ["About", "/about"]].map(([l, to]) => (
            <Link key={l} to={to} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", transition: "color 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>{l}</Link>
          ))}
          <Link to="/design" style={{ padding: "9px 26px", background: "rgba(255,255,255,0.95)", color: "#0a0a0a", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, textDecoration: "none" }}>Start Free Trial</Link>
        </div>
      </nav>

      {/* HERO */}
      <header style={{ padding: "100px 72px 72px", maxWidth: 1440, margin: "0 auto" }}>
        <p style={{ fontSize: 10, letterSpacing: 7, textTransform: "uppercase", color: ACCENT, marginBottom: 24 }}>Collections & Lookbook</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px,7vw,96px)", fontWeight: 700, lineHeight: 0.9 }}>The<br /><em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.35)" }}>Atelier</em><br />Gallery</h1>
          <p style={{ maxWidth: 380, fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontStyle: "italic", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>Watch each design come to life — from initial AI sketch to full colour rendering to runway presentation, without a single sample sewn.</p>
        </div>
      </header>

      <div style={{ height: 1, background: "rgba(255,255,255,0.055)", maxWidth: 1440, margin: "0 auto" }} />

      {/* GALLERY GRID */}
      <section style={{ padding: "72px 72px 120px", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {DESIGNS.map(d => {
            const stage = getStage(d.id);
            return (
              <div key={d.id} className="g-card" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", position: "relative" }}>

                {/* Real photo image area */}
                <div style={{ height: 380, overflow: "hidden", position: "relative", background: "#0a0a0a" }}>
                  <img
                    key={`${d.id}-${stage}`}
                    src={getImage(d.imageSet, stage)}
                    alt={`${d.title} — ${stage}`}
                    className="gallery-img"
                    style={{ height: 380 }}
                  />
                  {/* Subtle gradient overlay at bottom */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, rgba(13,8,25,0.6), transparent)", pointerEvents: "none" }} />
                </div>

                {/* Stage toggle buttons */}
                <div style={{ display: "flex", borderTop: `2px solid ${d.col}`, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {STAGES.map(s => {
                    const isActive = stage === s.key;
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.key}
                        className={`stage-btn ${isActive ? "active" : ""}`}
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          color: isActive ? d.col : undefined,
                          background: isActive ? `${d.col}14` : undefined,
                          borderColor: isActive ? `${d.col}55` : undefined,
                        }}
                        onClick={() => setActiveStage(prev => ({ ...prev, [d.id]: s.key }))}
                      >
                        <Icon size={11} />
                        {s.label}
                      </button>
                    );
                  })}
                </div>

                {/* Card info */}
                <div style={{ padding: "24px 28px 32px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: d.col, fontWeight: 600 }}>{d.category}</span>
                    <span style={{ fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.28)", textTransform: "uppercase" }}>{d.season}</span>
                  </div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, marginBottom: 12, lineHeight: 1.1 }}>{d.title}</h2>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "rgba(255,255,255,0.44)", lineHeight: 1.7, marginBottom: 18 }}>{d.desc}</p>
                  <div>{d.tags.map(tag => <span key={tag} className="g-tag">{tag}</span>)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PIPELINE */}
      <section style={{ padding: "80px 72px 100px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.045)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: ACCENT, marginBottom: 18 }}>The Pipeline</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 700 }}>Every piece passes through <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.35)" }}>three stages</em></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: "rgba(255,255,255,0.04)" }}>
            {[
              { n: "01", icon: Pencil,  title: "AI Sketch",     text: "Professional fashion croquis — 9-head proportions, confident lines, construction accuracy." },
              { n: "02", icon: Palette, title: "Colour Design",  text: "Full colour rendering with realistic fabric shading, highlights, and embellishments." },
              { n: "03", icon: User,    title: "Runway Ready",   text: "Model presentation with professional pose, lighting, and ready for lookbooks." },
            ].map((s, i) => (
              <div key={i} style={{ padding: "48px 40px", background: "#0D0819" }}>
                <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 24 }}>{s.n}</div>
                <s.icon size={36} style={{ color: ACCENT, marginBottom: 20, opacity: 0.7 }} strokeWidth={1.2} />
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, marginBottom: 14 }}>{s.title}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "rgba(255,255,255,0.46)", lineHeight: 1.78 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "120px 72px", textAlign: "center" }}>
        <p style={{ fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: ACCENT, marginBottom: 24 }}>Your Turn</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px,6vw,80px)", fontWeight: 700, lineHeight: 0.94, marginBottom: 48 }}>Create your next<br /><em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.3)" }}>masterpiece</em></h2>
        <Link
          to="/design"
          style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "18px 52px", background: "rgba(255,255,255,0.95)", color: "#0a0a0a", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, textDecoration: "none", transition: "transform 0.25s, box-shadow 0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 44px rgba(0,0,0,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
        >
          Start Free Trial <ArrowRight size={14} />
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 72px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="logo-g" style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3 }}>MUSE SKETCH STUDIO</span>
        <div style={{ display: "flex", gap: 24 }}>
          {[["Home", "/home"], ["Blog", "/blog"], ["About", "/about"]].map(([l, to]) => (
            <Link key={l} to={to} style={{ color: "rgba(255,255,255,0.26)", textDecoration: "none", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", transition: "color 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.26)")}>{l}</Link>
          ))}
        </div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.17)", letterSpacing: 1 }}>© 2026 Muse Sketch Studio</div>
      </footer>
    </div>
  );
}
