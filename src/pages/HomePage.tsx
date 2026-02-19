import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Scissors } from "lucide-react";

// ─── 5 Sophisticated Editorial Themes ────────────────────────────────────────
const THEMES = [
  { bg: "#0D0819", mid: "#160D28", accent: "#C084FC", silk: "#F5EDE0", name: "Violet Nocturne" },
  { bg: "#160710", mid: "#270D1E", accent: "#F9A8D4", silk: "#FDF0F5", name: "Rose Noir"       },
  { bg: "#070D1C", mid: "#0C1630", accent: "#93C5FD", silk: "#EDF3FB", name: "Sapphire Dusk"   },
  { bg: "#130C00", mid: "#221500", accent: "#FCD34D", silk: "#FDF6E3", name: "Amber Reverie"   },
  { bg: "#080E0D", mid: "#0C1A18", accent: "#6EE7B7", silk: "#EDF7F4", name: "Jade Atelier"    },
];

const TSS = { style: { transition: "fill 1.8s ease, stroke 1.8s ease" } };

// ── ROSE: 3-layer bezier petal rose ─────────────────────────────────────────
function Rose({ cx, cy, r, accent, op = 1 }: { cx: number; cy: number; r: number; accent: string; op?: number }) {
  const op8  = [0,45,90,135,180,225,270,315];
  const op6  = [22,82,142,202,262,322];
  const ip4  = [0,90,180,270];
  const o = `M 0 0 C ${-0.52*r} ${-0.3*r} ${-0.56*r} ${-0.95*r} ${-0.1*r} ${-1.15*r} C ${-0.04*r} ${-1.25*r} ${0.04*r} ${-1.25*r} ${0.1*r} ${-1.15*r} C ${0.56*r} ${-0.95*r} ${0.52*r} ${-0.3*r} 0 0 Z`;
  const m = `M 0 0 C ${-0.42*r} ${-0.25*r} ${-0.46*r} ${-0.75*r} 0 ${-0.87*r} C ${0.46*r} ${-0.75*r} ${0.42*r} ${-0.25*r} 0 0 Z`;
  const inn = `M 0 0 C ${-0.28*r} ${-0.2*r} ${-0.32*r} ${-0.52*r} 0 ${-0.60*r} C ${0.32*r} ${-0.52*r} ${0.28*r} ${-0.2*r} 0 0 Z`;
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {op8.map((a, i) => (
        <path key={`o${i}`} d={o} fill={accent} fillOpacity={0.16 * op} stroke={accent} strokeWidth={0.55} strokeOpacity={0.72 * op} transform={`rotate(${a})`} {...TSS} />
      ))}
      {op6.map((a, i) => (
        <path key={`m${i}`} d={m} fill={accent} fillOpacity={0.28 * op} stroke={accent} strokeWidth={0.5} strokeOpacity={0.68 * op} transform={`rotate(${a})`} {...TSS} />
      ))}
      {ip4.map((a, i) => (
        <path key={`i${i}`} d={inn} fill={accent} fillOpacity={0.48 * op} stroke={accent} strokeWidth={0.45} strokeOpacity={0.62 * op} transform={`rotate(${a})`} {...TSS} />
      ))}
      <circle r={0.26 * r} fill={accent} fillOpacity={0.88 * op} {...TSS} />
      {[0,51,102,153,204,255,306].map((a, i) => (
        <circle key={`st${i}`} cx={0.2*r*Math.cos(a*Math.PI/180)} cy={0.2*r*Math.sin(a*Math.PI/180)} r={0.07*r} fill={accent} fillOpacity={0.9*op} {...TSS} />
      ))}
    </g>
  );
}

// ── LEAF: almond-shaped leaf with center vein ─────────────────────────────────
function Leaf({ x1, y1, x2, y2, accent, op = 0.6 }: { x1: number; y1: number; x2: number; y2: number; accent: string; op?: number }) {
  const mx = (x1+x2)/2, my = (y1+y2)/2;
  const dx = x2-x1, dy = y2-y1;
  const len = Math.sqrt(dx*dx+dy*dy) || 1;
  const nx = -dy/len * len * 0.28, ny = dx/len * len * 0.28;
  return (
    <g>
      <path d={`M ${x1} ${y1} Q ${mx+nx} ${my+ny} ${x2} ${y2} Q ${mx-nx} ${my-ny} ${x1} ${y1} Z`}
        fill={accent} fillOpacity={op * 0.26} stroke={accent} strokeWidth={0.5} strokeOpacity={op * 0.78} {...TSS} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeWidth={0.32} strokeOpacity={op * 0.55} {...TSS} />
    </g>
  );
}

// ── MINI5: tiny 5-petal daisy ────────────────────────────────────────────────
function Mini5({ cx, cy, r, accent }: { cx: number; cy: number; r: number; accent: string }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {[0,72,144,216,288].map((a, i) => (
        <ellipse key={i} cx={0} cy={-r*0.9} rx={r*0.36} ry={r*0.52}
          fill={accent} fillOpacity={0.32} stroke={accent} strokeWidth={0.38} strokeOpacity={0.68}
          transform={`rotate(${a})`} {...TSS} />
      ))}
      <circle r={r*0.28} fill={accent} fillOpacity={0.9} {...TSS} />
    </g>
  );
}

// ── BUD: elegant closed rosebud ───────────────────────────────────────────────
function Bud({ cx, cy, r, accent }: { cx: number; cy: number; r: number; accent: string }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <path d={`M 0 0 C ${-r*0.52} ${-r*0.3} ${-r*0.42} ${-r*0.78} 0 ${-r*0.9} C ${r*0.42} ${-r*0.78} ${r*0.52} ${-r*0.3} 0 0 Z`}
        fill={accent} fillOpacity={0.22} stroke={accent} strokeWidth={0.45} strokeOpacity={0.65} {...TSS} />
      <path d={`M ${-r*0.18} ${-r*0.14} C ${-r*0.3} ${-r*0.5} ${-r*0.18} ${-r*0.85} 0 ${-r*0.88} C ${r*0.18} ${-r*0.85} ${r*0.3} ${-r*0.5} ${r*0.18} ${-r*0.14} Z`}
        fill={accent} fillOpacity={0.46} stroke={accent} strokeWidth={0.4} strokeOpacity={0.6} {...TSS} />
      <circle cy={-r*0.88} r={r*0.15} fill={accent} fillOpacity={0.72} {...TSS} />
    </g>
  );
}

// ── WISTERIA CLUSTER: drooping floral panicle ────────────────────────────────
function WisteriaCluster({ x, y, accent, flip = false }: { x: number; y: number; accent: string; flip?: boolean }) {
  const f: [number, number, number][] = [
    [-8,0,3.2],[-4,2,3.1],[0,1,3.1],[4,2,3.0],[8,0,2.9],
    [-6,9,2.8],[-2,10,2.8],[2,10,2.7],[6,9,2.7],
    [-4,18,2.5],[0,19,2.5],[4,18,2.4],
    [-2,27,2.2],[2,28,2.1],
    [0,36,1.8],
  ];
  const s = flip ? -1 : 1;
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y+38} stroke={accent} strokeWidth={0.45} strokeOpacity={0.48} {...TSS} />
      {f.map(([dx, dy, rr], i) => (
        <ellipse key={i} cx={x + dx*s} cy={y + dy} rx={rr} ry={rr*1.55}
          fill={accent} fillOpacity={Math.max(0.1, 0.42 - i*0.016)}
          stroke={accent} strokeWidth={0.35} strokeOpacity={0.64} {...TSS} />
      ))}
    </g>
  );
}

