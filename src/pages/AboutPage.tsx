import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Scissors } from "lucide-react";

const ACCENT = "#C084FC";
const BG     = "#0D0819";

// ─── Decorative SVGs ──────────────────────────────────────────────────────────
function SewingMachineSVG({ color = "white", size = 300 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size * 0.78} viewBox="0 0 300 234" fill="none"
      stroke={color} strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="200" width="288" height="22" rx="4" strokeWidth="1.8" />
      <path d="M30 200 L30 86 Q30 46 68 43 L196 43 Q254 43 256 82 L256 200" strokeWidth="1.8" />
      <path d="M62 200 L62 104 Q62 74 88 72 L204 72 L204 200" strokeWidth="1.3" opacity={0.55} />
      <circle cx="238" cy="103" r="29" strokeWidth="1.8" />
      <circle cx="238" cy="103" r="11" strokeWidth="1.5" />
      <circle cx="238" cy="103" r="4.5" fill={color} strokeWidth="0" />
      <line x1="238" y1="74" x2="238" y2="132" strokeWidth="1" opacity={0.35} />
      <line x1="209" y1="103" x2="267" y2="103" strokeWidth="1" opacity={0.35} />
      <line x1="217" y1="82" x2="259" y2="124" strokeWidth="1" opacity={0.25} />
      <line x1="259" y1="82" x2="217" y2="124" strokeWidth="1" opacity={0.25} />
      <line x1="100" y1="72" x2="100" y2="188" strokeWidth="2.5" />
      <rect x="92" y="188" width="20" height="8" rx="2" strokeWidth="1.5" />
      <ellipse cx="122" cy="200" rx="26" ry="5" strokeWidth="1.4" opacity={0.65} />
      <circle cx="86" cy="58" r="9" strokeWidth="1.5" /><circle cx="86" cy="58" r="3.5" fill={color} strokeWidth="0" />
      <ellipse cx="148" cy="33" rx="15" ry="8" strokeWidth="1.5" />
      <ellipse cx="148" cy="41" rx="15" ry="5" strokeWidth="1.2" opacity={0.5} />
      <path d="M150 40 Q124 56 102 74" strokeWidth="1" strokeDasharray="4 3" opacity={0.5} />
      <circle cx="182" cy="40" r="8" strokeWidth="1.5" />
    </svg>
  );
}

function TailorLSquare({ color = "white" }: { color?: string }) {
  const marks: React.ReactNode[] = [];
  for (let i = 0; i <= 28; i++) {
    const y = i * 6; const major = i % 5 === 0; const med = i % 2 === 0;
    marks.push(<line key={`v${i}`} x1={14} y1={y} x2={major ? 25 : med ? 21 : 18} y2={y}
      stroke={color} strokeWidth={major ? 1.2 : 0.7} />);
    if (major && i > 0) marks.push(<text key={`vt${i}`} x={28} y={y + 3} fontSize="7"
      fill={color} fontFamily="monospace" opacity={0.8}>{i}</text>);
  }
  for (let i = 0; i <= 22; i++) {
    const x = i * 6; const major = i % 5 === 0; const med = i % 2 === 0;
    marks.push(<line key={`h${i}`} x1={x} y1={168} x2={x} y2={major ? 157 : med ? 161 : 164}
      stroke={color} strokeWidth={major ? 1.2 : 0.7} />);
    if (major && i > 0) marks.push(<text key={`ht${i}`} x={x} y={155} textAnchor="middle"
      fontSize="7" fill={color} fontFamily="monospace" opacity={0.8}>{i}</text>);
  }
  return (
    <svg width="180" height="200" viewBox="0 0 160 190" fill="none">
      <rect x="10" y="0" width="8" height="170" rx="2" fill={color} opacity={0.85} />
      <rect x="10" y="162" width="132" height="8" rx="2" fill={color} opacity={0.85} />
      {marks}
    </svg>
  );
}

function NeedleThread({ color = "white", accent = "#C084FC" }: { color?: string; accent?: string }) {
  return (
    <svg width="160" height="100" viewBox="0 0 160 100" fill="none">
      <path d="M10 10 Q60 35 150 88" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <ellipse cx="16" cy="14" rx="4" ry="7" transform="rotate(-28 16 14)"
        stroke={color} strokeWidth="1.4" />
      <path d="M13 10 Q-5 48 18 68 Q40 88 28 100" stroke={accent} strokeWidth="1"
        strokeDasharray="5 3" opacity={0.7} />
      <circle cx="10" cy="8" r="3" fill={accent} opacity={0.6} />
    </svg>
  );
}


