import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Scissors } from "lucide-react";
import { BLOG_POSTS } from "./BlogPage";

const ACCENT = "#C084FC";
const BG     = "#0D0819";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);
  const currentIdx = BLOG_POSTS.findIndex(p => p.slug === slug);
  const prev = currentIdx > 0 ? BLOG_POSTS[currentIdx - 1] : null;
  const next = currentIdx < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIdx + 1] : null;

  if (!post) {
    return (
      <div style={{ minHeight:"100vh", background:BG, color:"#fff", fontFamily:"'Syne',sans-serif", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:24 }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:80, fontWeight:700, color:"rgba(255,255,255,0.08)" }}>404</div>
        <p style={{ color:"rgba(255,255,255,0.5)", letterSpacing:3, textTransform:"uppercase", fontSize:12 }}>Essay not found</p>
        <Link to="/blog" style={{ color:ACCENT, textDecoration:"none", fontSize:11, letterSpacing:3, textTransform:"uppercase" }}>← Back to Journal</Link>
      </div>
    );
  }

  // Parse body into paragraphs / headings
  const paragraphs = post.body.split("\n\n").map(block => block.trim()).filter(Boolean);

  return (
    <div style={{ minHeight:"100vh", background:BG, color:"#fff", fontFamily:"'Syne',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=Syne:wght@400;500;600;700;800&display=swap');
        @keyframes shimLogo { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .logo-bp { background: linear-gradient(90deg,#C084FC,#F9A8D4,#FCD34D,#C084FC); background-size:200% 100%; -webkit-background-clip:text; -webkit-text-fill-color:transparent; animation: shimLogo 4s linear infinite; }
        .body-text { font-family:'Cormorant Garamond',serif; font-size:20px; color:rgba(255,255,255,0.72); line-height:1.85; }
        .body-heading { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:700; color:#fff; margin:52px 0 20px; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.09); border-radius:3px; }
      `}</style>

      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, padding:"22px 56px", display:"flex", alignItems:"center", justifyContent:"space-between", background:`${BG}EA`, backdropFilter:"blur(22px)", borderBottom:"1px solid rgba(255,255,255,0.045)" }}>
        <Link to="/home" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:"50%", border:`1px solid ${ACCENT}42`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Scissors size={15} style={{ color:ACCENT }} strokeWidth={1.4} />
          </div>
          <span className="logo-bp" style={{ fontSize:13, fontWeight:700, letterSpacing:3 }}>MUSE SKETCH STUDIO</span>
        </Link>
        <div style={{ display:"flex", gap:40, alignItems:"center" }}>
          <Link to="/blog" style={{ color:"rgba(255,255,255,0.5)", textDecoration:"none", fontSize:11, letterSpacing:2, textTransform:"uppercase", display:"flex", alignItems:"center", gap:8 }}>
            <ArrowLeft size={13} /> The Journal
          </Link>
          <Link to="/design" style={{ padding:"9px 26px", background:"rgba(255,255,255,0.95)", color:"#0a0a0a", fontSize:10, letterSpacing:2, textTransform:"uppercase", fontWeight:700, textDecoration:"none" }}>
            Start Free Trial
          </Link>
        </div>
      </nav>

      {/* ARTICLE HERO */}
      <header style={{ borderBottom:"1px solid rgba(255,255,255,0.055)" }}>
        <div style={{ maxWidth:900, margin:"0 auto", padding:"80px 72px 72px" }}>
          <div style={{ display:"flex", gap:16, marginBottom:32, alignItems:"center" }}>
            <span style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase", color:post.accent, fontWeight:600 }}>{post.category}</span>
            <span style={{ fontSize:9, color:"rgba(255,255,255,0.3)" }}>—</span>
            <span style={{ fontSize:9, letterSpacing:2, textTransform:"uppercase", color:"rgba(255,255,255,0.35)" }}>{post.date}</span>
            <span style={{ fontSize:9, letterSpacing:2, textTransform:"uppercase", color:"rgba(255,255,255,0.3)" }}>{post.readTime}</span>
          </div>

          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(36px,5.5vw,68px)", fontWeight:700, lineHeight:1.05, marginBottom:32 }}>
            {post.title}
          </h1>

          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontStyle:"italic", color:"rgba(255,255,255,0.52)", lineHeight:1.72 }}>
            {post.excerpt}
          </p>
        </div>

        {/* Accent visual divider */}
        <div style={{ height:3, background:`linear-gradient(90deg, transparent, ${post.accent}, transparent)`, opacity:0.5 }} />
      </header>

      {/* ARTICLE BODY */}
      <article style={{ maxWidth:740, margin:"0 auto", padding:"72px 72px 100px" }}>
        {paragraphs.map((para, i) => {
          if (para.startsWith("**") && para.endsWith("**")) {
            return (
              <h2 key={i} className="body-heading">
                {para.slice(2, -2)}
              </h2>
            );
          }
          return (
            <p key={i} className="body-text" style={{ marginBottom:28 }}>
              {para}
            </p>
          );
        })}
      </article>

      {/* ARTICLE FOOTER DIVIDER */}
      <div style={{ height:1, background:"rgba(255,255,255,0.055)", maxWidth:1440, margin:"0 auto" }} />

      {/* PREV / NEXT */}
      <section style={{ padding:"72px", maxWidth:1440, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, background:"rgba(255,255,255,0.025)" }}>
        {prev ? (
          <Link to={`/blog/${prev.slug}`} style={{ textDecoration:"none", padding:"40px 44px", background:"rgba(255,255,255,0.02)", display:"block", transition:"background 0.3s" }}
            onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.05)")}
            onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,255,255,0.02)")}
          >
            <div style={{ display:"flex", alignItems:"center", gap:10, fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginBottom:20 }}>
              <ArrowLeft size={12} /> Previous Essay
            </div>
            <div style={{ fontSize:9, letterSpacing:2, textTransform:"uppercase", color:prev.accent, marginBottom:12 }}>{prev.category}</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:"#fff", lineHeight:1.2 }}>{prev.title}</div>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/blog/${next.slug}`} style={{ textDecoration:"none", padding:"40px 44px", background:"rgba(255,255,255,0.02)", textAlign:"right", display:"block", transition:"background 0.3s" }}
            onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.05)")}
            onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,255,255,0.02)")}
          >
            <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-end", gap:10, fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginBottom:20 }}>
              Next Essay <ArrowRight size={12} />
            </div>
            <div style={{ fontSize:9, letterSpacing:2, textTransform:"uppercase", color:next.accent, marginBottom:12 }}>{next.category}</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:"#fff", lineHeight:1.2 }}>{next.title}</div>
          </Link>
        ) : <div />}
      </section>

      {/* CTA */}
      <section style={{ padding:"100px 72px", textAlign:"center", borderTop:"1px solid rgba(255,255,255,0.045)" }}>
        <p style={{ fontSize:10, letterSpacing:6, textTransform:"uppercase", color:ACCENT, marginBottom:20 }}>Ready to Begin?</p>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(36px,5vw,72px)", fontWeight:700, lineHeight:0.95, marginBottom:44 }}>
          Design without<br /><em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.28)" }}>limits</em>
        </h2>
        <Link to="/design" style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"18px 52px", background:"rgba(255,255,255,0.95)", color:"#0a0a0a", fontSize:11, letterSpacing:3, textTransform:"uppercase", fontWeight:700, textDecoration:"none" }}>
          Start Free Trial <ArrowRight size={13} />
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:"32px 72px", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span className="logo-bp" style={{ fontSize:13, fontWeight:700, letterSpacing:3 }}>MUSE SKETCH STUDIO</span>
        <div style={{ display:"flex", gap:24 }}>
          {[["Home","/home"],["Gallery","/gallery"],["Blog","/blog"],["About","/about"]].map(([l,to])=>(
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