// ── BUTTERFLY: art-deco hidden motif ─────────────────────────────────────────
function Butterfly({ cx, cy, accent }: { cx: number; cy: number; accent: string }) {
  return (
    <g transform={`translate(${cx} ${cy})`} opacity={0.62}>
      <path d="M 0 0 C -12 -5 -22 -3 -20 9 C -18 17 -8 14 0 0 Z" fill={accent} fillOpacity={0.2} stroke={accent} strokeWidth={0.48} {...TSS} />
      <path d="M 0 0 C 12 -5 22 -3 20 9 C 18 17 8 14 0 0 Z"  fill={accent} fillOpacity={0.2} stroke={accent} strokeWidth={0.48} {...TSS} />
      <path d="M 0 2 C -10 4 -16 11 -12 18 C -8 23 -3 18 0 2 Z" fill={accent} fillOpacity={0.27} stroke={accent} strokeWidth={0.42} {...TSS} />
      <path d="M 0 2 C 10 4 16 11 12 18 C 8 23 3 18 0 2 Z"  fill={accent} fillOpacity={0.27} stroke={accent} strokeWidth={0.42} {...TSS} />
      <path d="M 0 0 C -6 -2 -14 1 -16 7" fill="none" stroke={accent} strokeWidth={0.32} strokeOpacity={0.55} {...TSS} />
      <path d="M 0 0 C -4 2 -10 7 -10 13" fill="none" stroke={accent} strokeWidth={0.28} strokeOpacity={0.45} {...TSS} />
      <path d="M 0 0 C 6 -2 14 1 16 7"  fill="none" stroke={accent} strokeWidth={0.32} strokeOpacity={0.55} {...TSS} />
      <path d="M 0 0 C 4 2 10 7 10 13"  fill="none" stroke={accent} strokeWidth={0.28} strokeOpacity={0.45} {...TSS} />
      <circle cx={-12} cy={5} r={2.4} fill="none" stroke={accent} strokeWidth={0.38} strokeOpacity={0.52} {...TSS} />
      <circle cx={-12} cy={5} r={0.9} fill={accent} fillOpacity={0.6} {...TSS} />
      <circle cx={12}  cy={5} r={2.4} fill="none" stroke={accent} strokeWidth={0.38} strokeOpacity={0.52} {...TSS} />
      <circle cx={12}  cy={5} r={0.9} fill={accent} fillOpacity={0.6} {...TSS} />
      <ellipse cy={6} rx={1.1} ry={7} fill={accent} fillOpacity={0.68} {...TSS} />
      <path d="M -1 -1 C -4 -9 -8 -13 -9 -16" fill="none" stroke={accent} strokeWidth={0.38} strokeOpacity={0.58} {...TSS} />
      <circle cx={-9} cy={-16} r={0.9} fill={accent} fillOpacity={0.7} {...TSS} />
      <path d="M 1 -1 C 4 -9 8 -13 9 -16"  fill="none" stroke={accent} strokeWidth={0.38} strokeOpacity={0.58} {...TSS} />
      <circle cx={9}  cy={-16} r={0.9} fill={accent} fillOpacity={0.7} {...TSS} />
    </g>
  );
}

// ── PEACOCK FEATHER EYE — iridescent couture motif ────────────────────────────
function PeacockEye({ cx, cy, accent, scale = 1, op = 1 }: {
  cx: number; cy: number; accent: string; scale?: number; op?: number
}) {
  const w = 14 * scale, h = 19 * scale;
  const barbs = Array.from({ length: 11 }, (_, i) => {
    const t   = i / 10;
    const y   = h * 0.44 * (1 - t) + (-h * 0.9) * t;
    const xs  = w * 0.5 + w * 0.82 * Math.sin(t * Math.PI);
    const opc = Math.max(0.06, 0.18 - t * 0.065);
    return { i, y, xs, opc };
  });
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {/* Quill */}
      <line x1={0} y1={h * 0.55} x2={0} y2={h * 0.55 + 46 * scale}
        stroke={accent} strokeWidth={0.5 * scale} strokeOpacity={0.42} strokeLinecap="round" {...TSS} />
      {/* Barbule pairs radiating from shaft */}
      {barbs.map(({ i, y, xs, opc }) => (
        <g key={i}>
          <path d={`M 0 ${y} Q ${-xs * 0.5} ${y - 3*scale} ${-xs} ${y - 1*scale}`}
            fill="none" stroke={accent} strokeWidth={0.23 * scale} strokeOpacity={opc} strokeLinecap="round" {...TSS} />
          <path d={`M 0 ${y} Q ${xs * 0.5} ${y - 3*scale} ${xs} ${y - 1*scale}`}
            fill="none" stroke={accent} strokeWidth={0.23 * scale} strokeOpacity={opc} strokeLinecap="round" {...TSS} />
        </g>
      ))}
      {/* Concentric iridescent eye rings */}
      <ellipse rx={w * 0.5} ry={h * 0.5} fill="none" stroke={accent} strokeWidth={0.33 * scale} strokeOpacity={0.18 * op} {...TSS} />
      <ellipse rx={w * 0.35} ry={h * 0.35} fill={accent} fillOpacity={0.06 * op} stroke={accent} strokeWidth={0.37 * scale} strokeOpacity={0.27 * op} {...TSS} />
      <ellipse rx={w * 0.21} ry={h * 0.21} fill={accent} fillOpacity={0.11 * op} stroke={accent} strokeWidth={0.43 * scale} strokeOpacity={0.41 * op} {...TSS} />
      <ellipse rx={w * 0.11} ry={h * 0.11} fill={accent} fillOpacity={0.31 * op} stroke={accent} strokeWidth={0.49 * scale} strokeOpacity={0.58 * op} {...TSS} />
      <circle r={w * 0.054} fill={accent} fillOpacity={0.88 * op} {...TSS} />
    </g>
  );
}

