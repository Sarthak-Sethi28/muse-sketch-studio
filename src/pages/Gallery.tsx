import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Scissors, Pencil, Palette, User } from "lucide-react";

// ── Designer At Work — old couturier stitching a gown on a dress form ─────────
// (kept as fallback shape — main display uses the real photo watermark)
function DesignerAtWork({ accent = "#C084FC" }: { accent?: string }) {
  const c = accent;
  return (
    <svg width="660" height="480" viewBox="0 0 660 480" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="daw-candle" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FCD34D" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="daw-formGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c} stopOpacity="0.07" />
          <stop offset="100%" stopColor={c} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="daw-gownFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c} stopOpacity="0.055" />
          <stop offset="100%" stopColor={c} stopOpacity="0.015" />
        </linearGradient>
        <filter id="daw-shadow">
          <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>

      {/* ── ATMOSPHERE — candlelight warm glow above designer ── */}
      <circle cx="538" cy="64" r="72" fill="url(#daw-candle)" />
      {/* Form aura */}
      <ellipse cx="210" cy="220" rx="90" ry="140" fill="url(#daw-formGlow)" />

      {/* ── BOTANICAL CORNER FRAMES ── */}
      {/* Top-left vine */}
      <path d="M 10 10 Q 10 50 14 88 Q 16 118 10 148" stroke={c} strokeWidth="0.55" strokeOpacity="0.2" fill="none" />
      <path d="M 10 38 Q 28 30 40 36" stroke={c} strokeWidth="0.5" strokeOpacity="0.18" fill="none" />
      <path d="M 10 38 Q 22 28 32 38 Q 20 44 10 38 Z" stroke={c} strokeWidth="0.48" strokeOpacity="0.22" fill="none" />
      <path d="M 12 70 Q 30 60 44 66" stroke={c} strokeWidth="0.48" strokeOpacity="0.16" fill="none" />
      <path d="M 12 70 Q 26 58 38 68 Q 24 76 12 70 Z" stroke={c} strokeWidth="0.45" strokeOpacity="0.18" fill="none" />
      <path d="M 11 105 Q 29 94 42 100" stroke={c} strokeWidth="0.45" strokeOpacity="0.14" fill="none" />
      {/* Small florets top-left */}
      {[0,72,144,216,288].map((a,i) => (
        <path key={`ctlf${i}`} d={`M 44 36 C 42.5 33.5 42.5 29 44 28 C 45.5 29 45.5 33.5 44 36 Z`}
          stroke={c} strokeWidth="0.55" strokeOpacity="0.28" fill="none" transform={`rotate(${a}, 44, 36)`} />
      ))}
      <circle cx="44" cy="36" r="2" stroke={c} strokeWidth="0.5" strokeOpacity="0.32" fill="none" />
      {/* Bottom-right vine */}
      <path d="M 650 470 Q 650 432 646 394 Q 644 364 650 334" stroke={c} strokeWidth="0.55" strokeOpacity="0.2" fill="none" />
      <path d="M 650 442 Q 632 450 620 444" stroke={c} strokeWidth="0.5" strokeOpacity="0.18" fill="none" />
      <path d="M 650 442 Q 638 452 628 442 Q 640 436 650 442 Z" stroke={c} strokeWidth="0.48" strokeOpacity="0.22" fill="none" />
      <path d="M 648 410 Q 630 420 616 414" stroke={c} strokeWidth="0.48" strokeOpacity="0.16" fill="none" />
      <path d="M 648 410 Q 634 422 622 412 Q 636 404 648 410 Z" stroke={c} strokeWidth="0.45" strokeOpacity="0.18" fill="none" />

      {/* ══════════════════════════════════ DRESS FORM ══════════════════════════ */}
      {/* Neck */}
      <path d="M 194 84 Q 191 68 193 54 L 210 49 L 227 54 Q 229 68 226 84"
        stroke={c} strokeWidth="1.5" strokeOpacity="0.72" fill="none" />
      {/* Shoulder yoke */}
      <path d="M 161 104 Q 175 86 194 84 L 226 84 Q 245 86 259 104"
        stroke={c} strokeWidth="1.8" strokeOpacity="0.75" fill="none" />
      {/* Armhole curves */}
      <path d="M 161 104 Q 142 124 140 155 Q 138 172 148 186"
        stroke={c} strokeWidth="1.6" strokeOpacity="0.7" fill="none" />
      <path d="M 259 104 Q 278 124 280 155 Q 282 172 272 186"
        stroke={c} strokeWidth="1.6" strokeOpacity="0.7" fill="none" />
      {/* Bust curves */}
      <path d="M 148 186 Q 137 198 134 214 Q 130 230 136 244"
        stroke={c} strokeWidth="1.7" strokeOpacity="0.72" fill="none" />
      <path d="M 272 186 Q 283 198 286 214 Q 290 230 284 244"
        stroke={c} strokeWidth="1.7" strokeOpacity="0.72" fill="none" />
      {/* Waist narrow */}
      <path d="M 136 244 Q 128 256 130 272 Q 131 286 138 298"
        stroke={c} strokeWidth="1.6" strokeOpacity="0.68" fill="none" />
      <path d="M 284 244 Q 292 256 290 272 Q 289 286 282 298"
        stroke={c} strokeWidth="1.6" strokeOpacity="0.68" fill="none" />
      {/* Hip flare */}
      <path d="M 138 298 Q 124 318 120 340 Q 116 360 120 376"
        stroke={c} strokeWidth="1.8" strokeOpacity="0.72" fill="none" />
      <path d="M 282 298 Q 296 318 300 340 Q 304 360 300 376"
        stroke={c} strokeWidth="1.8" strokeOpacity="0.72" fill="none" />
      {/* Hem of form */}
      <path d="M 120 376 Q 210 388 300 376"
        stroke={c} strokeWidth="1.4" strokeOpacity="0.65" fill="none" />

      {/* Construction guidelines */}
      <line x1="210" y1="54" x2="210" y2="380" stroke={c} strokeWidth="0.6" strokeOpacity="0.2" strokeDasharray="5 7" />
      <path d="M 134 214 Q 210 226 286 214" stroke={c} strokeWidth="0.6" strokeOpacity="0.2" strokeDasharray="6 6" />
      <path d="M 130 272 Q 210 282 290 272" stroke={c} strokeWidth="0.6" strokeOpacity="0.2" strokeDasharray="6 6" />
      <path d="M 120 340 Q 210 350 300 340" stroke={c} strokeWidth="0.6" strokeOpacity="0.2" strokeDasharray="6 6" />
      {/* Princess seams */}
      <path d="M 180 104 Q 172 190 164 300" stroke={c} strokeWidth="0.55" strokeOpacity="0.16" strokeDasharray="4 8" fill="none" />
      <path d="M 240 104 Q 248 190 256 300" stroke={c} strokeWidth="0.55" strokeOpacity="0.16" strokeDasharray="4 8" fill="none" />

      {/* ── STAND ── */}
      <line x1="210" y1="380" x2="210" y2="452" stroke={c} strokeWidth="4.5" strokeOpacity="0.52" strokeLinecap="round" />
      <ellipse cx="210" cy="460" rx="74" ry="17" stroke={c} strokeWidth="1.7" strokeOpacity="0.56" fill="none" />
      <ellipse cx="210" cy="468" rx="74" ry="17" stroke={c} strokeWidth="1.1" strokeOpacity="0.36" fill="none" />
      <ellipse cx="210" cy="455" rx="26" ry="7" stroke={c} strokeWidth="0.9" strokeOpacity="0.38" fill="none" />

      {/* ══════════════════════════════════ GOWN ON FORM ══════════════════════ */}
      {/* Gown body — subtle fill */}
      <path d="M 120 376 Q 70 422 46 476 L 374 476 Q 350 422 300 376 Z" fill="url(#daw-gownFill)" />
      {/* Skirt silhouette edges */}
      <path d="M 120 376 Q 70 422 46 476" stroke={c} strokeWidth="1.4" strokeOpacity="0.46" fill="none" />
      <path d="M 300 376 Q 350 422 374 476" stroke={c} strokeWidth="1.4" strokeOpacity="0.46" fill="none" />
      {/* Hem */}
      <path d="M 46 476 Q 210 492 374 476" stroke={c} strokeWidth="1.3" strokeOpacity="0.42" fill="none" />
      {/* Hem ruffle layer */}
      <path d="M 52 466 Q 210 480 368 466 Q 210 488 52 466 Z" stroke={c} strokeWidth="0.7" strokeOpacity="0.28" fill={c} fillOpacity="0.018" />
      {/* Fabric fold lines */}
      <path d="M 160 384 Q 128 438 116 476" stroke={c} strokeWidth="0.52" strokeOpacity="0.2" fill="none" />
      <path d="M 184 382 Q 162 446 156 476" stroke={c} strokeWidth="0.45" strokeOpacity="0.16" fill="none" />
      <path d="M 210 386 Q 208 448 206 476" stroke={c} strokeWidth="0.42" strokeOpacity="0.14" fill="none" />
      <path d="M 236 382 Q 258 446 264 476" stroke={c} strokeWidth="0.45" strokeOpacity="0.16" fill="none" />
      <path d="M 260 384 Q 292 438 304 476" stroke={c} strokeWidth="0.52" strokeOpacity="0.2" fill="none" />

      {/* ── SWEETHEART NECKLINE ON GOWN ── */}
      <path d="M 148 186 Q 160 174 178 172 Q 195 172 210 180 Q 225 172 242 172 Q 260 174 272 186"
        stroke={c} strokeWidth="1" strokeOpacity="0.42" fill="none" />

      {/* ══════════════════ BOTANICAL EMBROIDERY ON GOWN ══════════════════════ */}
      {/* Central rose on bodice */}
      {[0,40,80,120,160,200,240,280,320].map((a,i) => (
        <path key={`br${i}`}
          d={`M 210 220 C 207 213 207 203 210 200 C 213 203 213 213 210 220 Z`}
          stroke={c} strokeWidth="0.85" strokeOpacity="0.52" fill="none"
          transform={`rotate(${a}, 210, 220)`} />
      ))}
      <circle cx="210" cy="220" r="6.5" stroke={c} strokeWidth="0.9" strokeOpacity="0.58" fill="none" />
      <circle cx="210" cy="220" r="3" fill={c} fillOpacity="0.3" />
      {/* Vine from bodice to skirt */}
      <path d="M 210 232 Q 194 265 188 308 Q 184 344 186 376" stroke={c} strokeWidth="0.7" strokeOpacity="0.32" fill="none" />
      <path d="M 210 232 Q 226 265 232 308 Q 236 344 234 376" stroke={c} strokeWidth="0.7" strokeOpacity="0.32" fill="none" />
      {/* Leaf pairs along vine */}
      <path d="M 190 272 Q 176 264 171 272 Q 179 280 190 272 Z" stroke={c} strokeWidth="0.6" strokeOpacity="0.3" fill="none" />
      <path d="M 230 272 Q 244 264 249 272 Q 241 280 230 272 Z" stroke={c} strokeWidth="0.6" strokeOpacity="0.3" fill="none" />
      <path d="M 186 346 Q 171 338 166 346 Q 174 354 186 346 Z" stroke={c} strokeWidth="0.55" strokeOpacity="0.26" fill="none" />
      <path d="M 234 346 Q 249 338 254 346 Q 246 354 234 346 Z" stroke={c} strokeWidth="0.55" strokeOpacity="0.26" fill="none" />
      {/* Small roses on vines */}
      {[0,45,90,135,180,225,270,315].map((a,i) => (
        <path key={`vr1${i}`}
          d={`M 188 308 C 186 304 186 299 188 297 C 190 299 190 304 188 308 Z`}
          stroke={c} strokeWidth="0.6" strokeOpacity="0.38" fill="none"
          transform={`rotate(${a}, 188, 308)`} />
      ))}
      {[0,45,90,135,180,225,270,315].map((a,i) => (
        <path key={`vr2${i}`}
          d={`M 232 308 C 230 304 230 299 232 297 C 234 299 234 304 232 308 Z`}
          stroke={c} strokeWidth="0.6" strokeOpacity="0.38" fill="none"
          transform={`rotate(${a}, 232, 308)`} />
      ))}
      {/* Scattered small florals on skirt */}
      {([[128,426],[168,448],[210,460],[252,448],[292,426]] as [number,number][]).map(([fx,fy],i) => (
        <g key={`sf${i}`}>
          {[0,72,144,216,288].map((a,j) => (
            <path key={j}
              d={`M ${fx} ${fy} C ${fx-3.5} ${fy-4} ${fx-2.5} ${fy-11} ${fx} ${fy-13} C ${fx+2.5} ${fy-11} ${fx+3.5} ${fy-4} ${fx} ${fy} Z`}
              stroke={c} strokeWidth="0.68" strokeOpacity="0.32" fill="none"
              transform={`rotate(${a}, ${fx}, ${fy})`} />
          ))}
          <circle cx={fx} cy={fy} r="2.5" stroke={c} strokeWidth="0.52" strokeOpacity="0.4" fill="none" />
        </g>
      ))}
      {/* Waist bead-line on gown */}
      {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
        <circle key={`wb${i}`} cx={130 + i*16} cy={295} r="1.5"
          fill={c} fillOpacity={0.35 - i*0.02} />
      ))}
      {/* Construction pins on gown */}
      {([[152,390,18],[210,384,0],[268,390,-18]] as [number,number,number][]).map(([px,py,pr],i) => (
        <g key={`pin${i}`} transform={`rotate(${pr}, ${px}, ${py})`}>
          <line x1={px} y1={py} x2={px} y2={py+20} stroke={c} strokeWidth="0.9" strokeOpacity="0.48" />
          <circle cx={px} cy={py} r="2.8" fill={c} fillOpacity="0.58" />
          <line x1={px-1.2} y1={py+18} x2={px+1.2} y2={py+22} stroke={c} strokeWidth="1.3" strokeOpacity="0.42" />
        </g>
      ))}

      {/* ══════════════════════════════ DESIGNER FIGURE ═══════════════════════ */}
      {/* Candle / atelier lamp */}
      <line x1="538" y1="56" x2="538" y2="90" stroke="#FCD34D" strokeWidth="2" strokeOpacity="0.52" />
      <path d="M 532 56 Q 538 44 544 56" stroke="#FCD34D" strokeWidth="1.5" strokeOpacity="0.72"
        fill="#FCD34D" fillOpacity="0.28" />
      <rect x="531" y="90" width="14" height="26" rx="2.5" stroke={c} strokeWidth="1" strokeOpacity="0.5" fill="none" />
      <circle cx="538" cy="68" r="32" stroke="#FCD34D" strokeWidth="0.5" strokeOpacity="0.18" fill="none" />
      <circle cx="538" cy="68" r="18" stroke="#FCD34D" strokeWidth="0.4" strokeOpacity="0.12" fill="none" />

      {/* HEAD — profile, facing left toward dress form */}
      <path d="M 490 75 Q 504 64 520 67 Q 538 71 542 86 Q 546 100 540 113 Q 533 125 518 128 Q 503 130 491 121 Q 480 112 478 98 Q 476 85 490 75 Z"
        stroke={c} strokeWidth="1.7" strokeOpacity="0.72" fill="none" />
      {/* BUN — chignon at back of head */}
      <path d="M 488 83 Q 477 70 471 75 Q 464 81 468 92 Q 472 101 482 98"
        stroke={c} strokeWidth="1.3" strokeOpacity="0.58" fill="none" />
      <path d="M 482 80 Q 474 68 468 72 Q 462 77 466 86"
        stroke={c} strokeWidth="1" strokeOpacity="0.42" fill="none" />
      <path d="M 476 80 Q 472 74 468 77" stroke={c} strokeWidth="0.8" strokeOpacity="0.38" fill="none" />
      {/* Hair strands from crown */}
      <path d="M 490 75 Q 482 67 475 70" stroke={c} strokeWidth="0.7" strokeOpacity="0.44" fill="none" />
      <path d="M 497 70 Q 490 63 483 66" stroke={c} strokeWidth="0.68" strokeOpacity="0.4" fill="none" />
      <path d="M 506 67 Q 500 60 494 63" stroke={c} strokeWidth="0.65" strokeOpacity="0.36" fill="none" />
      {/* Hairpin */}
      <path d="M 474 77 Q 476 71 480 74" stroke={c} strokeWidth="1.3" strokeOpacity="0.65" fill="none" strokeLinecap="round" />
      <circle cx="481" cy="74" r="2.2" fill={c} fillOpacity="0.55" />

      {/* SPECTACLES — fine wire frames, profile view */}
      <ellipse cx="502" cy="96" rx="7.5" ry="5.8" stroke={c} strokeWidth="1.1" strokeOpacity="0.72" fill="none" />
      <ellipse cx="518" cy="94" rx="7" ry="5.4" stroke={c} strokeWidth="1.1" strokeOpacity="0.58" fill="none" />
      <line x1="509.5" y1="95" x2="511" y2="94" stroke={c} strokeWidth="1" strokeOpacity="0.65" />
      <line x1="494.5" y1="95" x2="486" y2="93" stroke={c} strokeWidth="0.9" strokeOpacity="0.52" />
      <line x1="525" y1="93" x2="533" y2="91" stroke={c} strokeWidth="0.8" strokeOpacity="0.4" />

      {/* NOSE — subtle profile bridge */}
      <path d="M 490 98 Q 485 102 486 108 Q 487 113 491 114"
        stroke={c} strokeWidth="0.9" strokeOpacity="0.4" fill="none" />
      {/* LIPS */}
      <path d="M 486 118 Q 491 115 495 117 Q 491 121 486 118 Z"
        stroke={c} strokeWidth="0.7" strokeOpacity="0.34" fill="none" />
      {/* EAR */}
      <path d="M 526 90 Q 533 90 534 98 Q 533 107 526 108"
        stroke={c} strokeWidth="1.1" strokeOpacity="0.5" fill="none" />

      {/* NECK */}
      <path d="M 492 128 Q 488 136 486 150 Q 485 160 488 168"
        stroke={c} strokeWidth="1.5" strokeOpacity="0.62" fill="none" />
      <path d="M 518 126 Q 522 136 524 150 Q 525 160 522 168"
        stroke={c} strokeWidth="1.5" strokeOpacity="0.62" fill="none" />

      {/* JACKET — profile, seated */}
      {/* Right shoulder (away side) */}
      <path d="M 522 168 Q 544 175 560 192 Q 570 203 568 224 Q 566 248 562 276"
        stroke={c} strokeWidth="1.8" strokeOpacity="0.65" fill="none" />
      {/* Left shoulder (near side, arm extends toward mannequin) */}
      <path d="M 488 168 Q 468 176 455 194 Q 442 212 434 235 Q 426 258 424 284"
        stroke={c} strokeWidth="1.9" strokeOpacity="0.7" fill="none" />
      {/* Jacket body */}
      <path d="M 424 284 Q 432 308 438 336 Q 443 358 441 378"
        stroke={c} strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
      <path d="M 562 276 Q 558 304 552 330 Q 547 354 548 378"
        stroke={c} strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
      <path d="M 441 378 Q 488 386 548 378"
        stroke={c} strokeWidth="1.3" strokeOpacity="0.55" fill="none" />
      {/* Jacket lapel */}
      <path d="M 488 168 Q 497 177 505 167 Q 510 158 506 150"
        stroke={c} strokeWidth="1.1" strokeOpacity="0.54" fill="none" />
      {/* Jacket back collar */}
      <path d="M 522 168 Q 530 162 534 155"
        stroke={c} strokeWidth="0.9" strokeOpacity="0.42" fill="none" />
      {/* Buttons */}
      <circle cx="490" cy="240" r="2.8" stroke={c} strokeWidth="0.8" strokeOpacity="0.44" fill="none" />
      <circle cx="490" cy="262" r="2.8" stroke={c} strokeWidth="0.8" strokeOpacity="0.4" fill="none" />
      <circle cx="490" cy="284" r="2.8" stroke={c} strokeWidth="0.8" strokeOpacity="0.36" fill="none" />
      {/* Breast pocket */}
      <path d="M 542 210 L 558 207 L 558 222 L 542 225 Z"
        stroke={c} strokeWidth="0.75" strokeOpacity="0.32" fill="none" />

      {/* ── EXTENDED LEFT ARM — with needle ── */}
      {/* Upper arm */}
      <path d="M 455 194 Q 432 208 410 224 Q 390 238 370 250"
        stroke={c} strokeWidth="1.8" strokeOpacity="0.68" fill="none" />
      {/* Forearm pointing toward gown */}
      <path d="M 370 250 Q 348 256 328 260 Q 308 262 288 262"
        stroke={c} strokeWidth="1.65" strokeOpacity="0.64" fill="none" />
      {/* Wrist & hand */}
      <path d="M 288 262 Q 278 259 270 257 Q 264 257 260 260"
        stroke={c} strokeWidth="1.35" strokeOpacity="0.6" fill="none" />
      {/* Cuff detail */}
      <path d="M 294 262 Q 292 270 288 274"
        stroke={c} strokeWidth="1" strokeOpacity="0.42" fill="none" />
      <line x1="302" y1="264" x2="296" y2="270" stroke={c} strokeWidth="0.7" strokeOpacity="0.35" />

      {/* NEEDLE held between fingers */}
      <g transform="rotate(-10, 258, 260)">
        <rect x="253.5" y="254" width="3.8" height="42" rx="1.9" fill={c} fillOpacity="0.68" />
        <ellipse cx="255.4" cy="263" rx="2.2" ry="3.2" fill="none" stroke={c} strokeWidth="1" strokeOpacity="0.88" />
        <path d="M 253.5 296 L 255.4 310 L 257.3 296 Z" fill={c} fillOpacity="0.82" />
      </g>

      {/* THREAD ARC — dashed thread from needle to gown bodice */}
      <path d="M 253 310 Q 242 322 236 332 Q 228 344 222 340"
        stroke={c} strokeWidth="1.1" strokeOpacity="0.55" fill="none" strokeDasharray="3 4" />
      {/* Secondary decorative thread loop */}
      <path d="M 254 307 Q 244 293 238 285 Q 230 278 225 281"
        stroke={c} strokeWidth="0.85" strokeOpacity="0.38" fill="none" strokeDasharray="2 5" />
      {/* Thread coming from spool */}
      <path d="M 398 455 Q 382 438 366 426 Q 350 414 336 408 Q 316 398 296 394 Q 276 390 262 388"
        stroke={c} strokeWidth="0.75" strokeOpacity="0.28" fill="none" strokeDasharray="2 4" />

      {/* ── STOOL — designer seated ── */}
      <ellipse cx="494" cy="388" rx="54" ry="15" stroke={c} strokeWidth="1.3" strokeOpacity="0.52" fill="none" />
      <line x1="454" y1="392" x2="446" y2="452" stroke={c} strokeWidth="1.2" strokeOpacity="0.42" />
      <line x1="534" y1="392" x2="542" y2="452" stroke={c} strokeWidth="1.2" strokeOpacity="0.42" />
      <line x1="494" y1="403" x2="494" y2="452" stroke={c} strokeWidth="1.1" strokeOpacity="0.38" />
      <line x1="446" y1="432" x2="542" y2="432" stroke={c} strokeWidth="0.9" strokeOpacity="0.34" />

      {/* LEGS — feet visible below stool */}
      <path d="M 441 378 Q 438 404 436 430 Q 434 446 432 458"
        stroke={c} strokeWidth="1.4" strokeOpacity="0.52" fill="none" />
      <path d="M 432 458 Q 422 462 416 466" stroke={c} strokeWidth="1.2" strokeOpacity="0.46" fill="none" />
      <path d="M 510 378 Q 514 404 516 430 Q 518 446 522 458"
        stroke={c} strokeWidth="1.4" strokeOpacity="0.52" fill="none" />
      <path d="M 522 458 Q 530 462 538 466" stroke={c} strokeWidth="1.2" strokeOpacity="0.46" fill="none" />

      {/* ── WORKSHOP TOOLS ── */}
      {/* Thread spool near stool base */}
      <ellipse cx="402" cy="458" rx="20" ry="9" stroke={c} strokeWidth="1.1" strokeOpacity="0.46" fill="none" />
      <ellipse cx="402" cy="465" rx="20" ry="9" stroke={c} strokeWidth="1.1" strokeOpacity="0.43" fill="none" />
      <line x1="382" y1="458" x2="382" y2="465" stroke={c} strokeWidth="0.9" strokeOpacity="0.4" />
      <line x1="422" y1="458" x2="422" y2="465" stroke={c} strokeWidth="0.9" strokeOpacity="0.4" />
      {/* Thread cross-winds on spool */}
      <line x1="385" y1="460" x2="419" y2="462" stroke={c} strokeWidth="0.5" strokeOpacity="0.28" />
      <line x1="386" y1="463" x2="418" y2="461" stroke={c} strokeWidth="0.5" strokeOpacity="0.22" />

      {/* Scissors */}
      <g transform="translate(576, 408) rotate(35)">
        <path d="M 0 0 Q 5 -9 18 -28" stroke={c} strokeWidth="1.4" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
        <path d="M 0 0 Q -5 -9 -18 -28" stroke={c} strokeWidth="1.4" strokeOpacity="0.5" fill="none" strokeLinecap="round" />
        <circle cx="0" cy="0" r="4" stroke={c} strokeWidth="1.1" strokeOpacity="0.58" fill="none" />
        <ellipse cx="9" cy="16" rx="6.5" ry="10" stroke={c} strokeWidth="1.1" strokeOpacity="0.44" fill="none" />
        <ellipse cx="-9" cy="16" rx="6.5" ry="10" stroke={c} strokeWidth="1.1" strokeOpacity="0.44" fill="none" />
      </g>

      {/* Thimble */}
      <path d="M 598 432 Q 598 420 604 416 Q 610 411 616 416 Q 622 420 622 432 Q 616 438 610 439 Q 604 438 598 432 Z"
        stroke={c} strokeWidth="1" strokeOpacity="0.44" fill="none" />
      {[0,36,72,108,144,180,216,252,288,324].map((a,i) => (
        <circle key={`th${i}`}
          cx={610 + 8*Math.cos((a-90)*Math.PI/180)} cy={422 + 8*Math.sin((a-90)*Math.PI/180)}
          r="1.4" stroke={c} strokeWidth="0.55" strokeOpacity="0.36" fill="none" />
      ))}

      {/* ── SIGNATURE ── */}
      <text x="332" y="14" fontSize="8.5" textAnchor="middle" fill={c} fillOpacity="0.26"
        fontFamily="'Cormorant Garamond', serif" fontStyle="italic" letterSpacing="4">
        l'atelier de couture
      </text>
      <line x1="260" y1="17" x2="296" y2="17" stroke={c} strokeWidth="0.4" strokeOpacity="0.18" />
      <line x1="368" y1="17" x2="404" y2="17" stroke={c} strokeWidth="0.4" strokeOpacity="0.18" />

    </svg>
  );
}

