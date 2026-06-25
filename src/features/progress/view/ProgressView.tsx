import type { HelpRequest } from "@/features/requests/model/RequestModel";
import { useProgressViewModel } from "../viewmodel/useProgressViewModel";
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  request: HelpRequest;
}

export function ProgressView({ request }: Props) {
  const m = useProgressViewModel(request.currentVolunteers, request.targetVolunteers);
  const { t } = useLanguage();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start pb-4">
      {/* Progress & Stats Area (Above Kubo) */}
      <div className="w-full max-w-[420px] flex flex-col gap-1 mb-6 shrink-0 px-2 sm:px-0 mt-2">
        <div className="flex items-center gap-3">
          <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-[#efeae1]">
            <div
              className="absolute top-0 left-0 h-full bg-[#34624b] transition-all duration-1000 ease-out rounded-full"
              style={{ width: m.percentLabel }}
            />
          </div>
          <span className="text-[13px] font-bold text-[#34624b] whitespace-nowrap">
            {m.percentLabel} lifted
          </span>
        </div>
        <div className="flex justify-start px-1 mt-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            {request.currentVolunteers} / {request.targetVolunteers} {t('progress.neighbors')}
          </span>
        </div>
      </div>

      {/* Framed Illustration (Fills the rest) */}
      <div className="relative flex-1 w-full max-w-[420px] overflow-hidden rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-white/60 bg-white/50 backdrop-blur-sm">
        <svg
          viewBox="0 -10 400 350"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-label="Bahay kubo rising with volunteer support"
        >
          <defs>
            <style>
              {`
                @keyframes door-swing {
                  0%, 10% { transform: perspective(400px) rotateY(0deg); }
                  40%, 60% { transform: perspective(400px) rotateY(80deg); }
                  90%, 100% { transform: perspective(400px) rotateY(0deg); }
                }
              `}
            </style>
            <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.90 0.05 220)" />
              <stop offset="100%" stopColor="oklch(0.97 0.02 90)" />
            </linearGradient>
            <linearGradient id="roof" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.55 0.15 50)" />
              <stop offset="100%" stopColor="oklch(0.35 0.12 40)" />
            </linearGradient>
            <linearGradient id="wall" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.85 0.08 85)" />
              <stop offset="100%" stopColor="oklch(0.70 0.10 75)" />
            </linearGradient>
            <linearGradient id="bamboo" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.65 0.14 140)" />
              <stop offset="100%" stopColor="oklch(0.35 0.12 145)" />
            </linearGradient>
            <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Full bleed sky */}
          <rect width="400" height="360" fill="url(#sky)" />

          {/* Subtle Sun */}
          <circle cx="320" cy="80" r="40" fill="white" opacity="0.4" filter="blur(8px)" />
          <circle cx="320" cy="80" r="25" fill="oklch(0.95 0.05 90)" opacity="0.8" />

          {/* Ground */}
          <ellipse cx="200" cy="305" rx="240" ry="18" fill="oklch(0.5 0.08 130)" opacity="0.15" />
          <rect x="0" y="300" width="400" height="60" fill="oklch(0.58 0.09 130)" opacity="0.2" />

          {/* Poles — grow longer as house lifts */}
          {m.poles.map((p, i) => (
            <g key={i} style={{ transition: "all 700ms cubic-bezier(0.22, 1, 0.36, 1)" }}>
              {/* Cast shadow of pole on ground */}
              <ellipse cx={p.x} cy="300" rx="8" ry="3" fill="rgba(0,0,0,0.1)" />
              <rect
                x={p.x - 5}
                y={282 + m.liftPx}
                width="10"
                height={18 - m.liftPx}
                fill="url(#bamboo)"
                rx="3"
              />
              {/* Bamboo joints */}
              {Array.from({ length: 4 }).map((_, j) => {
                const jointY = 282 + m.liftPx + (18 - m.liftPx) * ((j + 1) / 5);
                return (
                  <line
                    key={j}
                    x1={p.x - 6}
                    x2={p.x + 6}
                    y1={jointY}
                    y2={jointY}
                    stroke="oklch(0.25 0.1 145)"
                    strokeWidth="1.5"
                  />
                );
              })}
            </g>
          ))}

          {/* House group — translates upward */}
          <g
            transform={`translate(0, ${m.liftPx + 102})`}
            style={{ transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)" }}
          >
            <g className="animate-sway" filter="url(#drop-shadow)">
              {/* Floor / platform */}
              <rect x="60" y="180" width="280" height="16" fill="oklch(0.40 0.1 60)" rx="4" />
              {/* Bamboo floor edge detail */}
              <line x1="60" x2="340" y1="184" y2="184" stroke="oklch(0.30 0.1 50)" strokeWidth="1" opacity="0.5" />

              {/* Walls */}
              <rect x="90" y="110" width="220" height="72" fill="url(#wall)" rx="2" />
              {/* Sawali pattern (Woven Bamboo Texture) */}
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1={90} x2={310}
                  y1={114 + i * 6} y2={114 + i * 6}
                  stroke="oklch(0.50 0.08 70)" strokeWidth="0.8" opacity="0.4"
                />
              ))}
              {Array.from({ length: 30 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={94 + i * 7.5} x2={94 + i * 7.5}
                  y1={110} y2={180}
                  stroke="oklch(0.50 0.08 70)" strokeWidth="0.8" opacity="0.2"
                />
              ))}

              {/* Left Window (Pink Curtains) */}
              <g transform="translate(108, 130)">
                {/* Dark interior */}
                <rect x="0" y="0" width="46" height="32" fill="oklch(0.15 0.05 40)" rx="1" />
                {/* Pink Curtains */}
                <g className="animate-sway" style={{ transformOrigin: "23px 0px", animationDuration: "5s" }}>
                  {/* Left Curtain */}
                  <path d="M 0,0 L 23,0 Q 15,15 8,26 Q 4,32 0,32 Z" fill="#ff96b4" />
                  {/* Right Curtain */}
                  <path d="M 46,0 L 23,0 Q 31,15 38,26 Q 42,32 46,32 Z" fill="#ff96b4" />
                  {/* Curtain rod */}
                  <line x1="-2" y1="0" x2="48" y2="0" stroke="oklch(0.35 0.1 50)" strokeWidth="1.5" />
                </g>
              </g>

              {/* Right Window (Pink Curtains) */}
              <g transform="translate(246, 130)">
                <rect x="0" y="0" width="46" height="32" fill="oklch(0.15 0.05 40)" rx="1" />
                <g className="animate-sway" style={{ transformOrigin: "23px 0px", animationDuration: "4s", animationDelay: "1s" }}>
                  <path d="M 0,0 L 23,0 Q 15,15 8,26 Q 4,32 0,32 Z" fill="#ff96b4" />
                  <path d="M 46,0 L 23,0 Q 31,15 38,26 Q 42,32 46,32 Z" fill="#ff96b4" />
                  <line x1="-2" y1="0" x2="48" y2="0" stroke="oklch(0.35 0.1 50)" strokeWidth="1.5" />
                </g>
              </g>

              {/* Doorway (Dark interior) */}
              <rect x="175" y="126" width="50" height="54" fill="oklch(0.15 0.05 40)" />
              
              {/* Animating Door */}
              <g style={{ transformOrigin: "175px 153px", animation: "door-swing 6s ease-in-out infinite" }}>
                <rect x="175" y="126" width="50" height="54" fill="url(#wall)" stroke="oklch(0.40 0.1 50)" strokeWidth="1" />
                {/* Door details */}
                <rect x="179" y="130" width="42" height="46" fill="none" stroke="oklch(0.50 0.08 70)" strokeWidth="1" opacity="0.5" />
                <circle cx="218" cy="153" r="2.5" fill="oklch(0.20 0.05 30)" /> 
              </g>

              {/* Bamboo Frame around Doorway */}
              <rect x="173" y="124" width="54" height="56" fill="none" stroke="url(#bamboo)" strokeWidth="4" />

              {/* Roof Cast Shadow on Wall */}
              <polygon points="90,112 310,112 310,120 90,120" fill="rgba(0,0,0,0.15)" />

              {/* Roof (nipa) */}
              <polygon points="70,112 330,112 280,48 120,48" fill="url(#roof)" />
              <polygon points="120,48 280,48 200,20" fill="oklch(0.30 0.12 40)" />

              {/* Roof details (Nipa leaves texture) */}
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={i}
                  x1={80 + i * 5}
                  x2={320 - i * 5}
                  y1={106 - i * 8}
                  y2={106 - i * 8}
                  stroke="oklch(0.25 0.1 35)"
                  strokeWidth="1.2"
                  opacity="0.5"
                />
              ))}

            </g>
          </g>

          {/* Ladder — anchored to ground, top follows rising floor */}
          {(() => {
            // Floor top in SVG coords: house group translateY = m.liftPx + 102, floor y inside group = 180
            const floorY = 180 + m.liftPx + 102; // = 282 + m.liftPx
            const groundY = 300;
            const ladderH = groundY - floorY;
            // Left rail: x=210 at top, x=225 at ground
            // Right rail: x=220 at top, x=235 at ground
            const rungCount = Math.max(2, Math.round(ladderH / 12));
            return (
              <g style={{ transition: "all 800ms cubic-bezier(0.22, 1, 0.36, 1)" }}>
                {/* Left rail */}
                <line x1="210" y1={floorY} x2="225" y2={groundY} stroke="oklch(0.4 0.08 60)" strokeWidth="2" />
                {/* Right rail */}
                <line x1="220" y1={floorY} x2="235" y2={groundY} stroke="oklch(0.4 0.08 60)" strokeWidth="2" />
                {/* Rungs */}
                {Array.from({ length: rungCount }).map((_, i) => {
                  const t = (i + 1) / (rungCount + 1);
                  const y = floorY + t * ladderH;
                  const x1 = 210 + t * 15;
                  const x2 = 220 + t * 15;
                  return (
                    <line
                      key={i}
                      x1={x1} x2={x2}
                      y1={y} y2={y + 2}
                      stroke="oklch(0.4 0.08 60)"
                      strokeWidth="1.6"
                    />
                  );
                })}
              </g>
            );
          })()}

          {/* Tiny neighbors at base */}
          {m.poles.slice(0, request.currentVolunteers).map((p, i) => (
            <g key={`n-${i}`} transform={`translate(${p.x - 6}, 280)`}>
              <circle cx="6" cy="0" r="4" fill="oklch(0.35 0.06 50)" />
              <rect x="2" y="4" width="8" height="12" rx="2" fill="oklch(0.55 0.15 30)" />
            </g>
          ))}
          {m.isComplete && (
            <g className="animate-in fade-in zoom-in duration-1000">
              <rect x="0" y="0" width="400" height="360" fill="rgba(255,255,255,0.7)" />
              <circle cx="200" cy="160" r="60" fill="oklch(0.6 0.15 140)" opacity="0.1" />
              <circle cx="200" cy="160" r="45" fill="oklch(0.6 0.15 140)" />
              <path d="M185 160 L195 170 L215 150" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <text x="200" y="245" textAnchor="middle" fill="oklch(0.35 0.12 145)" fontSize="24" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
                BAYANIHAN COMPLETE!
              </text>
              <text x="200" y="270" textAnchor="middle" fill="oklch(0.45 0.05 145)" fontSize="14" fontWeight="600" fontFamily="sans-serif">
                Salamat sa iyong tulong.
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