// ── EMBROIDERY: the full haute couture layout ────────────────────────────────
function Embroidery({ accent }: { accent: string }) {
  const vine = (d: string, op = 0.44, sw = 0.5) => (
    <path d={d} fill="none" stroke={accent} strokeWidth={sw} strokeOpacity={op} strokeLinecap="round" {...TSS} />
  );
  const bead = (cx: number, cy: number, r = 1.2, op = 0.65, key?: string) => (
    <circle key={key} cx={cx} cy={cy} r={r} fill={accent} fillOpacity={op} {...TSS} />
  );

  return (
    <g>
      {/* ═══ BODICE CENTRAL MEDALLION (8-fold Mughal-inspired) ═══ */}
      {/* 8 outer mandala petals */}
      {[0,45,90,135,180,225,270,315].map((a, i) => (
        <path key={`mp${i}`}
          d={`M 160 100 C ${160-5} ${100-7} ${160-5} ${100-25} ${160} ${100-28} C ${160+5} ${100-25} ${160+5} ${100-7} 160 100 Z`}
          fill={accent} fillOpacity={0.2} stroke={accent} strokeWidth={0.65} strokeOpacity={0.76}
          transform={`rotate(${a}, 160, 100)`} {...TSS} />
      ))}
      {/* 8 small leaves between petals */}
      {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map((a, i) => (
        <path key={`ml${i}`}
          d={`M 160 100 C ${160-2.5} ${100-5} ${160-2} ${100-17} ${160} ${100-20} C ${160+2} ${100-17} ${160+2.5} ${100-5} 160 100 Z`}
          fill={accent} fillOpacity={0.38} stroke={accent} strokeWidth={0.38} strokeOpacity={0.6}
          transform={`rotate(${a}, 160, 100)`} {...TSS} />
      ))}
      {/* Diamond dot ring at r=12 */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) =>
        bead(160 + 12*Math.cos(a*Math.PI/180), 100 + 12*Math.sin(a*Math.PI/180), 0.9, 0.72, `bd${i}`)
      )}
      {/* Outer ring of mini beads at r=16 */}
      {[0,45,90,135,180,225,270,315].map((a, i) =>
        bead(160 + 16*Math.cos(a*Math.PI/180), 100 + 16*Math.sin(a*Math.PI/180), 0.7, 0.55, `br${i}`)
      )}
      {/* Center rose */}
      <Rose cx={160} cy={100} r={8} accent={accent} />

      {/* ═══ CHANDELIER PENDANT — 5 beaded chains draping from medallion ═══ */}
      {([[-13, 14], [-6.5, 20], [0, 24], [6.5, 20], [13, 14]] as [number, number][]).map(([dx, len], i) => {
        const ex = 160 + dx * 0.18, ey = 118 + len;
        return (
          <g key={`ch${i}`}>
            <path d={`M ${160 + dx} 118 Q ${160 + dx * 0.52} ${118 + len * 0.5} ${ex} ${ey}`}
              fill="none" stroke={accent} strokeWidth={0.32} strokeOpacity={0.48} {...TSS} />
            <circle cx={160 + dx * 0.74} cy={118 + len * 0.35} r={0.88} fill={accent} fillOpacity={0.62} {...TSS} />
            {/* Teardrop crystal at chain tip */}
            <path d={`M ${ex} ${ey + 0.5} C ${ex - 2.2} ${ey + 0.5} ${ex - 2.2} ${ey + 5.8} ${ex} ${ey + 7.4} C ${ex + 2.2} ${ey + 5.8} ${ex + 2.2} ${ey + 0.5} ${ex} ${ey + 0.5} Z`}
              fill={accent} fillOpacity={0.23} stroke={accent} strokeWidth={0.36} strokeOpacity={0.62} {...TSS} />
            <circle cx={ex} cy={ey + 3.8} r={0.72} fill={accent} fillOpacity={0.78} {...TSS} />
          </g>
        );
      })}
      {/* Horizontal festoon bar connecting chain tips */}
      {vine(`M ${160 - 13 * 0.18} ${132} Q ${160} ${134} ${160 + 13 * 0.18} ${132}`, 0.34, 0.42)}

      {/* ═══ NECKLINE VINES & BEADING ═══ */}
      {vine("M 160 82 C 148 70 132 60 114 52 C 102 46 90 40 86 35", 0.56, 0.55)}
      {vine("M 160 82 C 172 70 188 60 206 52 C 218 46 230 40 234 35", 0.56, 0.55)}
      {/* Neckline leaves */}
      <Leaf x1={130} y1={58} x2={122} y2={50} accent={accent} op={0.55} />
      <Leaf x1={110} y1={48} x2={102} y2={40} accent={accent} op={0.5} />
      <Leaf x1={190} y1={58} x2={198} y2={50} accent={accent} op={0.55} />
      <Leaf x1={210} y1={48} x2={218} y2={40} accent={accent} op={0.5} />
      {/* Neckline beads — left */}
      {[[128,56],[115,48],[104,41],[93,36]].map(([x,y],i) => bead(x, y, 1.3, 0.64-i*0.04, `nl${i}`))}
      {/* Neckline beads — right */}
      {[[192,56],[205,48],[216,41],[227,36]].map(([x,y],i) => bead(x, y, 1.3, 0.64-i*0.04, `nr${i}`))}
      {/* Neckline end buds */}
      <Bud cx={91} cy={34} r={5.5} accent={accent} />
      <Bud cx={229} cy={34} r={5.5} accent={accent} />

      {/* ═══ BODICE SIDE SPRIGS ═══ */}
      {vine("M 122 108 C 112 118 106 133 107 152", 0.38, 0.45)}
      <Bud cx={113} cy={120} r={5} accent={accent} />
      <Bud cx={108} cy={138} r={4} accent={accent} />
      <Leaf x1={116} y1={124} x2={108} y2={130} accent={accent} op={0.5} />
      {vine("M 198 108 C 208 118 214 133 213 152", 0.38, 0.45)}
      <Bud cx={207} cy={120} r={5} accent={accent} />
      <Bud cx={212} cy={138} r={4} accent={accent} />
      <Leaf x1={204} y1={124} x2={212} y2={130} accent={accent} op={0.5} />

      {/* ═══ WAIST JEWELED BAND ═══ */}
      {vine("M 110 165 C 122 161 138 159 150 161 C 157 162 163 162 170 161 C 182 159 198 161 210 165", 0.72, 0.82)}
      {[[-5,0],[-3,0],[0,0],[3,0],[5,0]].map(([dx], i) => bead(160+dx*4, 163, 1.4, 0.76, `wg${i}`))}
      <Mini5 cx={110} cy={166} r={5} accent={accent} />
      <Mini5 cx={210} cy={166} r={5} accent={accent} />

      {/* ═══ LEFT SKIRT — WISTERIA BOUGH ═══ */}
      {vine("M 112 195 C 103 225 96 262 90 300 C 85 338 80 372 76 412 C 74 432 72 456 70 480", 0.56, 0.68)}
      {/* Side tendril branches */}
      {vine("M 108 212 C 98 213 90 218 84 225", 0.38)}
      {vine("M 100 252 C 90 252 82 256 76 264", 0.35)}
      {vine("M 95 298 C 85 297 77 301 71 309", 0.33)}
      {vine("M 89 345 C 79 343 71 347 65 355", 0.30)}
      {/* Leaf pairs along main bough */}
      <Leaf x1={108} y1={220} x2={99} y2={212} accent={accent} op={0.56} />
      <Leaf x1={104} y1={222} x2={97} y2={230} accent={accent} op={0.56} />
      <Leaf x1={101} y1={264} x2={92} y2={257} accent={accent} op={0.52} />
      <Leaf x1={97}  y1={267} x2={89} y2={275} accent={accent} op={0.52} />
      <Leaf x1={93}  y1={310} x2={84} y2={303} accent={accent} op={0.48} />
      <Leaf x1={89}  y1={314} x2={81} y2={322} accent={accent} op={0.48} />
      <Leaf x1={83}  y1={358} x2={75} y2={351} accent={accent} op={0.44} />
      {/* 4 wisteria clusters hanging from side tendrils */}
      <WisteriaCluster x={84}  y={225} accent={accent} />
      <WisteriaCluster x={76}  y={264} accent={accent} />
      <WisteriaCluster x={71}  y={309} accent={accent} flip />
      <WisteriaCluster x={65}  y={355} accent={accent} />
      {/* Bough tip buds */}
      <Bud cx={72} cy={455} r={4.5} accent={accent} />
      <Bud cx={69} cy={474} r={3.5} accent={accent} />

      {/* ═══ RIGHT SKIRT — ROSE GARDEN ═══ */}
      {vine("M 218 185 C 226 213 234 244 240 272 C 246 300 244 328 240 358 C 236 387 229 412 223 442 C 219 460 215 474 213 490", 0.4, 0.55)}
      {/* HERO PEONY ROSE — large open bloom */}
      <Rose cx={240} cy={272} r={25} accent={accent} />
      <Leaf x1={240} y1={297} x2={224} y2={313} accent={accent} op={0.64} />
      <Leaf x1={240} y1={297} x2={256} y2={313} accent={accent} op={0.64} />
      <Leaf x1={232} y1={290} x2={216} y2={303} accent={accent} op={0.56} />
      <Leaf x1={248} y1={290} x2={263} y2={302} accent={accent} op={0.54} />
      {/* Medium rose */}
      <Rose cx={228} cy={382} r={17} accent={accent} />
      <Leaf x1={228} y1={399} x2={214} y2={413} accent={accent} op={0.58} />
      <Leaf x1={228} y1={399} x2={242} y2={413} accent={accent} op={0.58} />
      {/* Small accent rose */}
      <Rose cx={214} cy={458} r={12} accent={accent} />
      <Leaf x1={214} y1={470} x2={202} y2={480} accent={accent} op={0.52} />
      {/* Connecting buds on vine */}
      <Bud cx={242} cy={324} r={6.5} accent={accent} />
      <Bud cx={236} cy={344} r={5.5} accent={accent} />
      <Bud cx={222} cy={422} r={5.5} accent={accent} />
      <Bud cx={216} cy={440} r={4.5} accent={accent} />
      {/* Cross vines toward center skirt */}
      {vine("M 220 300 C 202 296 188 297 175 300", 0.3)}
      {vine("M 224 374 C 206 369 192 370 180 374", 0.28)}

      {/* ═══ CENTER SKIRT SCATTER ═══ */}
      <Mini5 cx={150} cy={208} r={5.5} accent={accent} />
      <Mini5 cx={168} cy={236} r={4.5} accent={accent} />
      <Mini5 cx={140} cy={272} r={5}   accent={accent} />
      <Mini5 cx={174} cy={304} r={4}   accent={accent} />
      <Mini5 cx={145} cy={344} r={5}   accent={accent} />
      <Mini5 cx={170} cy={370} r={4.5} accent={accent} />
      <Mini5 cx={150} cy={436} r={4}   accent={accent} />
      {vine("M 150 216 C 157 225 163 231 168 240", 0.26, 0.38)}
      {vine("M 168 242 C 161 252 151 260 140 276", 0.26, 0.38)}
      {vine("M 140 278 C 150 288 162 295 174 308", 0.26, 0.38)}
      {vine("M 174 312 C 165 322 155 332 145 348", 0.26, 0.38)}
      {vine("M 145 352 C 155 360 162 366 170 374", 0.24, 0.35)}

      {/* ═══ HIDDEN BUTTERFLY ═══ */}
      <Butterfly cx={156} cy={406} accent={accent} />

      {/* ═══ PEACOCK FEATHER EYES — left-centre skirt column ═══ */}
      {/* Connecting vine threading through the eyes */}
      {vine("M 126 254 C 128 276 130 294 130 312", 0.26, 0.38)}
      {vine("M 122 332 C 122 347 121 360 121 378", 0.22, 0.35)}
      <Leaf x1={126} y1={258} x2={132} y2={267} accent={accent} op={0.4} />
      <Leaf x1={129} y1={286} x2={134} y2={295} accent={accent} op={0.36} />
      <Leaf x1={124} y1={336} x2={129} y2={345} accent={accent} op={0.34} />
      {/* The three peacock eyes — upper, middle, lower */}
      <PeacockEye cx={126} cy={234} accent={accent} scale={1.06} op={0.78} />
      <PeacockEye cx={131} cy={308} accent={accent} scale={0.80} op={0.66} />
      <PeacockEye cx={121} cy={374} accent={accent} scale={0.90} op={0.70} />

      {/* ═══ HEM GOTHIC ARCH BORDER ═══ */}
      {[28,65,102,138,174,210,246,280].map((x, i) => (
        <g key={`arch${i}`}>
          <path d={`M ${x-15} 512 Q ${x-15} 494 ${x} 489 Q ${x+15} 494 ${x+15} 512`}
            fill="none" stroke={accent} strokeWidth={0.72} strokeOpacity={0.62} {...TSS} />
          <path d={`M ${x-14} 512 Q ${x-14} 495 ${x} 490 Q ${x+14} 495 ${x+14} 512 Z`}
            fill={accent} fillOpacity={0.055} {...TSS} />
          <Mini5 cx={x} cy={503} r={4} accent={accent} />
        </g>
      ))}
      {vine("M 13 512 L 307 512", 0.5, 0.68)}
      {vine("M 10 526 C 75 522 140 524 160 524 C 180 524 245 522 310 526", 0.3, 0.45)}
    </g>
  );
}

