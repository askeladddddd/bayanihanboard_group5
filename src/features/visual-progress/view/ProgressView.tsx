import type { HelpRequest } from "@/features/request-flow/model/RequestModel";
import { useProgressViewModel } from "../viewmodel/useProgressViewModel";
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  request: HelpRequest;
}

export function ProgressView({ request }: Props) {
  const m = useProgressViewModel(request.currentVolunteers, request.targetVolunteers);
  const { t } = useLanguage();

  // Distribute poles across the base width
  const baseWidth = 240;
  const baseLeft = 80;
  const poles = Array.from({ length: m.polesVisible }, (_, i) => ({
    x: m.polesVisible === 1 ? baseLeft + baseWidth / 2 : baseLeft + (i * baseWidth) / (m.polesVisible - 1),
    delay: i * 60,
  }));

  return (
    <div className= "relative overflow-hidden rounded-3xl border bg-card p-6 shadow-[var(--shadow-card)]" >
    <div className="flex items-baseline justify-between" >
      <div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground" >
        {t('progress.title')}
          </p>
          <h3 className="mt-1 font-display text-2xl text-foreground">
            {m.percentLabel} lifted &nbsp;&middot;&nbsp;
  <span className="text-[color:var(--bamboo-deep)]" >
    { request.currentVolunteers } / { request.targetVolunteers }
    </span>
    < span className = "text-base font-normal text-muted-foreground" > {t('progress.neighbors')} </span>
      </h3>
      </div>
  {
    m.isComplete && (
      <span className="rounded-full bg-[color:var(--bamboo)]/15 px-3 py-1 text-xs font-semibold text-[color:var(--bamboo-deep)]" >
        {t('progress.complete')}
    </span>
        )
  }
  </div>

  <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-muted/50 shadow-inner">
    <div 
      className="h-full bg-[color:var(--bamboo-deep)] transition-all duration-700 ease-in-out" 
      style={{ width: m.percentLabel }}
    />
  </div>

    < div className = "relative mt-6 h-[320px] w-full" >
      {/* Sky wash */ }
      < svg
  viewBox = "0 0 400 320"
  className = "absolute inset-0 h-full w-full"
  aria-label="Bahay kubo rising with volunteer support"
    >
    <defs>
    <linearGradient id="sky" x1 = "0" x2 = "0" y1 = "0" y2 = "1" >
      <stop offset="0%" stopColor = "oklch(0.92 0.04 220)" />
        <stop offset="100%" stopColor = "oklch(0.98 0.02 90)" />
          </linearGradient>
          < linearGradient id = "roof" x1 = "0" x2 = "0" y1 = "0" y2 = "1" >
            <stop offset="0%" stopColor = "oklch(0.58 0.14 55)" />
              <stop offset="100%" stopColor = "oklch(0.4 0.12 45)" />
                </linearGradient>
                < linearGradient id = "wall" x1 = "0" x2 = "0" y1 = "0" y2 = "1" >
                  <stop offset="0%" stopColor = "oklch(0.86 0.07 85)" />
                    <stop offset="100%" stopColor = "oklch(0.72 0.09 75)" />
                      </linearGradient>
                      < linearGradient id = "bamboo" x1 = "0" x2 = "0" y1 = "0" y2 = "1" >
                        <stop offset="0%" stopColor = "oklch(0.7 0.13 140)" />
                          <stop offset="100%" stopColor = "oklch(0.38 0.1 145)" />
                            </linearGradient>
                            </defs>

                            < rect width = "400" height = "320" fill = "url(#sky)" />

                              {/* Ground */ }
                              < ellipse cx = "200" cy = "298" rx = "220" ry = "14" fill = "oklch(0.5 0.08 130)" opacity = "0.25" />
                                <rect x="0" y = "296" width = "400" height = "24" fill = "oklch(0.58 0.09 130)" opacity = "0.35" />

                                  {/* Poles — grow longer as house lifts */ }
  {
    poles.map((p, i) => (
      <g key= { i } style = {{ transition: "all 700ms cubic-bezier(0.22, 1, 0.36, 1)" }}>
        <rect
                x={ p.x - 4 }
  y = { 282 + m.liftPx }
  width = "8"
  height = { 18 - m.liftPx }
  fill = "url(#bamboo)"
  rx = "2"
    />
    {/* Bamboo joints */ }
  {
    Array.from({ length: 4 }).map((_, j) => {
      const jointY = 282 + m.liftPx + (18 - m.liftPx) * ((j + 1) / 5);
      return (
      <line
                  key= { j }
                  x1 = { p.x - 5 }
                  x2 = { p.x + 5 }
                  y1 = { jointY }
                  y2 = { jointY }
                  stroke = "oklch(0.28 0.08 145)"
                  strokeWidth = "1.2"
      />
      );
    })
  }
  </g>
          ))
}

{/* House group — translates upward */ }
<g
  transform={`translate(0, ${m.liftPx + 102})`}
  style={{ transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)" }}
>
  <g className="animate-sway">
    {/* Floor / platform */ }
  < rect x = "70" y = "180" width = "260" height = "14" fill = "oklch(0.45 0.08 60)" rx = "2" />
    {/* Walls */ }
    < rect x = "100" y = "110" width = "200" height = "72" fill = "url(#wall)" rx = "3" />
      {/* Sawali pattern */ }
{
  Array.from({ length: 9 }).map((_, i) => (
    <line
                key= { i }
                x1 = { 100}
                x2 = { 300}
                y1 = { 118 + i * 8 }
                y2 = { 118 + i * 8 }
                stroke = "oklch(0.55 0.08 70)"
                strokeWidth = "0.6"
                opacity = "0.6"
    />
            ))
}
{/* Door */ }
<rect x="184" y = "138" width = "32" height = "44" fill = "oklch(0.32 0.06 50)" rx = "2" />
  <circle cx="210" cy = "160" r = "1.2" fill = "oklch(0.88 0.1 80)" />
    {/* Windows */ }
    < rect x = "118" y = "130" width = "40" height = "28" fill = "oklch(0.55 0.1 220)" opacity = "0.55" rx = "2" />
      <rect x="242" y = "130" width = "40" height = "28" fill = "oklch(0.55 0.1 220)" opacity = "0.55" rx = "2" />
        {/* Roof (nipa) */ }
        < polygon points = "80,112 320,112 280,52 120,52" fill = "url(#roof)" />
          <polygon points="120,52 280,52 200,28" fill = "oklch(0.35 0.1 45)" />
            {/* Roof thatch lines */ }
{
  Array.from({ length: 6 }).map((_, i) => (
    <line
                key= { i }
                x1 = { 90 + i * 4 }
                x2 = { 310 - i * 4 }
                y1 = { 108 - i * 10 }
                y2 = { 108 - i * 10 }
                stroke = "oklch(0.3 0.08 40)"
                strokeWidth = "0.8"
                opacity = "0.45"
    />
            ))
}
{/* Ladder */ }
<line x1="210" y1 = "182" x2 = "225" y2 = "220" stroke = "oklch(0.4 0.08 60)" strokeWidth = "2" />
  <line x1="220" y1 = "182" x2 = "235" y2 = "220" stroke = "oklch(0.4 0.08 60)" strokeWidth = "2" />
  {
    [0, 1, 2].map((i) => (
      <line
                key= { i }
                x1 = { 213 + i * 4 }
                x2 = { 222 + i * 4 }
                y1 = { 194 + i * 10 }
                y2 = { 196 + i * 10 }
                stroke = "oklch(0.4 0.08 60)"
                strokeWidth = "1.6"
      />
            ))
  }
    </g>
  </g>

{/* Tiny neighbors at base */ }
{
  poles.slice(0, request.currentVolunteers).map((p, i) => (
    <g key= {`n-${i}`} transform = {`translate(${p.x - 6}, 280)`}>
      <circle cx="6" cy = "0" r = "4" fill = "oklch(0.35 0.06 50)" />
        <rect x="2" y = "4" width = "8" height = "12" rx = "2" fill = "oklch(0.55 0.15 30)" />
          </g>
          ))}
</svg>
  </div>

  < p className = "mt-2 text-center text-xs text-muted-foreground" >
    {t('progress.footer')}
      </p>
      </div>
  );
}
