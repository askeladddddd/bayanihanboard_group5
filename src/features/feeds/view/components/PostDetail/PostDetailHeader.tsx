import type { HelpRequest } from "@/features/requests/model/RequestModel";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin } from "lucide-react";

const TYPE_TONE: Record<HelpRequest["type"], string> = {
  moving: "bg-[color:var(--bamboo)]/20 text-[color:var(--bamboo-deep)] border-[color:var(--bamboo)]/30",
  medical: "bg-[color:var(--terracotta)]/20 text-[color:var(--terracotta)] border-[color:var(--terracotta)]/30",
  fundraiser: "bg-[color:var(--nipa)]/20 text-[color:var(--nipa-deep)] border-[color:var(--nipa)]/30",
  other: "bg-muted text-muted-foreground border-border",
};

interface Props {
  r: HelpRequest;
}

export function PostDetailHeader({ r }: Props) {
  const { t } = useLanguage();

  return (
    <div className="px-6 pt-5 pb-4 border-b border-stone-200/50 shrink-0 bg-white space-y-3">
      {/* Meta row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-stone-100 px-2.5 py-1 rounded-md">
          <MapPin className="w-3.5 h-3.5" />
          {t(r.neighborhood)}
        </span>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${TYPE_TONE[r.type]}`}>
          {r.type === "other" && r.customType ? t(r.customType) : t(r.type)}
        </span>
        <span className="text-xs text-muted-foreground ml-auto font-medium">
          {new Date(r.whenISO).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-foreground leading-tight">{t(r.title)}</h2>

      {/* Description */}
      <p className="text-sm text-foreground/70 leading-relaxed whitespace-pre-wrap">{t(r.needs)}</p>
    </div>
  );
}