// ─── The Gown SVG — 320 × 560 dramatic ball gown ────────────────────────────
const Gown = ({ theme }: { theme: typeof THEMES[0] }) => (
  <svg width="320" height="560" viewBox="0 0 320 560" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ filter: "drop-shadow(0 36px 42px rgba(0,0,0,0.52))", overflow: "visible" }}>
    <defs>
      {/* Side shadow — 3D volume on skirt */}
      <linearGradient id="skirtSide" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="rgba(0,0,0,0.44)" />
        <stop offset="20%"  stopColor="rgba(0,0,0,0)"    />
        <stop offset="80%"  stopColor="rgba(0,0,0,0)"    />
        <stop offset="100%" stopColor="rgba(0,0,0,0.44)" />
      </linearGradient>
      {/* Bodice side shadow */}
      <linearGradient id="bodSide" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="rgba(0,0,0,0.40)" />
        <stop offset="25%"  stopColor="rgba(0,0,0,0)"    />
        <stop offset="75%"  stopColor="rgba(0,0,0,0)"    />
        <stop offset="100%" stopColor="rgba(0,0,0,0.40)" />
      </linearGradient>
      {/* Overhead silk specular — bodice */}
      <radialGradient id="specBod" cx="40%" cy="12%" r="34%" gradientUnits="objectBoundingBox">
        <stop offset="0%"   stopColor="rgba(255,255,255,0.52)" />
        <stop offset="55%"  stopColor="rgba(255,255,255,0.08)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
      </radialGradient>
      {/* Specular — skirt */}
      <radialGradient id="specSkirt" cx="38%" cy="5%" r="38%" gradientUnits="objectBoundingBox">
        <stop offset="0%"   stopColor="rgba(255,255,255,0.32)" />
        <stop offset="50%"  stopColor="rgba(255,255,255,0.06)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
      </radialGradient>
      {/* Ground shadow */}
      <radialGradient id="gnd" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="rgba(0,0,0,0.68)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0)"    />
      </radialGradient>
      {/* Skirt clip */}
      <clipPath id="sClip">
        <path d="M 106 172 Q 52 312 10 542 L 310 542 Q 268 312 214 172 Z" />
      </clipPath>
      {/* Bodice clip */}
      <clipPath id="bClip">
        <path d="M 85 35 Q 100 8 118 21 Q 130 30 160 24 Q 190 30 202 21 Q 220 8 235 35 L 214 172 L 106 172 Z" />
      </clipPath>
    </defs>

    {/* Ground shadow */}
    <ellipse cx="160" cy="552" rx="92" ry="10" fill="url(#gnd)" />

    {/* ── SKIRT ── */}
    <path d="M 106 172 Q 52 312 10 542 L 310 542 Q 268 312 214 172 Z"
      fill={theme.silk} style={{ transition: "fill 1.8s ease" }} />
    {/* 3D side shadow */}
    <path d="M 106 172 Q 52 312 10 542 L 310 542 Q 268 312 214 172 Z"
      fill="url(#skirtSide)" />
    {/* Fabric crease lines — very subtle */}
    <path d="M 115 180 Q 84 270 58 384 Q 44 424 36 542" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth={1.2} strokeLinecap="round" />
    <path d="M 128 176 Q 104 268 88 368 Q 78 410 70 542" fill="none" stroke="rgba(0,0,0,0.045)" strokeWidth={1} strokeLinecap="round" />
    <path d="M 160 174 Q 158 268 156 368 Q 155 410 156 542" fill="none" stroke="rgba(0,0,0,0.035)" strokeWidth={0.85} strokeLinecap="round" />
    <path d="M 192 176 Q 216 268 232 368 Q 242 410 250 542" fill="none" stroke="rgba(0,0,0,0.045)" strokeWidth={1} strokeLinecap="round" />
    <path d="M 205 180 Q 236 270 262 384 Q 276 424 284 542" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth={1.2} strokeLinecap="round" />
    {/* Tulle hem layers */}
    <path d="M 14 520 Q 85 514 160 516 Q 235 514 306 520 Q 235 527 160 529 Q 85 527 14 520 Z" fill="rgba(255,255,255,0.15)" />
    <path d="M 10 540 Q 85 534 160 536 Q 235 534 310 540" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth={1.4} />
    {/* Skirt specular */}
    <path d="M 106 172 Q 52 312 10 542 L 310 542 Q 268 312 214 172 Z"
      fill="url(#specSkirt)" clipPath="url(#sClip)" />

    {/* ── BODICE ── */}
    <path d="M 85 35 Q 100 8 118 21 Q 130 30 160 24 Q 190 30 202 21 Q 220 8 235 35 L 214 172 L 106 172 Z"
      fill={theme.silk} style={{ transition: "fill 1.8s ease" }} />
    {/* 3D side shadow */}
    <path d="M 85 35 Q 100 8 118 21 Q 130 30 160 24 Q 190 30 202 21 Q 220 8 235 35 L 214 172 L 106 172 Z"
      fill="url(#bodSide)" clipPath="url(#bClip)" />
    {/* Boning lines — barely visible structure */}
    <path d="M 122 26 L 120 170" fill="none" stroke="rgba(0,0,0,0.065)" strokeWidth={0.75} />
    <path d="M 198 26 L 200 170" fill="none" stroke="rgba(0,0,0,0.065)" strokeWidth={0.75} />
    {/* Specular highlight */}
    <path d="M 85 35 Q 100 8 118 21 Q 130 30 160 24 Q 190 30 202 21 Q 220 8 235 35 L 214 172 L 106 172 Z"
      fill="url(#specBod)" clipPath="url(#bClip)" />

    {/* ── SWEETHEART NECKLINE ── */}
    <path d="M 87 37 Q 101 8 119 21 Q 131 29 160 23 Q 189 29 201 21 Q 219 8 233 37"
      fill="none" stroke="rgba(0,0,0,0.13)" strokeWidth={1} strokeLinecap="round" />
    <path d="M 88 35 Q 103 6 121 19 Q 133 27 160 21 Q 187 27 199 19 Q 217 6 232 35"
      fill="none" stroke="rgba(255,255,255,0.56)" strokeWidth={1.6} strokeLinecap="round" />

    {/* ── WAIST SEAM ── */}
    <path d="M 106 170 Q 160 178 214 170" fill="none" stroke="rgba(0,0,0,0.09)" strokeWidth={1} strokeLinecap="round" />
    <path d="M 106 172 Q 160 180 214 172" fill="none" stroke="rgba(255,255,255,0.36)" strokeWidth={1.2} strokeLinecap="round" />
    <path d="M 145 172 Q 160 165 175 172 Q 160 179 145 172 Z" fill="rgba(255,255,255,0.28)" />
    <path d="M 145 172 Q 160 165 175 172 Q 160 179 145 172 Z" fill="none" stroke="rgba(255,255,255,0.46)" strokeWidth={0.65} />

    {/* ── SILHOUETTE OUTLINE ── */}
    <path d="M 85 35 Q 100 8 118 21 Q 130 30 160 24 Q 190 30 202 21 Q 220 8 235 35 L 214 172 Q 268 312 310 542 L 10 542 Q 52 312 106 172 Z"
      fill="none" stroke="rgba(200,190,180,0.26)" strokeWidth={0.9} />

    {/* ── EMBROIDERY — rendered on top ── */}
    <Embroidery accent={theme.accent} />
  </svg>
);

