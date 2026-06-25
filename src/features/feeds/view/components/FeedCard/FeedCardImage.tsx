import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HelpRequest } from "@/features/requests/model/RequestModel";

interface Props {
  r: HelpRequest;
  imgIndex: number;
  setImgIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function FeedCardImage({ r, imgIndex, setImgIndex }: Props) {
  const images = r.imageUrls && r.imageUrls.length > 0 ? r.imageUrls : (r.imageUrl ? [r.imageUrl] : []);
  if (images.length === 0) return null;

  const clampedIdx = Math.min(imgIndex, images.length - 1);

  return (
    <div className="relative w-full" onClick={e => e.stopPropagation()}>
      <img
        src={images[clampedIdx]}
        alt={`${r.title} image ${clampedIdx + 1}`}
        className="w-full max-h-[400px] object-cover hover:opacity-95 transition-opacity"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setImgIndex(i => (i - 1 + images.length) % images.length); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setImgIndex(i => (i + 1) % images.length); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                className={`rounded-full transition-all ${i === clampedIdx ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