const VALUES = [
  { title:"Creator First", text:"Every feature we build serves the person creating — not the process around them. Technology exists to remove friction from imagination, nothing more." },
  { title:"No Gatekeeping", text:"Professional-quality tools should be accessible to anyone with a vision, regardless of geography, background, or how they learned to sketch." },
  { title:"AI as a Collaborator", text:"We don't believe AI replaces creativity. We believe it accelerates it — handling the mechanical so the creative can breathe and move faster." },
  { title:"Built to Last", text:"We build for the person who will still be using Muse in five years. Depth and reliability over shortcuts and demos." },
];

const PILLARS = [
  { num:"01", title:"The Sketch Layer", text:"AI-powered pencil drafts that respond to natural language. Describe a silhouette, a drape, a mood — and watch a sketch emerge." },
  { num:"02", title:"The Colour Layer", text:"Push a sketch forward into full colour exploration. Swap palettes, test fabric textures, and iterate at the speed of thought." },
  { num:"03", title:"The Runway Layer", text:"Visualise how a design sits on a figure in motion. From flat sketch to styled model — the complete design pipeline, in one tool." },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight:"100vh", background:BG, color:"#fff", fontFamily:"'Syne', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=Syne:wght@400;500;600;700;800&display=swap');
        @keyframes shimLogo { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .logo-a { background: linear-gradient(90deg,#C084FC,#F9A8D4,#FCD34D,#C084FC); background-size:200% 100%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation: shimLogo 4s linear infinite; }
        .pillar-card { transition: transform 0.3s, background 0.3s; }
        .pillar-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.055) !important; }
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
          <span className="logo-a" style={{ fontSize:13, fontWeight:700, letterSpacing:3 }}>MUSE SKETCH STUDIO</span>
        </Link>
        <div style={{ display:"flex", gap:40, alignItems:"center" }}>
          {[["Home","/home"],["Gallery","/gallery"],["Blog","/blog"]].map(([l,to])=>(
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

      {/* HERO */}
      <header style={{ padding:"110px 72px 96px", maxWidth:1440, margin:"0 auto", borderBottom:"1px solid rgba(255,255,255,0.055)", position:"relative", overflow:"hidden" }}>
        {/* Sewing machine watermark — top right */}
        <div style={{ position:"absolute", top:-20, right:-40, opacity:0.05, pointerEvents:"none", zIndex:0 }}>
          <SewingMachineSVG color={ACCENT} size={420} />
        </div>
        {/* L-square — bottom left corner */}
        <div style={{ position:"absolute", bottom:0, left:32, opacity:0.07, pointerEvents:"none", zIndex:0 }}>
          <TailorLSquare color="white" />
        </div>
        <p style={{ fontSize:10, letterSpacing:7, textTransform:"uppercase", color:ACCENT, marginBottom:28, position:"relative", zIndex:1 }}>Our Story</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start", position:"relative", zIndex:1 }}>
          <h1 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(52px,7vw,96px)", fontWeight:700, lineHeight:0.9 }}>
            Built by a<br />builder, for<br /><em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.28)" }}>every creator.</em>
          </h1>
          <div style={{ paddingTop:16 }}>
            <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:21, color:"rgba(255,255,255,0.62)", lineHeight:1.75, marginBottom:28 }}>
              Muse Sketch Studio was not built by a fashion designer. It was built by someone who looked at how the fashion world works — the hand-drawn sketches, the laborious iterations, the gap between imagination and execution — and asked: why hasn't technology solved this properly yet?
            </p>
            <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:21, color:"rgba(255,255,255,0.48)", lineHeight:1.75 }}>
              The answer was that nobody had built it with enough care. So we did.
            </p>
          </div>
        </div>
      </header>

      {/* ORIGIN STORY */}
      <section style={{ padding:"100px 72px", maxWidth:1440, margin:"0 auto", borderBottom:"1px solid rgba(255,255,255,0.055)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:80 }}>
          <div>
            <p style={{ fontSize:10, letterSpacing:6, textTransform:"uppercase", color:ACCENT, marginBottom:20 }}>The Beginning</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:700, lineHeight:1.05 }}>
              A problem<br />worth<br /><em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.3)" }}>solving properly.</em>
            </h2>
          </div>
          <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:20, color:"rgba(255,255,255,0.58)", lineHeight:1.82 }}>
            <p style={{ marginBottom:24 }}>
              Fashion design has always been deeply visual — it lives in sketches, in mood boards, in the quick line a designer draws to capture a silhouette before it disappears. But the tools available to turn those ideas into something shareable, iteratable, and production-ready had barely evolved.
            </p>
            <p style={{ marginBottom:24 }}>
              The software built for fashion was either too complex, too generic, or too expensive. Independent designers were using tools designed for engineers or graphic artists — nothing that understood the specific language of garment design, proportion, and presentation.
            </p>
            <p style={{ marginBottom:24 }}>
              Muse was built to change that. Not from the inside of a fashion atelier, but from the outside — with fresh eyes, engineering rigour, and a deep belief that the best tools come from obsessing over the user's problem, not the industry's conventions.
            </p>
            <p>
              The result is a pipeline that takes a design from AI-generated sketch to colour exploration to runway visualisation — in one place, without friction, without a six-figure software budget.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — 3 PILLARS */}
      <section style={{ padding:"100px 72px", maxWidth:1440, margin:"0 auto", borderBottom:"1px solid rgba(255,255,255,0.055)" }}>
        <div style={{ marginBottom:72 }}>
          <p style={{ fontSize:10, letterSpacing:6, textTransform:"uppercase", color:ACCENT, marginBottom:18 }}>How It Works</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(36px,4.5vw,62px)", fontWeight:700, lineHeight:1.05 }}>
            Three stages.<br /><em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.3)" }}>One complete pipeline.</em>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, background:"rgba(255,255,255,0.045)" }}>
          {PILLARS.map((p, i) => (
            <div key={i} className="pillar-card" style={{ padding:"52px 44px", background:BG }}>
              <div style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginBottom:28 }}>{p.num}</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:28, fontWeight:700, marginBottom:20, color:"#fff", lineHeight:1.1 }}>{p.title}</h3>
              <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:17, color:"rgba(255,255,255,0.52)", lineHeight:1.78 }}>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POSSIBILITIES BAND */}
      <section style={{ padding:"0", background:"rgba(255,255,255,0.02)", borderBottom:"1px solid rgba(255,255,255,0.055)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr" }}>
          <div style={{ padding:"72px 72px", borderRight:"1px solid rgba(255,255,255,0.045)" }}>
            <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:120, fontWeight:700, color:ACCENT, lineHeight:1 }}>∞</div>
            <div style={{ fontSize:10, letterSpacing:5, textTransform:"uppercase", color:"rgba(255,255,255,0.38)", marginTop:16 }}>Possibilities</div>
          </div>
          <div style={{ padding:"72px 72px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:24, fontWeight:300, fontStyle:"italic", color:"rgba(255,255,255,0.55)", lineHeight:1.7, marginBottom:28 }}>
              There are no limits to what you can design. Every silhouette, every fabric, every vision — sketch it, colour it, wear it.
            </p>
            <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase", color:"rgba(255,255,255,0.25)" }}>Founded 2025 · Muse Sketch Studio</div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding:"100px 72px", maxWidth:1440, margin:"0 auto", borderBottom:"1px solid rgba(255,255,255,0.055)" }}>
        <div style={{ marginBottom:72 }}>
          <p style={{ fontSize:10, letterSpacing:6, textTransform:"uppercase", color:ACCENT, marginBottom:18 }}>What We Believe</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(36px,4.5vw,62px)", fontWeight:700, lineHeight:1.05 }}>
            Our <em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.3)" }}>principles</em>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:2, background:"rgba(255,255,255,0.045)" }}>
          {VALUES.map((v, i) => (
            <div key={i} style={{ padding:"52px 48px", background:BG }}>
              <div style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginBottom:20 }}>0{i+1}</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:30, fontWeight:700, marginBottom:18, color:"#fff" }}>{v.title}</h3>
              <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:18, color:"rgba(255,255,255,0.52)", lineHeight:1.78 }}>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOR WHOM */}
      <section style={{ padding:"100px 72px", maxWidth:1440, margin:"0 auto", borderBottom:"1px solid rgba(255,255,255,0.055)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
          <div>
            <p style={{ fontSize:10, letterSpacing:6, textTransform:"uppercase", color:ACCENT, marginBottom:20 }}>Who It's For</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(36px,4.5vw,62px)", fontWeight:700, lineHeight:1.05, marginBottom:36 }}>
              For anyone who<br />creates with<br /><em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.3)" }}>intention.</em>
            </h2>
            <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:19, color:"rgba(255,255,255,0.5)", lineHeight:1.8 }}>
              Muse is not only for trained fashion designers. It is for the independent maker, the student, the brand builder, the stylist, the costume designer, the creative director who thinks in images — anyone who has a visual idea and wants to move it forward faster than pencil and patience alone allows.
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {[
              { label:"Independent Designers", desc:"Move from concept to client-ready visuals without a studio budget." },
              { label:"Fashion Students", desc:"Explore ideas faster. Iterate more. Graduate with a portfolio that looks professional." },
              { label:"Brand Builders", desc:"Translate a brand aesthetic into specific, reviewable garment concepts." },
              { label:"Creative Directors", desc:"Brief your team with visuals, not just words. Make the abstract concrete." },
            ].map((item, i) => (
              <div key={i} style={{ padding:"28px 32px", background:"rgba(255,255,255,0.025)", borderLeft:`2px solid ${ACCENT}44` }}>
                <div style={{ fontSize:11, letterSpacing:2, textTransform:"uppercase", color:"rgba(255,255,255,0.7)", marginBottom:8, fontWeight:600 }}>{item.label}</div>
                <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:17, color:"rgba(255,255,255,0.45)", lineHeight:1.65 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION QUOTE */}
      <section style={{ padding:"100px 72px", position:"relative", overflow:"hidden" }}>
        {/* Needle + thread — bottom left */}
        <div style={{ position:"absolute", bottom:24, left:48, opacity:0.15, pointerEvents:"none", transform:"rotate(15deg)" }}>
          <NeedleThread color="white" accent={ACCENT} />
        </div>
        {/* Needle + thread — top right, mirrored */}
        <div style={{ position:"absolute", top:24, right:48, opacity:0.12, pointerEvents:"none", transform:"rotate(195deg)" }}>
          <NeedleThread color="white" accent={ACCENT} />
        </div>
        <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
          <p style={{ fontSize:10, letterSpacing:6, textTransform:"uppercase", color:ACCENT, marginBottom:28 }}>Our Mission</p>
          <blockquote style={{
            fontFamily:"'Cormorant Garamond', serif",
            fontSize:"clamp(24px,3.5vw,44px)",
            fontStyle:"italic", fontWeight:300,
            color:"rgba(255,255,255,0.8)", lineHeight:1.5,
            marginBottom:56,
          }}>
            "To give every creator access to a complete design pipeline — from first sketch to final vision — without the gatekeeping of expensive software, specialised training, or studio backing."
          </blockquote>
          <div style={{ fontSize:12, letterSpacing:2, textTransform:"uppercase", color:"rgba(255,255,255,0.35)" }}>Muse Sketch Studio — Founded 2025</div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"100px 72px", borderTop:"1px solid rgba(255,255,255,0.055)", textAlign:"center" }}>
        <p style={{ fontSize:10, letterSpacing:6, textTransform:"uppercase", color:ACCENT, marginBottom:24 }}>Get Started</p>
        <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(40px,6vw,80px)", fontWeight:700, lineHeight:0.94, marginBottom:44 }}>
          Your next design<br /><em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.28)" }}>starts here</em>
        </h2>
        <div style={{ display:"flex", gap:16, justifyContent:"center" }}>
          <Link to="/design" style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"18px 52px", background:"rgba(255,255,255,0.95)", color:"#0a0a0a", fontSize:11, letterSpacing:3, textTransform:"uppercase", fontWeight:700, textDecoration:"none" }}>
            Start Free Trial <ArrowRight size={13} />
          </Link>
          <Link to="/gallery" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"17px 44px", background:"transparent", color:"rgba(255,255,255,0.65)", fontSize:11, letterSpacing:3, textTransform:"uppercase", fontWeight:500, textDecoration:"none", border:"1px solid rgba(255,255,255,0.18)" }}>
            View Gallery
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:"32px 72px", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span className="logo-a" style={{ fontSize:13, fontWeight:700, letterSpacing:3 }}>MUSE SKETCH STUDIO</span>
        <div style={{ display:"flex", gap:24 }}>
          {[["Home","/home"],["Gallery","/gallery"],["Blog","/blog"],["Portfolio","/portfolio"]].map(([l,to])=>(
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