// ─── Decorative Tailor SVGs ───────────────────────────────────────────────────

function TapeMeasureDivider({ accent = "#C084FC" }: { accent?: string }) {
  const marks: React.ReactNode[] = [];
  for (let i = 0; i <= 288; i++) {
    const x = i * 5;
    const major = i % 10 === 0;
    const medium = i % 5 === 0;
    if (major && i > 0) marks.push(
      <text key={`n${i}`} x={x} y={32} textAnchor="middle" fontSize="7" fill="white"
        fontFamily="monospace" opacity={0.25}>{i / 10}</text>
    );
    marks.push(
      <line key={i} x1={x} y1={0} x2={x} y2={major ? 18 : medium ? 12 : 7}
        stroke="white" strokeWidth={major ? 1.4 : 0.7} opacity={major ? 0.35 : 0.15} />,
      <line key={`b${i}`} x1={x} y1={44} x2={x} y2={major ? 26 : medium ? 32 : 37}
        stroke="white" strokeWidth={major ? 1.4 : 0.7} opacity={major ? 0.35 : 0.15} />
    );
  }
  return (
    <div style={{ width:"100%", height:44, background:"rgba(255,255,255,0.018)",
      borderTop:`1px solid ${accent}28`, borderBottom:`1px solid ${accent}28`,
      position:"relative", overflow:"hidden" }}>
      <svg viewBox="0 0 1440 44" width="100%" height="44" preserveAspectRatio="none">
        <line x1={0} y1={22} x2={1440} y2={22} stroke={accent} strokeWidth="0.5" opacity="0.2" strokeDasharray="10 6" />
        {marks}
      </svg>
      <div style={{ position:"absolute", left:32, top:"50%", transform:"translateY(-50%)",
        fontSize:8, letterSpacing:4, textTransform:"uppercase", color:`${accent}66`,
        fontFamily:"monospace" }}>cm</div>
    </div>
  );
}

function SewingMachineSVG({ color = "white", size = 300 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size * 0.78} viewBox="0 0 300 234" fill="none"
      stroke={color} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
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
      <line x1="112" y1="200" x2="112" y2="194" strokeWidth="1" /><line x1="120" y1="200" x2="120" y2="194" strokeWidth="1" /><line x1="128" y1="200" x2="128" y2="194" strokeWidth="1" />
      <circle cx="86" cy="58" r="9" strokeWidth="1.5" /><circle cx="86" cy="58" r="3.5" fill={color} strokeWidth="0" />
      <ellipse cx="148" cy="33" rx="15" ry="8" strokeWidth="1.5" />
      <line x1="133" y1="33" x2="163" y2="33" strokeWidth="1" opacity={0.45} />
      <line x1="136" y1="25" x2="136" y2="41" strokeWidth="1" opacity={0.4} /><line x1="160" y1="25" x2="160" y2="41" strokeWidth="1" opacity={0.4} />
      <ellipse cx="148" cy="41" rx="15" ry="5" strokeWidth="1.2" opacity={0.5} />
      <path d="M150 40 Q124 56 102 74" strokeWidth="1" strokeDasharray="4 3" opacity={0.5} />
      <circle cx="182" cy="40" r="8" strokeWidth="1.5" />
      <line x1="182" y1="32" x2="182" y2="48" strokeWidth="1" opacity={0.4} /><line x1="174" y1="40" x2="190" y2="40" strokeWidth="1" opacity={0.4} />
      <circle cx="130" cy="56" r="6" strokeWidth="1.3" />
    </svg>
  );
}

function MeasuringRuler({ color = "white" }: { color?: string }) {
  const marks: React.ReactNode[] = [];
  for (let i = 0; i <= 200; i++) {
    const x = i * 6;
    const major = i % 10 === 0;
    const medium = i % 5 === 0;
    marks.push(
      <g key={i}>
        <line x1={x} y1={0} x2={x} y2={major ? 14 : medium ? 9 : 5}
          stroke={color} strokeWidth={major ? 1.2 : 0.7} />
        {major && i > 0 && (
          <text x={x} y={24} textAnchor="middle" fontSize="7" fill={color}
            fontFamily="monospace" letterSpacing="0.5">{i / 10}</text>
        )}
      </g>
    );
  }
  return (
    <svg viewBox="0 0 1200 28" width="100%" height="28" preserveAspectRatio="none">
      <line x1={0} y1={0} x2={1200} y2={0} stroke={color} strokeWidth="1.5" />
      {marks}
    </svg>
  );
}

function TailorPins({ color = "white", accent = "#C084FC" }: { color?: string; accent?: string }) {
  return (
    <svg width="220" height="60" viewBox="0 0 220 60" fill="none">
      {[0,1,2,3,4].map(i => (
        <g key={i} transform={`translate(${i * 44}, 0) rotate(${-12 + i * 6}, 20, 54)`}>
          <line x1="20" y1="8" x2="20" y2="54" stroke={color} strokeWidth="1.2" opacity={0.55} />
          <circle cx="20" cy="6" r="5" fill={accent} opacity={0.7} />
          <circle cx="20" cy="6" r="2.5" fill={color} opacity={0.9} />
          <line x1="18" y1="52" x2="22" y2="58" stroke={color} strokeWidth="1.5" opacity={0.5} />
        </g>
      ))}
    </svg>
  );
}

