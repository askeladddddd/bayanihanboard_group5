import type { HelpRequest, RequestType } from "@/features/requests/model/RequestModel";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useLongPress } from "@/hooks/useLongPress";
import { ImageZoomModal } from "@/shared-components/ImageZoomModal/ImageZoomModal";

const TYPE_TONE: Record<RequestType, string> = {
  moving: "bg-[color:var(--bamboo)]/20 text-[color:var(--bamboo-deep)] border-[color:var(--bamboo)]/30",
  medical: "bg-[color:var(--terracotta)]/20 text-[color:var(--terracotta)] border-[color:var(--terracotta)]/30",
  fundraiser: "bg-[color:var(--nipa)]/20 text-[color:var(--nipa-deep)] border-[color:var(--nipa)]/30",
  other: "bg-muted text-muted-foreground border-border",
};

interface SquareFeedCardProps {
  r: HelpRequest;
  onClick: () => void;
}

export function SquareFeedCard({ r, onClick }: SquareFeedCardProps) {
  const { t } = useLanguage();
  const [zoomImageUrl, setZoomImageUrl] = useState<string | null>(null);

  const longPressProps = useLongPress(() => {
    if (r.imageUrl) {
      setZoomImageUrl(r.imageUrl);
    }
  });

  return (
    <>
      <div 
        onClick={onClick}
        className="w-full bg-white border border-stone-200/60 rounded-2xl overflow-hidden p-4 flex flex-col gap-3 shadow-sm cursor-pointer hover:shadow-md hover:border-[color:var(--nipa)] transition-all duration-200 group"
      >
      {r.imageUrl ? (
        <div className="relative w-full h-40 overflow-hidden rounded-xl">
          <img 
            src={r.imageUrl} 
            alt={r.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none cursor-pointer" 
            {...longPressProps}
            onClick={() => {
              // prevent card click when we might be preparing to zoom, though here it's fine 
              // we let it bubble or not. Usually we want click to open standalone.
            }}
          />
          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white/80 text-[10px] px-2 py-1 rounded-full font-medium pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            Hold to zoom
          </div>
        </div>
      ) : (
        <div className="w-full h-40 bg-stone-100/80 rounded-xl flex items-center justify-center text-muted-foreground text-sm font-medium border border-dashed border-stone-200">
          No Image
        </div>
      )}
      
      <div className="flex-1 min-w-0" onClick={() => onClick()}>
        <h4 className="font-bold text-foreground line-clamp-2 leading-tight group-hover:text-[color:var(--nipa-deep)] transition-colors">{t(r.title)}</h4>
        <div className="flex items-center">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${TYPE_TONE[r.type]}`}>
            {r.type === 'other' && r.customType ? t(r.customType) : t(r.type)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mt-1">
          {t(r.needs)}
        </p>
      </div>
      </div>

      {zoomImageUrl && (
        <ImageZoomModal 
          imageUrl={zoomImageUrl} 
          onClose={() => setZoomImageUrl(null)} 
        />
      )}
    </>
  );
}