// ── Mannequin / dressform watermark ─────────────────────────────────────────
function MannequinWatermark({ accent = "#C084FC" }: { accent?: string }) {
  const c = accent;
  return (
    <svg width="520" height="780" viewBox="0 0 520 780" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ── DRESS FORM SILHOUETTE ── */}
      {/* Neck / collar stand */}
      <path d="M 232 38 Q 228 24 230 14 L 260 10 L 290 14 Q 292 24 288 38"
        stroke={c} strokeWidth="1.8" fill="none" strokeOpacity="0.7" />
      {/* Shoulder yoke */}
      <path d="M 200 62 Q 216 44 232 38 L 288 38 Q 304 44 320 62"
        stroke={c} strokeWidth="2" fill="none" strokeOpacity="0.72" />
      {/* Armhole curves */}
      <path d="M 200 62 Q 178 82 176 118 Q 175 138 185 154"
        stroke={c} strokeWidth="1.8" fill="none" strokeOpacity="0.7" />
      <path d="M 320 62 Q 342 82 344 118 Q 345 138 335 154"
        stroke={c} strokeWidth="1.8" fill="none" strokeOpacity="0.7" />
      {/* Bust */}
      <path d="M 185 154 Q 172 166 168 185 Q 164 204 170 218"
        stroke={c} strokeWidth="1.9" fill="none" strokeOpacity="0.72" />
      <path d="M 335 154 Q 348 166 352 185 Q 356 204 350 218"
        stroke={c} strokeWidth="1.9" fill="none" strokeOpacity="0.72" />
      {/* Waist narrow */}
      <path d="M 170 218 Q 162 232 164 248 Q 165 264 172 276"
        stroke={c} strokeWidth="1.8" fill="none" strokeOpacity="0.7" />
      <path d="M 350 218 Q 358 232 356 248 Q 355 264 348 276"
        stroke={c} strokeWidth="1.8" fill="none" strokeOpacity="0.7" />
      {/* Hip flare */}
      <path d="M 172 276 Q 158 295 152 318 Q 146 340 150 360"
        stroke={c} strokeWidth="2" fill="none" strokeOpacity="0.72" />
      <path d="M 348 276 Q 362 295 368 318 Q 374 340 370 360"
        stroke={c} strokeWidth="2" fill="none" strokeOpacity="0.72" />
      {/* Bottom hem line */}
      <path d="M 150 360 Q 260 372 370 360"
        stroke={c} strokeWidth="1.6" fill="none" strokeOpacity="0.65" />

      {/* ── INTERNAL CONSTRUCTION LINES ── */}
      {/* Centre front line */}
      <line x1="260" y1="14" x2="260" y2="365" stroke={c} strokeWidth="0.7" strokeOpacity="0.3" strokeDasharray="5 7" />
      {/* Bust line */}
      <path d="M 172 185 Q 260 196 348 185" stroke={c} strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="6 6" />
      {/* Waist line */}
      <path d="M 166 248 Q 260 258 354 248" stroke={c} strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="6 6" />
      {/* Hip line */}
      <path d="M 152 318 Q 260 328 368 318" stroke={c} strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="6 6" />
      {/* Princess seam left */}
      <path d="M 192 62 Q 185 140 178 200 Q 172 260 164 320"
        stroke={c} strokeWidth="0.65" strokeOpacity="0.28" strokeDasharray="4 8" />
      {/* Princess seam right */}
      <path d="M 328 62 Q 335 140 342 200 Q 348 260 356 320"
        stroke={c} strokeWidth="0.65" strokeOpacity="0.28" strokeDasharray="4 8" />

      {/* ── STAND / PEDESTAL ── */}
      <line x1="260" y1="365" x2="260" y2="480" stroke={c} strokeWidth="4" strokeOpacity="0.55" strokeLinecap="round" />
      {/* Base disk */}
      <ellipse cx="260" cy="490" rx="95" ry="22" stroke={c} strokeWidth="1.8" strokeOpacity="0.58" fill="none" />
      <ellipse cx="260" cy="498" rx="95" ry="22" stroke={c} strokeWidth="1.2" strokeOpacity="0.38" fill="none" />
      <ellipse cx="260" cy="485" rx="28" ry="8" stroke={c} strokeWidth="1" strokeOpacity="0.42" fill="none" />

      {/* ── DRESS BEING STITCHED ── */}
      {/* Partially draped skirt — flowing fabric from hem of form */}
      <path d="M 150 360 Q 100 400 72 460 Q 50 510 55 550"
        stroke={c} strokeWidth="1.5" strokeOpacity="0.52" fill="none" />
      <path d="M 370 360 Q 420 400 448 460 Q 470 510 465 550"
        stroke={c} strokeWidth="1.5" strokeOpacity="0.52" fill="none" />
      <path d="M 55 550 Q 160 574 260 570 Q 360 574 465 550"
        stroke={c} strokeWidth="1.4" strokeOpacity="0.48" fill="none" />
      {/* Fabric fold lines on skirt */}
      <path d="M 190 370 Q 155 430 140 495" stroke={c} strokeWidth="0.7" strokeOpacity="0.28" fill="none" />
      <path d="M 220 368 Q 200 440 195 510" stroke={c} strokeWidth="0.6" strokeOpacity="0.22" fill="none" />
      <path d="M 260 370 Q 258 445 255 515" stroke={c} strokeWidth="0.55" strokeOpacity="0.2" fill="none" />
      <path d="M 300 368 Q 320 440 325 510" stroke={c} strokeWidth="0.6" strokeOpacity="0.22" fill="none" />
      <path d="M 330 370 Q 365 430 380 495" stroke={c} strokeWidth="0.7" strokeOpacity="0.28" fill="none" />

      {/* ── STITCHING NEEDLE & THREAD ── */}
      {/* Thread path — elegant arc coming from upper left */}
      <path d="M 88 120 Q 130 80 165 98 Q 180 106 178 130 Q 175 160 185 185"
        stroke={c} strokeWidth="1" strokeOpacity="0.55" fill="none" strokeDasharray="3 4" />
      {/* Needle */}
      <g transform="rotate(-35, 88, 120)">
        <rect x="84" y="90" width="4" height="46" rx="2" fill={c} fillOpacity="0.68" />
        {/* Eye of needle */}
        <ellipse cx="86" cy="100" rx="2.5" ry="3.5" fill="none" stroke={c} strokeWidth="1" strokeOpacity="0.8" />
        {/* Needle point */}
        <path d="M 84 136 L 86 148 L 88 136 Z" fill={c} fillOpacity="0.8" />
      </g>
      {/* Second thread arc showing stitching pattern */}
      <path d="M 335 90 Q 350 110 342 138 Q 334 165 340 192"
        stroke={c} strokeWidth="0.88" strokeOpacity="0.42" fill="none" strokeDasharray="2 5" />

      {/* ── MEASURING TAPE draped over shoulder ── */}
      {/* Tape from left shoulder, draping down */}
      <path d="M 195 80 Q 210 120 218 170 Q 225 218 222 260"
        stroke={c} strokeWidth="2.5" strokeOpacity="0.32" fill="none" strokeLinecap="round" />
      {/* Tape tick marks */}
      {Array.from({length: 10}).map((_,i) => {
        const t = i / 9;
        // Approximate points along the tape path
        const x = 195 + t * 27;
        const y = 80 + t * 180;
        return (
          <line key={i} x1={x-4} y1={y} x2={x+4} y2={y}
            stroke={c} strokeWidth="0.8" strokeOpacity="0.4" />
        );
      })}

      {/* ── DECORATIVE BOTANICAL around form — very light ── */}
      {/* Left side small leaf cluster */}
      <path d="M 145 220 Q 120 210 112 222 Q 122 232 145 228 Z"
        stroke={c} strokeWidth="0.8" strokeOpacity="0.32" fill="none" />
      <path d="M 145 235 Q 118 228 110 242 Q 122 248 145 242 Z"
        stroke={c} strokeWidth="0.7" strokeOpacity="0.28" fill="none" />
      {/* Right side small leaf cluster */}
      <path d="M 375 220 Q 400 210 408 222 Q 398 232 375 228 Z"
        stroke={c} strokeWidth="0.8" strokeOpacity="0.32" fill="none" />
      <path d="M 375 235 Q 402 228 410 242 Q 398 248 375 242 Z"
        stroke={c} strokeWidth="0.7" strokeOpacity="0.28" fill="none" />
      {/* Small rose at neckline */}
      {[0,40,80,120,160,200,240,280,320].map((a,i) => (
        <path key={i}
          d={`M 260 28 C 258 23 258 17 260 15 C 262 17 262 23 260 28 Z`}
          stroke={c} strokeWidth="0.8" strokeOpacity="0.45" fill="none"
          transform={`rotate(${a}, 260, 28)`} />
      ))}
      <circle cx="260" cy="28" r="3" stroke={c} strokeWidth="0.65" strokeOpacity="0.52" fill="none" />

      {/* ── EMBROIDERY PATTERN on dress being stitched ── */}
      {/* Scattered small flowers on the draped skirt */}
      {([[90, 440, 5],[140, 490, 4.5],[200, 530, 4],[260, 545, 5],[320, 530, 4],[380, 490, 4.5],[430, 440, 5]] as [number,number,number][]).map(([fx,fy,fr],i) => (
        <g key={`mf${i}`}>
          {[0,72,144,216,288].map((a,j) => (
            <path key={j}
              d={`M ${fx} ${fy} C ${fx-fr*0.35} ${fy-fr*0.45} ${fx-fr*0.25} ${fy-fr*1.25} ${fx} ${fy-fr*1.5} C ${fx+fr*0.25} ${fy-fr*1.25} ${fx+fr*0.35} ${fy-fr*0.45} ${fx} ${fy} Z`}
              stroke={c} strokeWidth="0.8" strokeOpacity="0.38" fill="none"
              transform={`rotate(${a}, ${fx}, ${fy})`} />
          ))}
          <circle cx={fx} cy={fy} r={fr*0.35} stroke={c} strokeWidth="0.6" strokeOpacity="0.45" fill="none" />
        </g>
      ))}

      {/* ── MONOGRAM / LABEL at waist ── */}
      <text x="260" y="256" fontSize="10" textAnchor="middle" fill={c} fillOpacity="0.38"
        fontFamily="'Cormorant Garamond', serif" fontStyle="italic" letterSpacing="4">
        atelier
      </text>
      <line x1="216" y1="260" x2="244" y2="260" stroke={c} strokeWidth="0.5" strokeOpacity="0.28" />
      <line x1="276" y1="260" x2="304" y2="260" stroke={c} strokeWidth="0.5" strokeOpacity="0.28" />
    </svg>
  );
}

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
];

