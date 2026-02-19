import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Scissors, Menu, X, ChevronDown } from "lucide-react";

// ─── Stage color palette ────────────────────────────────────────────────────
const STAGE_COLORS = [
  { main: "#FF2D78", glow: "rgba(255,45,120,0.55)",   name: "Rose Couture",  dark: "#C41254" },
  { main: "#A855F7", glow: "rgba(168,85,247,0.55)",   name: "Velvet Dream",  dark: "#7C3AED" },
  { main: "#F59E0B", glow: "rgba(245,158,11,0.55)",   name: "Golden Hour",   dark: "#B45309" },
  { main: "#10B981", glow: "rgba(16,185,129,0.55)",   name: "Emerald Isle",  dark: "#059669" },
  { main: "#3B82F6", glow: "rgba(59,130,246,0.55)",   name: "Sapphire Sky",  dark: "#1D4ED8" },
  { main: "#F97316", glow: "rgba(249,115,22,0.55)",   name: "Coral Blaze",   dark: "#C2410C" },
  { main: "#EC4899", glow: "rgba(236,72,153,0.55)",   name: "Fuchsia Glow",  dark: "#BE185D" },
];

// ─── Marquee items ──────────────────────────────────────────────────────────
const MARQUEE = [
  "Haute Couture", "Sketch to Runway", "Color Intelligence",
  "AI Design Engine", "Virtual Atelier", "Fashion Forward",
  "Creative Suite", "Style Engine", "Runway Ready",
];

// ─── Features ───────────────────────────────────────────────────────────────
const FEATURES = [
  {
    num: "01",
    icon: "✏️",
    title: "AI Sketch Engine",
    text: "Transform rough sketches into polished fashion illustrations. From pencil stroke to presentation-ready artwork in seconds.",
    accent: "#FF2D78",
  },
  {
    num: "02",
    icon: "🎨",
    title: "Dynamic Color Studio",
    text: "Explore every color across fabrics and textures in real-time. Watch your palette come alive on each garment instantly.",
    accent: "#A855F7",
  },
  {
    num: "03",
    icon: "👗",
    title: "Virtual Runway",
    text: "Bring collections to life with our 3D virtual runway. Present to clients with cinematic flair and photorealistic detail.",
    accent: "#F59E0B",
  },
];

// ─── Dress SVG path (elegant gown silhouette) ───────────────────────────────
const DRESS_PATH =
  "M 100 10 Q 120 0 140 10 L 155 55 Q 160 70 150 85 L 148 100 Q 170 160 185 230 Q 200 290 205 360 L 10 360 Q 15 290 30 230 Q 45 160 67 100 L 65 85 Q 55 70 60 55 Z";

