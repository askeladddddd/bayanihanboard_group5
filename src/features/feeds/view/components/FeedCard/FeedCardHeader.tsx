import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { HelpRequest, RequestType } from "@/features/requests/model/RequestModel";
import { useState } from "react";

const TYPE_TONE: Record<RequestType, string> = {
  moving: "bg-[color:var(--bamboo)]/20 text-[color:var(--bamboo-deep)] border-[color:var(--bamboo)]/30",
  medical: "bg-[color:var(--terracotta)]/20 text-[color:var(--terracotta)] border-[color:var(--terracotta)]/30",
  fundraiser: "bg-[color:var(--nipa)]/20 text-[color:var(--nipa-deep)] border-[color:var(--nipa)]/30",
  other: "bg-muted text-muted-foreground border-border",
};

interface Props {
  r: HelpRequest;
}

export function FeedCardHeader({ r }: Props) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 p-5 pb-3 group">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--capiz)] font-display font-bold text-[color:var(--nipa-deep)] text-lg shadow-inner group-hover:scale-105 transition-transform">
          {r.title.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col pr-12">
          <span className="flex items-center gap-1 font-bold text-base text-foreground group-hover:text-[color:var(--bamboo-deep)] transition-colors">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            {t(r.neighborhood)}
          </span>
          <span className="text-xs text-muted-foreground ml-5">{new Date(r.whenISO).toLocaleDateString()}</span>
        </div>
        <div className="ml-auto pr-4">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${TYPE_TONE[r.type]}`}>
            {r.type === 'other' && r.customType ? t(r.customType) : t(r.type)}
          </span>
        </div>
      </div>

      <div className="px-5 pb-4">
        <h2 className="text-xl font-bold leading-tight text-foreground mb-2">{t(r.title)}</h2>
        {(() => {
          const needsText = t(r.needs);
          const shouldTruncate = needsText.length > 150;
          const displayNeeds = shouldTruncate && !isExpanded
            ? needsText.slice(0, 150) + "..."
            : needsText;
          return (
            <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {displayNeeds}
              {shouldTruncate && (
                <button
                  onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                  className="ml-2 font-bold text-[color:var(--bamboo-deep)] hover:underline focus:outline-none"
                >
                  {isExpanded ? "See Less" : "See More"}
                </button>
              )}
            </p>
          );
        })()}
      </div>
    </div>
  );
}