function TailorLSquare({ color = "white" }: { color?: string }) {
  const vMarks: React.ReactNode[] = [];
  const hMarks: React.ReactNode[] = [];
  for (let i = 0; i <= 28; i++) {
    const y = i * 6; const major = i % 5 === 0; const med = i % 2 === 0;
    vMarks.push(<line key={i} x1={14} y1={y} x2={major ? 25 : med ? 21 : 18} y2={y}
      stroke={color} strokeWidth={major ? 1.2 : 0.7} />);
    if (major && i > 0) vMarks.push(<text key={`t${i}`} x={27} y={y + 3} fontSize="7"
      fill={color} fontFamily="monospace" opacity={0.8}>{i}</text>);
  }
  for (let i = 0; i <= 22; i++) {
    const x = i * 6; const major = i % 5 === 0; const med = i % 2 === 0;
    hMarks.push(<line key={i} x1={x} y1={168} x2={x} y2={major ? 157 : med ? 161 : 164}
      stroke={color} strokeWidth={major ? 1.2 : 0.7} />);
    if (major && i > 0) hMarks.push(<text key={`t${i}`} x={x} y={155} textAnchor="middle"
      fontSize="7" fill={color} fontFamily="monospace" opacity={0.8}>{i}</text>);
  }
  return (
    <svg width="180" height="200" viewBox="0 0 160 190" fill="none">
      <rect x="10" y="0" width="8" height="170" rx="2" fill={color} opacity={0.85} />
      <rect x="10" y="162" width="132" height="8" rx="2" fill={color} opacity={0.85} />
      {vMarks}{hMarks}
    </svg>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [idx, setIdx]           = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % THEMES.length), 4500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const t = THEMES[idx];

  return (
    <div style={{
      minHeight: "100vh",
      background: t.bg,
      color: "#fff",
      transition: "background 2.2s ease",
      fontFamily: "'Syne', sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,700&family=Syne:wght@400;500;600;700;800&display=swap');

        @keyframes irisOpen   { from{clip-path:circle(0% at 50% 50%)} to{clip-path:circle(150% at 50% 50%)} }
        @keyframes slowZoom   { from{transform:scale(1.1)} to{transform:scale(1.0)} }
        @keyframes fadeIn     { from{opacity:0} to{opacity:1} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(38px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimLogo   { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        @keyframes gradTxt    { 0%{background-position:0% 50%} 100%{background-position:300% 50%} }
        @keyframes subtlePulse{ 0%,100%{opacity:0.055} 50%{opacity:0.11} }
        @keyframes revealLine { from{transform:scaleX(0)} to{transform:scaleX(1)} }

        .logo-mark {
          background: linear-gradient(90deg,#C084FC,#F9A8D4,#FCD34D,#C084FC);
          background-size:200% 100%;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          animation: shimLogo 4s linear infinite;
        }
        .hero-italic {
          font-style:italic;
          background: linear-gradient(90deg,#C084FC,#F9A8D4,#FCD34D,#6EE7B7,#93C5FD,#C084FC);
          background-size:300% 100%;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          animation: gradTxt 7s linear infinite;
        }
        .cta-btn {
          display:inline-flex; align-items:center; gap:10px;
          padding:16px 44px; background:rgba(255,255,255,0.95); color:#0a0a0a;
          font-size:11px; letter-spacing:3px; text-transform:uppercase;
          font-weight:700; text-decoration:none; position:relative; overflow:hidden;
          transition:transform 0.25s;
        }
        .cta-btn:hover { transform:translateY(-2px); }
        .ghost-btn {
          display:inline-flex; align-items:center; gap:8px;
          padding:15px 40px; background:transparent; color:rgba(255,255,255,0.7);
          font-size:11px; letter-spacing:3px; text-transform:uppercase;
          font-weight:500; text-decoration:none;
          border:1px solid rgba(255,255,255,0.2);
          transition:border-color 0.3s, color 0.3s;
        }
        .ghost-btn:hover { border-color:rgba(255,255,255,0.52); color:#fff; }
        .feat-card {
          padding:48px 40px; border:1px solid rgba(255,255,255,0.06);
          background:rgba(255,255,255,0.025); position:relative; overflow:hidden;
          transition:background 0.4s, transform 0.3s;
        }
        .feat-card:hover { background:rgba(255,255,255,0.05); transform:translateY(-4px); }
        .feat-card::before {
          content:''; position:absolute; inset:0 0 auto 0; height:1px;
          background:currentColor; transform:scaleX(0); transform-origin:left;
          transition:transform 0.5s ease;
        }
        .feat-card:hover::before { transform:scaleX(1); }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.09); border-radius:3px; }
      `}</style>

      {/* Background gradient glow */}
      <div style={{
        position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
        backgroundImage:`radial-gradient(ellipse 60% 42% at 50% 50%, ${t.mid}99 0%, transparent 100%)`,
        transition:"background-image 2.2s ease",
      }} />
      {/* Faint brocade texture */}
      <div style={{
        position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
        backgroundImage:`repeating-linear-gradient(45deg, rgba(255,255,255,0.011) 0px, rgba(255,255,255,0.011) 1px, transparent 1px, transparent 28px),
                         repeating-linear-gradient(-45deg, rgba(255,255,255,0.011) 0px, rgba(255,255,255,0.011) 1px, transparent 1px, transparent 28px)`,
        animation:"subtlePulse 9s ease-in-out infinite",
      }} />

      {/* ══ NAVBAR ══ */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        padding:"22px 56px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background: scrolled ? `${t.bg}EA` : "transparent",
        backdropFilter: scrolled ? "blur(22px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.045)" : "none",
        transition:"background 0.5s, border 0.5s",
      }}>
        <Link to="/home" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{
            width:34, height:34, borderRadius:"50%",
            border:`1px solid ${t.accent}42`,
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"border-color 2s ease",
          }}>
            <Scissors size={15} style={{ color:t.accent, transition:"color 2s ease" }} strokeWidth={1.4} />
          </div>
          <span className="logo-mark" style={{ fontSize:13, fontWeight:700, letterSpacing:3 }}>
            MUSE SKETCH STUDIO
          </span>
        </Link>

        <div style={{ display:"flex", gap:40, alignItems:"center" }}>
          {[["Home","/home"],["Gallery","/gallery"],["Blog","/blog"],["About","/about"]].map(([l,to]) => (
            <Link key={l} to={to} style={{
              color:"rgba(255,255,255,0.5)", textDecoration:"none",
              fontSize:11, letterSpacing:2, textTransform:"uppercase",
              transition:"color 0.3s",
            }}
              onMouseEnter={e=>(e.currentTarget.style.color="#fff")}
              onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.5)")}
            >{l}</Link>
          ))}
          <Link to="/design" className="cta-btn" style={{ padding:"9px 26px", fontSize:10, letterSpacing:2 }}>
            Start Free Trial
          </Link>
        </div>
      </nav>

      {/* ══ HERO — full-screen iris reveal ══ */}
      <section style={{ position:"relative", height:"100vh", overflow:"hidden", zIndex:1 }}>

        {/* Video layer — iris/aperture open animation */}
        <div style={{
          position:"absolute", inset:0,
          animation:"irisOpen 2s cubic-bezier(0.22,1,0.36,1) 0.3s both",
        }}>
          <video
            src="./runway.mp4"
            autoPlay muted loop playsInline
            style={{
              width:"100%", height:"100%", objectFit:"cover", display:"block",
              animation:"slowZoom 3.5s ease-out 0.3s both",
            }}
          />
          {/* Cinematic gradient — dark on edges, reveals model in centre */}
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(to right, rgba(13,8,25,0.92) 0%, rgba(13,8,25,0.55) 35%, rgba(13,8,25,0.08) 52%, rgba(13,8,25,0.08) 62%, rgba(13,8,25,0.75) 100%)",
          }} />
          {/* Top vignette */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:220, background:"linear-gradient(to bottom, rgba(13,8,25,0.75), transparent)" }} />
          {/* Bottom vignette */}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:220, background:"linear-gradient(to top, rgba(13,8,25,0.88), transparent)" }} />
        </div>

        {/* Content layer */}
        <div style={{
          position:"absolute", inset:0, zIndex:2,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"0 72px",
        }}>
          {/* LEFT — title */}
          <div style={{ animation:"fadeUp 1s ease 1.6s both" }}>
            <p style={{ fontSize:10, letterSpacing:7, textTransform:"uppercase", color:t.accent, marginBottom:28, transition:"color 2s ease" }}>
              Haute Couture Software
            </p>
            <h1 style={{
              fontFamily:"'Cormorant Garamond', serif",
              fontSize:"clamp(58px,7.2vw,104px)",
              fontWeight:700, lineHeight:0.88,
              textTransform:"uppercase", letterSpacing:"-0.01em",
            }}>
              Design<br />
              <span className="hero-italic">Without</span><br />
              <span style={{ color:"rgba(255,255,255,0.14)" }}>Limits</span>
            </h1>
            {/* Theme dots */}
            <div style={{ display:"flex", gap:10, marginTop:52, alignItems:"center" }}>
              {THEMES.map((th, i) => (
                <button key={i} onClick={() => setIdx(i)} style={{
                  width: i===idx ? 30 : 6, height:6, borderRadius:3,
                  background: i===idx ? th.accent : "rgba(255,255,255,0.17)",
                  border:"none", cursor:"pointer", padding:0,
                  transition:"all 0.45s ease",
                }} />
              ))}
            </div>
            <p style={{ fontSize:10, letterSpacing:4, textTransform:"uppercase", color:t.accent, marginTop:14, opacity:0.7, transition:"color 2s ease" }}>
              {t.name}
            </p>
          </div>

          {/* RIGHT — tagline + CTAs */}
          <div style={{ maxWidth:340, animation:"fadeUp 1s ease 2s both" }}>
            <p style={{
              fontFamily:"'Cormorant Garamond', serif",
              fontSize:21, fontStyle:"italic",
              color:"rgba(255,255,255,0.75)", lineHeight:1.78, marginBottom:44,
            }}>
              The digital atelier where a designer's imagination becomes a living collection — before a single stitch is made.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <Link to="/design" className="cta-btn">
                <span>Begin Your Collection</span>
                <ArrowRight size={13} />
              </Link>
              <Link to="/gallery" className="ghost-btn">View Gallery</Link>
            </div>
          </div>
        </div>

        {/* Bottom label */}
        <div style={{
          position:"absolute", bottom:36, left:0, right:0,
          display:"flex", justifyContent:"center", zIndex:3,
          animation:"fadeIn 1s ease 2.4s both",
        }}>
          <span style={{ fontSize:8, letterSpacing:6, textTransform:"uppercase", color:"rgba(255,255,255,0.38)", borderBottom:"1px solid rgba(255,255,255,0.14)", paddingBottom:5 }}>
            Runway AW 2025 · Muse Sketch Studio
          </span>
        </div>
      </section>

      {/* ══ POSSIBILITIES BAND ══ */}
      <section style={{ background:"rgba(255,255,255,0.015)", position:"relative", overflow:"hidden" }}>
        {/* Sewing machine — more visible on home page */}
        <div style={{ position:"absolute", right:-20, top:"50%", transform:"translateY(-50%)", opacity:0.09, pointerEvents:"none", zIndex:0 }}>
          <SewingMachineSVG color="white" size={520} />
        </div>
        {/* Small sewing machine — left side, smaller */}
        <div style={{ position:"absolute", left:40, bottom:-20, opacity:0.06, pointerEvents:"none", zIndex:0, transform:"scale(-1,1)" }}>
          <SewingMachineSVG color={t.accent} size={200} />
        </div>
        <div style={{ maxWidth:1440, margin:"0 auto", padding:"80px 72px", display:"grid", gridTemplateColumns:"auto 1fr", gap:80, alignItems:"center", position:"relative", zIndex:1 }}>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start" }}>
            <div style={{
              fontFamily:"'Cormorant Garamond', serif",
              fontSize:160, fontWeight:700,
              color:t.accent, lineHeight:0.85,
              transition:"color 2s ease",
              letterSpacing:-4,
            }}>∞</div>
            <div style={{ fontSize:10, letterSpacing:6, textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginTop:16 }}>Possibilities</div>
          </div>
          <div style={{ borderLeft:`1px solid ${t.accent}22`, paddingLeft:80, transition:"border-color 2s ease" }}>
            <p style={{
              fontFamily:"'Cormorant Garamond', serif",
              fontSize:"clamp(28px,3.5vw,48px)", fontWeight:300, fontStyle:"italic",
              color:"rgba(255,255,255,0.65)", lineHeight:1.45, marginBottom:28,
            }}>
              Every sketch, every silhouette,<br />every vision — yours to create.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
              {/* Pipeline flow indicator */}
              <div style={{ display:"flex", alignItems:"center", gap:0 }}>
                {(["Sketch","Colour","Runway"] as const).map((label, i) => (
                  <React.Fragment key={label}>
                    <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                      <span style={{ fontSize:11 }}>{ ["✏️","🎨","👗"][i] }</span>
                      <span style={{ fontSize:9, letterSpacing:3, textTransform:"uppercase",
                        color:t.accent, opacity:0.72, transition:"color 2s ease" }}>{label}</span>
                    </div>
                    {i < 2 && (
                      <span style={{ margin:"0 12px", color:t.accent, opacity:0.28,
                        fontSize:16, transition:"color 2s ease" }}>→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              {/* Body text — broken into two lines with weight contrast */}
              <p style={{ fontFamily:"'Cormorant Garamond', serif", lineHeight:1.82, margin:0 }}>
                <span style={{ fontSize:19, color:"rgba(255,255,255,0.52)", fontStyle:"italic" }}>
                  Start with an idea.
                </span>
                <br />
                <span style={{ fontSize:16, color:"rgba(255,255,255,0.28)" }}>
                  Take it from sketch to colour to runway —
                </span>
                <br />
                <span style={{ fontSize:14, color:"rgba(255,255,255,0.18)", letterSpacing:"0.02em" }}>
                  the complete creative pipeline, all in one place.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section style={{ padding:"110px 72px", maxWidth:1440, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:72 }}>
          <div>
            <p style={{ fontSize:10, letterSpacing:6, textTransform:"uppercase", color:t.accent, marginBottom:18, transition:"color 2s ease" }}>
              The Platform
            </p>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(36px,4vw,60px)", fontWeight:700, lineHeight:1.05 }}>
              Everything a <em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.32)" }}>couturier</em> needs
            </h2>
          </div>
          <Link to="/design" className="ghost-btn" style={{ flexShrink:0 }}>
            Explore All Tools
          </Link>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, background:"rgba(255,255,255,0.045)" }}>
          {[
            { num:"01", icon:"✏️", title:"AI Sketch Engine",
              text:"Transform rough ideas into polished fashion illustrations in seconds. Pencil to presentation — instantly." },
            { num:"02", icon:"🎨", title:"Colour Intelligence",
              text:"Explore every colour story across fabrics, textures and seasons in real-time — as you sketch." },
            { num:"03", icon:"👗", title:"Virtual Runway",
              text:"Present collections with cinematic 3D runway previews. Impress buyers before the first sample exists." },
          ].map((f,i) => (
            <div key={i} className="feat-card" style={{ color:t.accent, transition:"border-color 2s, color 2s, background 0.4s, transform 0.3s" }}>
              <div style={{
                position:"absolute", top:20, right:28,
                fontFamily:"'Cormorant Garamond', serif",
                fontSize:80, fontWeight:900, color:"rgba(255,255,255,0.03)", lineHeight:1,
              }}>{f.num}</div>
              <span style={{ fontSize:36, display:"block", marginBottom:28 }}>{f.icon}</span>
              <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:28, fontWeight:700, marginBottom:14, color:"#fff" }}>{f.title}</h3>
              <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:17, color:"rgba(255,255,255,0.46)", lineHeight:1.78 }}>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section style={{ padding:"110px 72px", maxWidth:1440, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:72 }}>
          <p style={{ fontSize:10, letterSpacing:6, textTransform:"uppercase", color:t.accent, marginBottom:18, transition:"color 2s ease" }}>
            The Process
          </p>
          <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(36px,4vw,60px)", fontWeight:700, lineHeight:1.05 }}>
            From concept to <em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.32)" }}>collection</em>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:2, background:"rgba(255,255,255,0.045)" }}>
          {[
            { step:"I",   title:"Describe",  text:"Type your vision in plain language — fabric, silhouette, mood, occasion. No technical knowledge required." },
            { step:"II",  title:"Generate",  text:"Watch AI produce a detailed fashion sketch in seconds, ready for your creative direction." },
            { step:"III", title:"Refine",    text:"Adjust colours, textures, embellishments and proportions until every detail is exactly right." },
            { step:"IV",  title:"Present",   text:"Export professional lookbooks, runway previews and tech packs ready for production or client review." },
          ].map((s,i) => (
            <div key={i} style={{
              padding:"48px 36px", background:"rgba(255,255,255,0.025)",
              borderTop:`1px solid ${t.accent}30`, transition:"border-color 2s ease",
            }}>
              <div style={{
                fontFamily:"'Cormorant Garamond', serif",
                fontSize:52, fontWeight:300, color:t.accent,
                opacity:0.4, lineHeight:1, marginBottom:24, transition:"color 2s ease",
              }}>{s.step}</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:26, fontWeight:700, marginBottom:12, color:"#fff" }}>{s.title}</h3>
              <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:16, color:"rgba(255,255,255,0.44)", lineHeight:1.78 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ MANIFESTO BAND ══ */}
      <section style={{
        padding:"120px 72px",
        background:`linear-gradient(180deg, transparent, ${t.mid}55, transparent)`,
        transition:"background 2s ease",
        position:"relative", zIndex:1, overflow:"hidden",
      }}>
        {/* Tailor measurement mandala — background decoration */}
        <div style={{ position:"absolute", right:"-8%", top:"50%", transform:"translateY(-50%)", opacity:0.07, pointerEvents:"none", zIndex:0 }}>
          <svg width="640" height="640" viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Concentric measurement rings */}
            {[60,110,160,210,260,300].map((r, ri) => (
              <g key={ri}>
                <circle cx="320" cy="320" r={r} stroke={t.accent} strokeWidth={ri === 5 ? 1.2 : 0.6} strokeOpacity={0.9} />
                {/* Tick marks around each ring */}
                {Array.from({ length: ri < 2 ? 36 : ri < 4 ? 72 : 120 }).map((_, i) => {
                  const total = ri < 2 ? 36 : ri < 4 ? 72 : 120;
                  const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
                  const major = i % (ri < 2 ? 6 : ri < 4 ? 12 : 20) === 0;
                  const med   = i % (ri < 2 ? 3 : ri < 4 ? 6  : 10) === 0;
                  const tickLen = major ? 14 : med ? 8 : 4;
                  const x1 = 320 + r * Math.cos(angle);
                  const y1 = 320 + r * Math.sin(angle);
                  const x2 = 320 + (r + tickLen) * Math.cos(angle);
                  const y2 = 320 + (r + tickLen) * Math.sin(angle);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={t.accent} strokeWidth={major ? 1.0 : 0.5} strokeOpacity={major ? 1 : 0.6} />;
                })}
                {/* Numbers on major ticks of outermost ring */}
                {ri === 5 && Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
                  const nr = r + 24;
                  return <text key={i}
                    x={320 + nr * Math.cos(angle)} y={320 + nr * Math.sin(angle)}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="9" fill={t.accent} fontFamily="monospace" opacity="0.85"
                  >{i === 0 ? "0" : i * 5}</text>;
                })}
              </g>
            ))}
            {/* Crosshair lines */}
            <line x1="320" y1="10"  x2="320" y2="630" stroke={t.accent} strokeWidth="0.4" strokeOpacity="0.35" strokeDasharray="6 8" />
            <line x1="10"  y1="320" x2="630" y2="320" stroke={t.accent} strokeWidth="0.4" strokeOpacity="0.35" strokeDasharray="6 8" />
            {/* Diagonal guides */}
            <line x1="108" y1="108" x2="532" y2="532" stroke={t.accent} strokeWidth="0.3" strokeOpacity="0.2" strokeDasharray="4 10" />
            <line x1="532" y1="108" x2="108" y2="532" stroke={t.accent} strokeWidth="0.3" strokeOpacity="0.2" strokeDasharray="4 10" />
            {/* Centre dot */}
            <circle cx="320" cy="320" r="4" fill={t.accent} opacity="0.8" />
            <circle cx="320" cy="320" r="10" stroke={t.accent} strokeWidth="0.8" opacity="0.5" fill="none" />
          </svg>
        </div>
        {/* Small measurement ring — left side */}
        <div style={{ position:"absolute", left:"-4%", top:"50%", transform:"translateY(-50%)", opacity:0.04, pointerEvents:"none", zIndex:0 }}>
          <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
            {[40,75,110,145].map((r, ri) => (
              <g key={ri}>
                <circle cx="160" cy="160" r={r} stroke={t.accent} strokeWidth="0.6" />
                {Array.from({ length: 60 }).map((_, i) => {
                  const angle = (i / 60) * 2 * Math.PI - Math.PI / 2;
                  const major = i % 10 === 0; const med = i % 5 === 0;
                  const tl = major ? 10 : med ? 6 : 3;
                  return <line key={i}
                    x1={160 + r * Math.cos(angle)} y1={160 + r * Math.sin(angle)}
                    x2={160 + (r+tl) * Math.cos(angle)} y2={160 + (r+tl) * Math.sin(angle)}
                    stroke={t.accent} strokeWidth={major ? 0.8 : 0.4} />;
                })}
              </g>
            ))}
            <circle cx="160" cy="160" r="3" fill={t.accent} opacity="0.8" />
            <line x1="160" y1="5"   x2="160" y2="315" stroke={t.accent} strokeWidth="0.3" strokeDasharray="4 8" opacity="0.4" />
            <line x1="5"   y1="160" x2="315" y2="160" stroke={t.accent} strokeWidth="0.3" strokeDasharray="4 8" opacity="0.4" />
          </svg>
        </div>
        <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
          <p style={{ fontSize:10, letterSpacing:7, textTransform:"uppercase", color:t.accent, marginBottom:36, transition:"color 2s ease" }}>
            The Philosophy
          </p>
          {/* Big italic quote */}
          <p style={{
            fontFamily:"'Cormorant Garamond', serif",
            fontSize:"clamp(32px,4.5vw,62px)", fontWeight:300, fontStyle:"italic",
            color:"rgba(255,255,255,0.82)", lineHeight:1.35, marginBottom:56,
            letterSpacing:"-0.01em",
          }}>
            "Fashion has always been about vision.<br />
            <span style={{ color:"rgba(255,255,255,0.38)" }}>We just gave that vision</span>{" "}
            a studio."
          </p>
          {/* Three pillars */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:0, borderTop:`1px solid ${t.accent}20`, borderBottom:`1px solid ${t.accent}20`, transition:"border-color 2s ease" }}>
            {[
              { label:"Sketch", desc:"Every great collection starts with a line on paper. Ours starts with a line of text." },
              { label:"Colour", desc:"Explore every palette, fabric, and texture — in real time, before anything is made." },
              { label:"Runway", desc:"Present your vision as a living collection. Before a single sample is cut." },
            ].map((p, i) => (
              <div key={i} style={{
                padding:"48px 36px",
                borderRight: i < 2 ? `1px solid ${t.accent}15` : "none",
                transition:"border-color 2s ease",
              }}>
                <div style={{
                  fontFamily:"'Cormorant Garamond', serif",
                  fontSize:42, fontWeight:700, fontStyle:"italic",
                  color:t.accent, marginBottom:18, lineHeight:1,
                  transition:"color 2s ease",
                }}>{p.label}</div>
                <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:16, color:"rgba(255,255,255,0.42)", lineHeight:1.75 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{
        padding:"140px 72px", textAlign:"center",
        position:"relative", zIndex:1,
      }}>
        <p style={{ fontSize:10, letterSpacing:6, textTransform:"uppercase", color:t.accent, marginBottom:28, transition:"color 2s ease" }}>
          Begin Today
        </p>
        <h2 style={{
          fontFamily:"'Cormorant Garamond', serif",
          fontSize:"clamp(52px,7vw,96px)", fontWeight:700,
          lineHeight:0.94, marginBottom:32,
        }}>
          Ready to <span className="hero-italic">Create?</span>
        </h2>
        <p style={{
          fontFamily:"'Cormorant Garamond', serif",
          fontSize:20, fontStyle:"italic",
          color:"rgba(255,255,255,0.40)", marginBottom:52,
        }}>
          The only limit is your imagination
        </p>
        <div style={{ display:"flex", gap:16, justifyContent:"center" }}>
          <Link to="/design" className="cta-btn">
            <span>Start Free Trial</span>
            <ArrowRight size={13} />
          </Link>
          <Link to="/gallery" className="ghost-btn">Explore Gallery</Link>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{
        padding:"40px 72px",
        display:"grid", gridTemplateColumns:"1fr 1fr 1fr",
        alignItems:"center", position:"relative", zIndex:1,
      }}>
        <span className="logo-mark" style={{ fontSize:13, fontWeight:700, letterSpacing:3 }}>
          MUSE SKETCH STUDIO
        </span>
        <div style={{ display:"flex", gap:28, justifyContent:"center" }}>
          {[["Contact","#"],["Blog","/blog"],["About","/about"]].map(([l,to]) => (
            <Link key={l} to={to} style={{
              color:"rgba(255,255,255,0.26)", textDecoration:"none",
              fontSize:10, letterSpacing:2, textTransform:"uppercase", transition:"color 0.3s",
            }}
              onMouseEnter={e=>(e.currentTarget.style.color="#fff")}
              onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.26)")}
            >{l}</Link>
          ))}
        </div>
        <div style={{ textAlign:"right", fontSize:9, color:"rgba(255,255,255,0.17)", letterSpacing:1 }}>
          © 2026 Muse Sketch Studio
        </div>
      </footer>
    </div>
  );
}