// ─── Helper to interpolate hex color with opacity ────────────────────────────
function hexAlpha(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ───────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [colorIdx, setColorIdx]         = useState(0);
  const [prevIdx, setPrevIdx]           = useState(0);
  const [blend, setBlend]               = useState(1);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [featHover, setFeatHover]       = useState<number | null>(null);
  const [swatchHover, setSwatchHover]   = useState<number | null>(null);
  const particleRef                     = useRef<HTMLDivElement>(null);

  // ── Cycle stage colors ──
  useEffect(() => {
    const id = setInterval(() => {
      setPrevIdx(colorIdx);
      setBlend(0);
      setColorIdx(i => (i + 1) % STAGE_COLORS.length);
      let start: number | null = null;
      const anim = (ts: number) => {
        if (!start) start = ts;
        const t = Math.min((ts - start) / 1800, 1);
        setBlend(t);
        if (t < 1) requestAnimationFrame(anim);
      };
      requestAnimationFrame(anim);
    }, 3000);
    return () => clearInterval(id);
  }, [colorIdx]);

  // ── Scroll flag ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Mouse particles ──
  useEffect(() => {
    const COLORS_P = ["#FF2D78","#A855F7","#F59E0B","#10B981","#3B82F6","#F97316"];
    const onMove = (e: MouseEvent) => {
      if (Math.random() > 0.82 && particleRef.current) {
        const p = document.createElement("div");
        const size = Math.random() * 5 + 2;
        const color = COLORS_P[Math.floor(Math.random() * COLORS_P.length)];
        Object.assign(p.style, {
          position: "fixed",
          left: e.clientX + "px",
          top: e.clientY + "px",
          width: size + "px",
          height: size + "px",
          borderRadius: "50%",
          background: color,
          pointerEvents: "none",
          zIndex: "9999",
          opacity: "0.9",
          transition: "all 1.2s cubic-bezier(0.25,0.46,0.45,0.94)",
          boxShadow: `0 0 ${size * 3}px ${color}`,
        });
        document.body.appendChild(p);
        requestAnimationFrame(() => {
          Object.assign(p.style, {
            transform: `translate(${(Math.random() - 0.5) * 120}px, ${-90 - Math.random() * 100}px) scale(0)`,
            opacity: "0",
          });
        });
        setTimeout(() => p.remove(), 1300);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const cur  = STAGE_COLORS[colorIdx];
  const prev = STAGE_COLORS[prevIdx];

  // blended glow color
  const blendColor = (a: string, b: string, t: number) => {
    const parse = (c: string) => {
      const m = c.match(/rgba?\((\d+),(\d+),(\d+)/);
      return m ? [+m[1], +m[2], +m[3]] : [0, 0, 0];
    };
    const [ar, ag, ab] = parse(a);
    const [br, bg, bb] = parse(b);
    return `rgba(${Math.round(ar+(br-ar)*t)},${Math.round(ag+(bg-ag)*t)},${Math.round(ab+(bb-ab)*t)},0.5)`;
  };

  const currentGlow = blendColor(prev.glow, cur.glow, blend);
  const currentMain = cur.main; // used for dress fill

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060606",
        color: "#fff",
        fontFamily: "'Syne', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* ══════════════ CSS ANIMATIONS ══════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Syne:wght@400;500;600;700;800&display=swap');

        @keyframes gradShift {
          0%   { background-position: 0%   50%; }
          100% { background-position: 300% 50%; }
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(1);   opacity: 0.15; }
          50%       { transform: scale(1.08); opacity: 0.08; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes spotlightBeam {
          0%, 100% { opacity: 0.25; width: 260px; }
          50%       { opacity: 0.40; width: 320px; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerLogo {
          0%   { background-position: 0%   50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes drawStroke {
          from { stroke-dashoffset: 2000; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        .hero-title-line {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(64px, 10vw, 148px);
          font-weight: 700;
          line-height: 0.88;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }
        .hero-line-grad {
          background: linear-gradient(90deg,#FF2D78,#A855F7,#F59E0B,#10B981,#3B82F6,#F97316,#FF2D78);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradShift 6s linear infinite;
          font-style: italic;
        }
        .logo-text {
          background: linear-gradient(90deg,#FF2D78,#A855F7,#F59E0B,#FF2D78);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerLogo 3s linear infinite;
        }
        .marquee-track {
          display: flex;
          animation: marqueeScroll 22s linear infinite;
          white-space: nowrap;
        }
        .dress-svg {
          filter: drop-shadow(0 24px 28px rgba(0,0,0,0.65));
          transition: filter 1.8s ease;
        }
        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px;
          font-weight: 700;
          background: linear-gradient(135deg,#FF2D78,#A855F7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .btn-glow {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.3s;
        }
        .btn-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255,45,120,0.45);
        }
        .btn-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,#FF2D78,#A855F7,#F59E0B);
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.4s;
          animation: gradShift 3s linear infinite;
        }
        .btn-glow:hover::after { opacity: 1; }
        .feat-card {
          background: #0c0c0c;
          border: 1px solid rgba(255,255,255,0.07);
          transition: border-color 0.4s, background 0.4s, transform 0.3s;
        }
        .feat-card:hover { background: #131313; transform: translateY(-4px); }
        .swatch-bar {
          flex: 1;
          transition: flex 0.6s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .swatch-bar:hover { flex: 3; }
        .swatch-label {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 18px;
          background: rgba(0,0,0,0.35);
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          transform: translateY(100%);
          transition: transform 0.35s;
        }
        .swatch-bar:hover .swatch-label { transform: translateY(0); }
        .section-fade {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .section-fade.visible { opacity: 1; transform: translateY(0); }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #060606; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
      `}</style>

      {/* ══════════════ NAVBAR ══════════════ */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: "20px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(6,6,6,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link to="/home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36,
            borderRadius: "50%",
            border: `1.5px solid ${cur.main}50`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "border-color 1.8s ease",
          }}>
            <Scissors size={16} style={{ color: cur.main, transition: "color 1.8s ease" }} strokeWidth={1.5} />
          </div>
          <span className="logo-text" style={{ fontSize: 16, fontWeight: 700, letterSpacing: 2 }}>
            MUSE SKETCH STUDIO
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["Home", "Design", "Gallery", "Portfolio"].map(l => (
            <Link
              key={l}
              to={l === "Home" ? "/home" : `/${l.toLowerCase()}`}
              style={{
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                transition: "color 0.3s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              {l}
            </Link>
          ))}
          <Link
            to="/design"
            className="btn-glow"
            style={{
              padding: "10px 28px",
              background: "#fff",
              color: "#060606",
              fontSize: 11,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: 700,
              textDecoration: "none",
              position: "relative",
              zIndex: 1,
            }}
          >
            <span style={{ position: "relative", zIndex: 1 }}>Start Creating</span>
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </nav>

      {/* ══════════════ HERO ══════════════ */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: 100,
        }}
      >
        {/* Stage background — ambient colour wash, NOT emitted from dress */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 90% 55% at 50% 85%, ${currentGlow.replace("0.5)", "0.22)")}, transparent 70%)`,
            transition: "background 1.8s ease",
            pointerEvents: "none",
          }}
        />

        {/* Rotating ring decorations */}
        <div
          style={{
            position: "absolute",
            width: 700, height: 700,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.04)",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            animation: "rotateSlow 60s linear infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 500, height: 500,
            borderRadius: "50%",
            border: `1px solid ${hexAlpha(cur.main, 0.08)}`,
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            transition: "border-color 1.8s ease",
            animation: "rotateSlow 40s linear infinite reverse",
            pointerEvents: "none",
          }}
        />

        {/* Spotlight beam — theatre light from above, colour tinted */}
        <div
          style={{
            position: "absolute",
            top: 0, left: "50%",
            transform: "translateX(-50%)",
            width: 340, height: "72%",
            background: `linear-gradient(180deg, ${hexAlpha(cur.main, 0.18)} 0%, ${hexAlpha(cur.main, 0.06)} 60%, transparent 100%)`,
            clipPath: "polygon(38% 0%, 62% 0%, 88% 100%, 12% 100%)",
            transition: "background 1.8s ease",
            animation: "spotlightBeam 5s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        {/* Bright centre of beam (white-hot at source) */}
        <div
          style={{
            position: "absolute",
            top: 0, left: "50%",
            transform: "translateX(-50%)",
            width: 80, height: "40%",
            background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)",
            clipPath: "polygon(30% 0%, 70% 0%, 80% 100%, 20% 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Stage floor — realistic dark pool + very faint colour tint from overhead light */}
        <div
          style={{
            position: "absolute",
            bottom: 0, left: "50%",
            transform: "translateX(-50%)",
            width: 600, height: 160,
            background: `radial-gradient(ellipse 70% 100% at 50% 100%, rgba(0,0,0,0.55) 0%, ${hexAlpha(cur.main, 0.10)} 60%, transparent 100%)`,
            transition: "background 1.8s ease",
            pointerEvents: "none",
          }}
        />

        {/* CENTER: Dress SVG + Title */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 60,
            width: "100%",
            maxWidth: 1400,
            padding: "0 60px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Left title */}
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: 8,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: 24,
                animation: "fadeSlideUp 1s ease both",
              }}
            >
              Fashion Design Platform
            </p>
            <h1
              className="hero-title-line"
              style={{ animation: "fadeSlideUp 1s ease 0.1s both" }}
            >
              Design
            </h1>
            <h1
              className="hero-title-line hero-line-grad"
              style={{ animation: "fadeSlideUp 1s ease 0.2s both" }}
            >
              Without
            </h1>
            <h1
              className="hero-title-line"
              style={{ animation: "fadeSlideUp 1s ease 0.3s both", color: "rgba(255,255,255,0.18)" }}
            >
              Limits
            </h1>
          </div>

          {/* Dress / Stage figure */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              animation: "floatY 6s ease-in-out infinite",
            }}
          >
            {/* Color name badge */}
            <div
              style={{
                marginBottom: 20,
                padding: "6px 18px",
                border: `1px solid ${hexAlpha(cur.main, 0.4)}`,
                background: hexAlpha(cur.main, 0.1),
                fontSize: 10,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: cur.main,
                transition: "all 1.8s ease",
                fontWeight: 600,
              }}
            >
              {cur.name}
            </div>

            {/* The dress — 3D fashion gown, light reflects OFF fabric */}
            <div className="dress-svg">
              <svg
                width="260"
                height="440"
                viewBox="0 0 260 440"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* ── ALL SHADING USES FIXED BLACK / WHITE OVERLAYS ──
                      Base fill = cur.main (CSS-transitions smoothly).
                      These gradients never reference the theme colour,
                      so the colour transition is always silky smooth. */}

                  {/* Horizontal edge-shadow: black on sides, transparent centre */}
                  <linearGradient id="edgeShadow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="rgba(0,0,0,0.52)" />
                    <stop offset="26%"  stopColor="rgba(0,0,0,0)"    />
                    <stop offset="74%"  stopColor="rgba(0,0,0,0)"    />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.52)" />
                  </linearGradient>

                  {/* Subtle vertical depth on skirt near waist */}
                  <linearGradient id="waistDepth" x1="50%" y1="0%" x2="50%" y2="12%">
                    <stop offset="0%"   stopColor="rgba(0,0,0,0.30)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)"    />
                  </linearGradient>

                  {/* Specular highlight — stage light reflecting off satin fabric.
                      Off-centre (left-of-centre) because spotlight is slightly angled. */}
                  <radialGradient id="specular" cx="40%" cy="16%" r="35%" gradientUnits="objectBoundingBox">
                    <stop offset="0%"   stopColor="rgba(255,255,255,0.55)" />
                    <stop offset="45%"  stopColor="rgba(255,255,255,0.14)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
                  </radialGradient>

                  {/* Skirt specular (light hits upper skirt differently) */}
                  <radialGradient id="specularSkirt" cx="38%" cy="8%" r="38%" gradientUnits="objectBoundingBox">
                    <stop offset="0%"   stopColor="rgba(255,255,255,0.32)" />
                    <stop offset="50%"  stopColor="rgba(255,255,255,0.08)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
                  </radialGradient>

                  {/* Dark ground shadow — NOT coloured */}
                  <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="rgba(0,0,0,0.75)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)"    />
                  </radialGradient>

                  {/* Clips */}
                  <clipPath id="skirtClip">
                    <path d="M 88 138 Q 44 230 6 422 L 254 422 Q 216 230 172 138 Z" />
                  </clipPath>
                  <clipPath id="bodiceClip">
                    <path d="M 70 28 Q 90 8 106 16 Q 118 24 130 20 Q 142 24 154 16 Q 170 8 190 28 L 178 138 L 82 138 Z" />
                  </clipPath>
                </defs>

                {/* ── GROUND SHADOW (realistic, dark, under dress) ── */}
                <ellipse cx="130" cy="432" rx="75" ry="10" fill="url(#groundShadow)" />

                {/* ══ SKIRT ══ */}
                {/* 1. Base fabric colour — CSS transitions this smoothly */}
                <path
                  d="M 88 138 Q 44 230 6 422 L 254 422 Q 216 230 172 138 Z"
                  fill={cur.main}
                  style={{ transition: "fill 1.8s ease" }}
                />
                {/* 2. Side shadows (fixed black overlay) */}
                <path
                  d="M 88 138 Q 44 230 6 422 L 254 422 Q 216 230 172 138 Z"
                  fill="url(#edgeShadow)"
                />
                {/* 3. Waist-gather depth shadow */}
                <path
                  d="M 88 138 Q 44 230 6 422 L 254 422 Q 216 230 172 138 Z"
                  fill="url(#waistDepth)"
                  clipPath="url(#skirtClip)"
                />

                {/* Fabric fold lines — skirt (darker, not lighter, = real folds) */}
                <path d="M 108 146 Q 78 230 52 340 Q 38 380 28 422"  fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 118 142 Q 96 230 80 330 Q 68 376 60 422"  fill="none" stroke="rgba(0,0,0,0.10)" strokeWidth="1"   strokeLinecap="round" />
                <path d="M 130 140 Q 128 240 126 340 Q 124 380 124 422" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="1"   strokeLinecap="round" />
                <path d="M 152 142 Q 164 230 180 330 Q 190 376 198 422" fill="none" stroke="rgba(0,0,0,0.10)" strokeWidth="1"   strokeLinecap="round" />
                <path d="M 162 146 Q 182 230 208 340 Q 220 380 230 422" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1.2" strokeLinecap="round" />

                {/* Hem layers — tulle/petticoat peeking out */}
                <path d="M 10  402 Q 70  396 130 398 Q 190 396 250 402 Q 190 408 130 410 Q 70  408 10  402 Z"
                  fill="rgba(255,255,255,0.13)" />
                <path d="M 6   418 Q 70  412 130 414 Q 190 412 254 418"
                  fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
                <path d="M 14  410 Q 70  404 130 406 Q 190 404 246 410"
                  fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

                {/* ══ BODICE ══ */}
                {/* 1. Base fabric colour */}
                <path
                  d="M 70 28 Q 90 8 106 16 Q 118 24 130 20 Q 142 24 154 16 Q 170 8 190 28 L 178 138 L 82 138 Z"
                  fill={cur.main}
                  style={{ transition: "fill 1.8s ease" }}
                />
                {/* 2. Side shadows (fixed black overlay) */}
                <path
                  d="M 70 28 Q 90 8 106 16 Q 118 24 130 20 Q 142 24 154 16 Q 170 8 190 28 L 178 138 L 82 138 Z"
                  fill="url(#edgeShadow)"
                  clipPath="url(#bodiceClip)"
                />

                {/* Bodice boning / seam lines */}
                <path d="M 114 22 L 112 136" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="0.9" />
                <path d="M 146 22 L 148 136" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="0.9" />
                <path d="M 130 20 L 130 136" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="0.8" />

                {/* Ruching crease, centre-left bodice */}
                <path d="M 96 32 Q 100 80 98 134" fill="none" stroke="rgba(0,0,0,0.09)" strokeWidth="1" strokeLinecap="round" />
                <path d="M 164 32 Q 160 80 162 134" fill="none" stroke="rgba(0,0,0,0.09)" strokeWidth="1" strokeLinecap="round" />

                {/* ══ SWEETHEART NECKLINE ══ */}
                {/* Left bust curve */}
                <path
                  d="M 70 28 Q 84 6 104 14 Q 116 20 130 16"
                  fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.8" strokeLinecap="round"
                />
                {/* Right bust curve */}
                <path
                  d="M 190 28 Q 176 6 156 14 Q 144 20 130 16"
                  fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.8" strokeLinecap="round"
                />
                {/* Inner neckline edge (depth) */}
                <path
                  d="M 74 30 Q 88 10 106 18 Q 118 24 130 20 Q 142 24 154 18 Q 172 10 186 30"
                  fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeLinecap="round"
                />

                {/* ══ WAIST BAND ══ */}
                <path
                  d="M 82 134 Q 130 142 178 134 Q 130 128 82 134"
                  fill="rgba(0,0,0,0.18)"
                />
                <path
                  d="M 82 136 Q 130 144 178 136"
                  fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round"
                />
                {/* Small bow at waist */}
                <path d="M 118 136 Q 130 128 142 136 Q 130 144 118 136 Z" fill="rgba(255,255,255,0.30)" />
                <path d="M 118 136 Q 130 128 142 136 Q 130 144 118 136 Z" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />

                {/* ══ STAGE-LIGHT REFLECTION ══
                     Specular highlight — the stage spotlight from above reflects
                     off the satin. NOT the dress glowing outward; this is light
                     bouncing off the fabric surface toward the viewer. */}
                {/* Bodice specular */}
                <path
                  d="M 70 28 Q 90 8 106 16 Q 118 24 130 20 Q 142 24 154 16 Q 170 8 190 28 L 178 138 L 82 138 Z"
                  fill="url(#specular)"
                  clipPath="url(#bodiceClip)"
                />
                {/* Skirt specular (spotlight from above, dims toward hem) */}
                <path
                  d="M 88 138 Q 44 230 6 422 L 254 422 Q 216 230 172 138 Z"
                  fill="url(#specularSkirt)"
                  clipPath="url(#skirtClip)"
                />

                {/* ══ SILHOUETTE OUTLINE — editorial, hand-drawn feel ══ */}
                <path
                  d="M 70 28 Q 90 8 106 16 Q 118 24 130 20 Q 142 24 154 16 Q 170 8 190 28 L 178 138 Q 216 230 254 422 L 6 422 Q 44 230 82 138 Z"
                  fill="none"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1.2"
                />
              </svg>
            </div>

            {/* Color dot indicator strip */}
            <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
              {STAGE_COLORS.map((c, i) => (
                <div
                  key={i}
                  onClick={() => { setPrevIdx(colorIdx); setColorIdx(i); }}
                  style={{
                    width: i === colorIdx ? 28 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === colorIdx ? c.main : "rgba(255,255,255,0.2)",
                    cursor: "pointer",
                    transition: "all 0.4s ease",
                    boxShadow: i === colorIdx ? `0 0 12px ${c.main}` : "none",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: Subtitle + CTA */}
          <div style={{ animation: "fadeSlideUp 1s ease 0.4s both" }}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontStyle: "italic",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                maxWidth: 360,
                marginBottom: 48,
              }}
            >
              Where imagination meets craftsmanship. Sketch, style, and bring your vision to the runway.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Link
                to="/design"
                className="btn-glow"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "18px 40px",
                  background: "#fff",
                  color: "#060606",
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <span style={{ position: "relative", zIndex: 1 }}>Begin Collection</span>
                <ArrowRight size={14} style={{ position: "relative", zIndex: 1 }} />
              </Link>
              <Link
                to="/gallery"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "18px 40px",
                  background: "transparent",
                  color: "#fff",
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  fontWeight: 500,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.2)",
                  transition: "border-color 0.3s, background 0.3s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                View Gallery
              </Link>
            </div>

            {/* Stats mini row */}
            <div style={{ display: "flex", gap: 32, marginTop: 56 }}>
              {[
                { n: "10K+", l: "Designers" },
                { n: "50K+", l: "Collections" },
                { n: "180+", l: "Countries" },
              ].map(s => (
                <div key={s.n}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 32,
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${cur.main}, ${cur.dark})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    transition: "background 1.8s ease",
                    lineHeight: 1,
                  }}>
                    {s.n}
                  </div>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginTop: 4 }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            color: "rgba(255,255,255,0.3)",
            fontSize: 10,
            letterSpacing: 3,
            textTransform: "uppercase",
            animation: "floatY 3s ease-in-out infinite",
          }}
        >
          Scroll
          <ChevronDown size={14} />
        </div>
      </section>

      {/* ══════════════ MARQUEE STRIP ══════════════ */}
      <div
        style={{
          padding: "18px 0",
          background: `linear-gradient(90deg, #FF2D78, #A855F7, #F59E0B, #10B981, #3B82F6, #F97316, #FF2D78)`,
          backgroundSize: "300% 100%",
          animation: "gradShift 8s linear infinite",
          overflow: "hidden",
        }}
      >
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span
              key={i}
              style={{
                fontSize: 11,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.65)",
                padding: "0 40px",
                fontWeight: 700,
              }}
            >
              {item} <span style={{ margin: "0 8px" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════ FEATURES ══════════════ */}
      <section style={{ padding: "120px 60px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{ fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 20 }}>
            What We Offer
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px,5vw,72px)", fontWeight: 700, lineHeight: 1.1 }}>
            The Complete{" "}
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>Designer's</em>{" "}
            Toolkit
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "rgba(255,255,255,0.07)" }}>
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="feat-card"
              style={{ padding: "56px 40px", position: "relative", borderColor: featHover === i ? `${f.accent}40` : undefined }}
              onMouseEnter={() => setFeatHover(i)}
              onMouseLeave={() => setFeatHover(null)}
            >
              {/* Top accent bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: 2,
                  background: f.accent,
                  transform: featHover === i ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s ease",
                  boxShadow: featHover === i ? `0 0 20px ${f.accent}` : "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 16, right: 24,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 90,
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.03)",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {f.num}
              </div>
              <span style={{ fontSize: 40, display: "block", marginBottom: 28 }}>{f.icon}</span>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 30,
                  fontWeight: 700,
                  marginBottom: 16,
                  color: featHover === i ? f.accent : "#fff",
                  transition: "color 0.3s",
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ COLOR PALETTE SECTION ══════════════ */}
      <section style={{ padding: "80px 60px 120px", background: "#050505" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 20 }}>
              Color Intelligence
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px,5vw,72px)", fontWeight: 700, lineHeight: 1.1 }}>
              Your Palette,{" "}
              <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>Infinite</em>{" "}
              Possibilities
            </h2>
          </div>

          {/* Expanding swatches */}
          <div style={{ display: "flex", height: 280, gap: 2 }}>
            {STAGE_COLORS.map((c, i) => (
              <div
                key={i}
                className="swatch-bar"
                style={{
                  background: `linear-gradient(180deg, ${c.main}, ${c.dark})`,
                  boxShadow: swatchHover === i ? `0 0 40px ${c.main}40` : "none",
                }}
                onMouseEnter={() => setSwatchHover(i)}
                onMouseLeave={() => setSwatchHover(null)}
              >
                <div className="swatch-label">
                  {c.name}
                  <br />
                  <small style={{ opacity: 0.6 }}>{c.main}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ ABOUT / SKETCH SECTION ══════════════ */}
      <section style={{ padding: "120px 60px", maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        {/* Left */}
        <div>
          <p style={{ fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 24 }}>
            About the Studio
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px,4vw,64px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 32 }}>
            Where <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>fashion</em>
            <br />meets technology
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 48 }}>
            Muse Sketch Studio is the premier digital atelier for fashion designers. From initial sketch to final collection, our platform empowers you to create, iterate, and perfect your designs with unprecedented precision and artistry.
          </p>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.08)" }}>
            {[
              { n: "10K+", l: "Active Designers" },
              { n: "50K+", l: "Collections Created" },
              { n: "180+", l: "Countries" },
              { n: "∞", l: "Possibilities" },
            ].map(s => (
              <div key={s.n} style={{ background: "#060606", padding: "32px" }}>
                <div className="stat-number">{s.n}</div>
                <div style={{ fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginTop: 8 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Animated Sketch Canvas */}
        <div
          style={{
            height: 560,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#0a0a0a",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Grid lines */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Animated SVG sketch */}
          <svg
            viewBox="0 0 400 560"
            width="100%"
            height="100%"
            style={{ position: "absolute", inset: 0 }}
          >
            {/* Fashion figure sketch */}
            {[
              // Head
              "M 185 55 Q 215 35 235 60 Q 242 88 222 102 Q 202 114 182 102 Q 168 88 185 55",
              // Neck
              "M 200 114 L 200 138",
              // Shoulders
              "M 148 152 Q 174 136 200 138 Q 226 136 252 152",
              // Bodice
              "M 148 152 L 143 248 M 252 152 L 257 248",
              // Waist
              "M 143 248 Q 200 256 257 248",
              // Skirt flare
              "M 143 248 Q 118 320 96 400 L 304 400 Q 282 320 257 248",
              // Left arm
              "M 148 162 Q 118 204 108 264",
              // Right arm
              "M 252 162 Q 282 204 292 264",
              // Design lines (measurement marks)
              "M 80 400 L 320 400",
              "M 80 400 L 80 420 M 200 400 L 200 420 M 320 400 L 320 420",
            ].map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke={`rgba(255,255,255,${0.15 + (i % 3) * 0.05})`}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeDasharray="2000"
                strokeDashoffset="2000"
                style={{
                  animation: `drawStroke 2.5s ease-in-out ${i * 0.2}s forwards`,
                }}
              />
            ))}
            {/* Color swatch boxes */}
            {[cur.main, cur.dark, "#fff", "rgba(255,255,255,0.4)"].map((c, i) => (
              <rect
                key={i}
                x={30 + i * 40}
                y={490}
                width={30}
                height={30}
                fill={c}
                rx={2}
                style={{ transition: "fill 1.8s ease" }}
              />
            ))}
            {/* Annotation text */}
            <text x="30" y="480" fill="rgba(255,255,255,0.25)" fontSize="8" letterSpacing="2" fontFamily="monospace">
              COLOR PALETTE — SS/2026
            </text>
            <text x="30" y="540" fill="rgba(255,255,255,0.15)" fontSize="8" letterSpacing="2" fontFamily="monospace">
              MUSE SKETCH STUDIO © ATELIER
            </text>
          </svg>
        </div>
      </section>

      {/* ══════════════ CTA SECTION ══════════════ */}
      <section
        style={{
          padding: "160px 60px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          background: "#050505",
        }}
      >
        {/* BG glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${hexAlpha(cur.main, 0.12)}, transparent)`,
            transition: "background 1.8s ease",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 32 }}>
            Get Started Today
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(56px,8vw,110px)",
            fontWeight: 700,
            lineHeight: 0.95,
            marginBottom: 36,
          }}>
            Ready to{" "}
            <em className="hero-line-grad">Create?</em>
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.45)",
            marginBottom: 56,
          }}>
            Join 10,000+ designers shaping the future of fashion
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <Link
              to="/design"
              className="btn-glow"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "20px 56px",
                background: "#fff",
                color: "#060606",
                fontSize: 11,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontWeight: 700,
                textDecoration: "none",
                position: "relative",
                zIndex: 1,
              }}
            >
              <span style={{ position: "relative", zIndex: 1 }}>Start Free Trial</span>
              <ArrowRight size={14} style={{ position: "relative", zIndex: 1 }} />
            </Link>
            <Link
              to="/gallery"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "20px 56px",
                background: "transparent",
                color: "#fff",
                fontSize: 11,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontWeight: 500,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.25)",
                transition: "border-color 0.3s",
              }}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer
        style={{
          padding: "48px 60px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "center",
        }}
      >
        <div>
          <span className="logo-text" style={{ fontSize: 14, fontWeight: 700, letterSpacing: 3 }}>
            MUSE SKETCH STUDIO
          </span>
        </div>
        <div style={{ display: "flex", gap: 32, justifyContent: "center" }}>
          {["Privacy", "Terms", "Contact", "Blog"].map(l => (
            <a
              key={l}
              href="#"
              style={{
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
                fontSize: 10,
                letterSpacing: 2,
                textTransform: "uppercase",
                transition: "color 0.3s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
            >
              {l}
            </a>
          ))}
        </div>
        <div style={{ textAlign: "right", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 1 }}>
          © 2026 Muse Sketch Studio
        </div>
      </footer>

      {/* Particle container ref */}
      <div ref={particleRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998 }} />
    </div>
  );
}
