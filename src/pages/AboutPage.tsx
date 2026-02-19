import { Link } from "react-router-dom";
import { ArrowRight, Scissors } from "lucide-react";

const ACCENT = "#C084FC";
const BG     = "#0D0819";

const TEAM = [
  { name:"Isabelle Moreau", role:"Co-Founder & Creative Director", location:"Paris", bio:"Former head of design at two Parisian couture houses, Isabelle brings 20 years of atelier experience to Muse. She ensures that every feature we build respects the integrity of the design process." },
  { name:"Arjun Mehta", role:"Co-Founder & CEO", location:"London", bio:"Oxford-trained engineer turned fashion technologist. Arjun saw the gap between creative ambition and digital tooling in fashion and spent three years building the first version of Muse in his flat in Hackney." },
  { name:"Yuki Tanaka", role:"Head of AI Research", location:"Tokyo", bio:"PhD in computational design from the University of Tokyo. Yuki leads the development of Muse's fashion-specific AI — the system that understands garment construction, proportion and aesthetic language." },
  { name:"Sofia Benedetti", role:"Head of Designer Experience", location:"Milan", bio:"Ex-designer at three Italian fashion houses, Sofia bridges the gap between engineering and creative practice. She ensures that Muse speaks fluent fashion — in every language." },
  { name:"Marcus Webb", role:"Head of Product", location:"New York", bio:"Former product lead at two design software companies. Marcus shapes the roadmap, balancing the needs of independent designers and professional studios." },
  { name:"Amara Osei", role:"Community & Partnerships", location:"Accra / London", bio:"Passionate about expanding the geography of fashion, Amara builds relationships with design schools, independent designers, and fashion organisations across Africa, Asia and Latin America." },
];

