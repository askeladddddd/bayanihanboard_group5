import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HelpRequest } from "@/features/requests/model/RequestModel";
import { ProgressView } from "@/features/progress/view/ProgressView";
import { useLongPress } from "@/hooks/useLongPress";

interface Props {
  r: HelpRequest;
  isFlipped: boolean;
  onFlip: () => void;
  imgIdx: number;
  setImgIdx: React.Dispatch<React.SetStateAction<number>>;
  onLongPress: () => void;
}

export function PostDetailHeroFlip({ r, isFlipped, onFlip, imgIdx, setImgIdx, onLongPress }: Props) {
  const longPressProps = useLongPress(onLongPress);
  const images = r.imageUrls && r.imageUrls.length > 0 ? r.imageUrls : (r.imageUrl ? [r.imageUrl] : []);

  return (
    <div
      onClick={onFlip}
      className={`relative w-full h-[360px] sm:h-[420px] shrink-0 transition-transform duration-700 preserve-3d cursor-pointer ${isFlipped ? "rotate-y-180" : ""}`}
      style={{ display: "grid", gridTemplateAreas: '"stack"' }}
    >
      {/* Front Face: Hero Image */}
      <div className="backface-hidden w-full h-full bg-muted rounded-t-2xl sm:rounded-t-3xl overflow-hidden" style={{ gridArea: "stack" }}>
        {images.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-stone-100">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[color:var(--capiz)] font-display font-bold text-[color:var(--nipa-deep)] text-3xl shadow-inner mb-4">
              {r.title.charAt(0).toUpperCase()}
            </div>
            <span>No Image Provided</span>
          </div>
        ) : (
          <div className="relative w-full h-full group">
            <img
              src={images[imgIdx % images.length]}
              alt={r.title}
              className="w-full h-full object-cover select-none cursor-pointer"
              {...longPressProps}
            />
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white/80 text-[10px] px-3 py-1.5 rounded-full font-medium pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              Hold to zoom
            </div>
            {images.length > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); setImgIdx(i => (i - 1 + images.length) % images.length); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors z-10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); setImgIdx(i => (i + 1) % images.length); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors z-10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={e => { e.stopPropagation(); setImgIdx(() => i); }}
                      className={`rounded-full transition-all ${i === imgIdx % images.length ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Back Face: Progress View */}
      <div
        className="backface-hidden rotate-y-180 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-stone-100 flex flex-col items-center justify-center overflow-hidden rounded-t-2xl sm:rounded-t-3xl p-4"
        style={{ gridArea: "stack" }}
      >
        <div className="flex-1 w-full max-w-lg flex flex-col justify-center items-center transform origin-top mt-2">
          <ProgressView request={r} />
        </div>
      </div>
    </div>
  );
}