type Stage = "sketch" | "color" | "model";

// Map imageSet + stage → real JPEG path
// Sets 1-3 use images 1-9, sets 4-6 use images 10-18
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
        .g-card { transition: transform 0.4s ease; }
        .g-card:hover { transform: translateY(-6px); }
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

      {/* HERO — full-bleed craftsman background */}
      <header style={{ position: "relative", overflow: "hidden", minHeight: 680 }}>
        <style>{`
          @keyframes fadeUpG { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
          @keyframes heroScale { from{transform:scale(1.06)} to{transform:scale(1.0)} }
        `}</style>

        {/* ── FULL-BLEED BACKGROUND PHOTO ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {/* The photo — fills the entire header */}
          <img
            src="./designer-watermark.jpg"
            alt=""
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "62% 20%",
              opacity: 0.46,
              mixBlendMode: "luminosity" as const,
              filter: "brightness(0.55) contrast(1.28) saturate(0.25)",
              display: "block",
              animation: "heroScale 3s ease-out both",
            }}
          />
          {/* Layer 1 — overall dark cinema wash */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(13,8,25,0.45)", pointerEvents: "none" }} />
          {/* Layer 2 — strong left vignette so text is always legible */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `linear-gradient(to right, ${BG} 0%, ${BG}F2 18%, ${BG}CC 36%, ${BG}88 54%, ${BG}33 72%, transparent 100%)`,
          }} />
          {/* Layer 3 — top vignette, matches nav */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 200, pointerEvents: "none",
            background: `linear-gradient(to bottom, ${BG} 0%, ${BG}BB 40%, transparent 100%)`,
          }} />
          {/* Layer 4 — bottom dissolve into gallery grid below */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 320, pointerEvents: "none",
            background: `linear-gradient(to bottom, transparent 0%, ${BG}99 55%, ${BG} 100%)`,
          }} />
          {/* Layer 5 — right edge soft fade */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `linear-gradient(to left, ${BG}AA 0%, transparent 28%)`,
          }} />
          {/* Layer 6 — accent purple glow on the photo highlights */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `radial-gradient(ellipse 55% 60% at 72% 45%, ${ACCENT}24, transparent 70%)`,
            mixBlendMode: "screen" as const,
          }} />
        </div>

        {/* ── CONTENT — text floats over photo ── */}
        <div style={{ padding: "88px 72px 110px", maxWidth: 1440, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ animation: "fadeUpG 0.9s ease 0.3s both", maxWidth: 600 }}>
            <p style={{ fontSize: 10, letterSpacing: 7, textTransform: "uppercase", color: ACCENT, marginBottom: 24 }}>Collections & Lookbook</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px,7vw,96px)", fontWeight: 700, lineHeight: 0.9, marginBottom: 36 }}>
              The<br /><em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.35)" }}>Atelier</em><br />Gallery
            </h1>
            <p style={{ maxWidth: 380, fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 44 }}>
              Watch each design come to life — from initial AI sketch to full colour rendering to runway presentation, without a single sample sewn.
            </p>
            {/* Stage legend */}
            <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
              {[["✏️","Sketch"],["🎨","Colour"],["👗","Runway"]].map(([icon, label]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 15 }}>{icon}</span>
                  <span style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* GALLERY GRID */}
      <section style={{ padding: "72px 72px 120px", maxWidth: 1440, margin: "0 auto", position: "relative" }}>
        {/* Craftsman photo — ultra-faint ghost watermark behind the grid */}
        <div style={{
          position: "absolute", right: "-4%", top: "50%",
          transform: "translateY(-50%)",
          width: 520, height: 820,
          pointerEvents: "none", zIndex: 0, overflow: "hidden",
        }}>
          <img
            src="./designer-watermark.jpg"
            alt=""
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "50% 25%",
              opacity: 0.072,
              mixBlendMode: "luminosity" as const,
              filter: "brightness(0.9) contrast(1.1) saturate(0.2)",
              display: "block",
            }}
          />
          {/* Fade all edges into background */}
          <div style={{
            position: "absolute", inset: 0,
            background: `
              radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, ${BG}CC 70%, ${BG} 100%),
              linear-gradient(to right,  ${BG} 0%, transparent 20%, transparent 80%, ${BG} 100%),
              linear-gradient(to bottom, ${BG} 0%, transparent 15%, transparent 85%, ${BG} 100%)
            `,
            pointerEvents: "none",
          }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
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
          style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "18px 52px", background: "rgba(255,255,255,0.95)", color: "#0a0a0a", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, textDecoration: "none", transition: "transform 0.25s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
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