const VALUES = [
  { title:"Craft First", text:"Every feature we build must serve the craft of design, not replace it. Technology is an instrument, not a substitute for creative intelligence." },
  { title:"No Gatekeeping", text:"Professional-quality tools should be accessible to every designer with talent and vision, regardless of geography, funding, or institutional backing." },
  { title:"Honesty Over Hype", text:"We do not promise what we cannot deliver. Fashion is an industry full of beautiful language — we hold ourselves to the same standard of precision." },
  { title:"Long-term Thinking", text:"We build for the designer who will be using Muse in ten years, not the demo that impressed at launch. Durability and depth over novelty." },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight:"100vh", background:BG, color:"#fff", fontFamily:"'Syne', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=Syne:wght@400;500;600;700;800&display=swap');
        @keyframes shimLogo { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .logo-a { background: linear-gradient(90deg,#C084FC,#F9A8D4,#FCD34D,#C084FC); background-size:200% 100%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation: shimLogo 4s linear infinite; }
        .team-card { transition: transform 0.3s, background 0.3s; }
        .team-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.055) !important; }
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

      {/* MANIFESTO HERO */}
      <header style={{ padding:"110px 72px 96px", maxWidth:1440, margin:"0 auto", borderBottom:"1px solid rgba(255,255,255,0.055)" }}>
        <p style={{ fontSize:10, letterSpacing:7, textTransform:"uppercase", color:ACCENT, marginBottom:28 }}>Our Story</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" }}>
          <h1 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(52px,7vw,96px)", fontWeight:700, lineHeight:0.9 }}>
            Built for<br />designers,<br /><em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.28)" }}>by designers.</em>
          </h1>
          <div style={{ paddingTop:16 }}>
            <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:21, color:"rgba(255,255,255,0.62)", lineHeight:1.75, marginBottom:28 }}>
              Muse Sketch Studio was founded in 2023 by a fashion designer and a software engineer who shared a single frustration: the tools available to designers were either impossibly complex or frustratingly generic.
            </p>
            <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:21, color:"rgba(255,255,255,0.48)", lineHeight:1.75 }}>
              The industry deserved software as sophisticated as the craft it serves. We set out to build it — and to make it available to every designer in the world, not just those with studio backing.
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
              2023.<br />London.<br /><em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.3)" }}>A shared obsession.</em>
            </h2>
          </div>
          <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:20, color:"rgba(255,255,255,0.58)", lineHeight:1.82 }}>
            <p style={{ marginBottom:24 }}>
              Isabelle had spent twenty years in Paris ateliers watching designers spend more time fighting their tools than designing. The CAD systems were built for engineers. The illustration software was built for graphic designers. Nothing was built for someone who understood seam allowance, bias cut, and the way duchess satin responds to a French seam.
            </p>
            <p style={{ marginBottom:24 }}>
              Arjun had spent five years building software for industries he found interesting but not compelling. Then he met Isabelle at a workshop in London, and she described a problem that didn't have a good solution yet. He was on a flight to Paris the following week.
            </p>
            <p style={{ marginBottom:24 }}>
              The first version of Muse was built in six months. It was rough, opinionated, and immediately useful to the twelve designers who tried it. Those designers told other designers. Within a year, Muse had 2,000 users in 34 countries.
            </p>
            <p>
              We are now a team of forty-two people across seven cities. The problem we set out to solve has not changed: designers deserve tools as beautiful and intelligent as the work they produce.
            </p>
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section style={{ padding:"80px 72px", background:"rgba(255,255,255,0.02)", borderBottom:"1px solid rgba(255,255,255,0.055)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:2, background:"rgba(255,255,255,0.045)" }}>
          {[
            { n:"10,000+", label:"Active Designers" },
            { n:"180+",    label:"Countries" },
            { n:"50,000+", label:"Designs Created Monthly" },
            { n:"2023",    label:"Founded" },
          ].map(({ n, label }) => (
            <div key={label} style={{ padding:"52px 40px", background:BG }}>
              <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:56, fontWeight:700, color:ACCENT, lineHeight:1, marginBottom:12 }}>{n}</div>
              <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase", color:"rgba(255,255,255,0.38)" }}>{label}</div>
            </div>
          ))}
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

      {/* TEAM */}
      <section style={{ padding:"100px 72px", maxWidth:1440, margin:"0 auto", borderBottom:"1px solid rgba(255,255,255,0.055)" }}>
        <div style={{ marginBottom:72 }}>
          <p style={{ fontSize:10, letterSpacing:6, textTransform:"uppercase", color:ACCENT, marginBottom:18 }}>The People</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(36px,4.5vw,62px)", fontWeight:700, lineHeight:1.05 }}>
            Who we <em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.3)" }}>are</em>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, background:"rgba(255,255,255,0.045)" }}>
          {TEAM.map((member, i) => (
            <div key={i} className="team-card" style={{ padding:"44px 40px", background:BG }}>
              {/* Avatar placeholder */}
              <div style={{
                width:72, height:72, borderRadius:"50%", marginBottom:28,
                background:`linear-gradient(135deg, ${ACCENT}33, ${ACCENT}11)`,
                border:`1px solid ${ACCENT}33`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:ACCENT,
              }}>
                {member.name.split(" ").map(n=>n[0]).join("")}
              </div>
              <div style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase", color:ACCENT, marginBottom:8, fontWeight:600 }}>{member.location}</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:22, fontWeight:700, marginBottom:6, color:"#fff" }}>{member.name}</h3>
              <div style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase", color:"rgba(255,255,255,0.38)", marginBottom:20 }}>{member.role}</div>
              <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:16, color:"rgba(255,255,255,0.48)", lineHeight:1.75 }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section style={{ padding:"100px 72px", position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
          <p style={{ fontSize:10, letterSpacing:6, textTransform:"uppercase", color:ACCENT, marginBottom:28 }}>Our Mission</p>
          <blockquote style={{
            fontFamily:"'Cormorant Garamond', serif",
            fontSize:"clamp(24px,3.5vw,44px)",
            fontStyle:"italic", fontWeight:300,
            color:"rgba(255,255,255,0.8)", lineHeight:1.5,
            marginBottom:56,
          }}>
            "To give every designer in the world access to tools as powerful and beautiful as their vision — because the future of fashion should not be determined by geography or resources, but by talent and imagination."
          </blockquote>
          <div style={{ fontSize:12, letterSpacing:2, textTransform:"uppercase", color:"rgba(255,255,255,0.35)" }}>Isabelle Moreau & Arjun Mehta, Co-Founders</div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"100px 72px", borderTop:"1px solid rgba(255,255,255,0.055)", textAlign:"center" }}>
        <p style={{ fontSize:10, letterSpacing:6, textTransform:"uppercase", color:ACCENT, marginBottom:24 }}>Join Us</p>
        <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(40px,6vw,80px)", fontWeight:700, lineHeight:0.94, marginBottom:44 }}>
          Be part of<br /><em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.28)" }}>what's next</em>
        </h2>
        <div style={{ display:"flex", gap:16, justifyContent:"center" }}>
          <Link to="/design" style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"18px 52px", background:"rgba(255,255,255,0.95)", color:"#0a0a0a", fontSize:11, letterSpacing:3, textTransform:"uppercase", fontWeight:700, textDecoration:"none" }}>
            Start Free Trial <ArrowRight size={13} />
          </Link>
          <Link to="/blog" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"17px 44px", background:"transparent", color:"rgba(255,255,255,0.65)", fontSize:11, letterSpacing:3, textTransform:"uppercase", fontWeight:500, textDecoration:"none", border:"1px solid rgba(255,255,255,0.18)" }}>
            Read Our Journal
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
