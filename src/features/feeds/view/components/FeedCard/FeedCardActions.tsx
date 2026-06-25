import { HeartHandshake, Share2 } from "lucide-react";

interface Props {
  id: string;
  isHelping: boolean;
  toggleHelpSection: () => void;
  onShare?: (id: string) => void;
}

export function FeedCardActions({ id, isHelping, toggleHelpSection, onShare }: Props) {
  return (
    <div className="flex items-center justify-between p-2 px-4 text-muted-foreground border-t border-border/30 mt-auto bg-card" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={(e) => { e.stopPropagation(); toggleHelpSection(); }}
        className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors driver-offer-help ${isHelping ? 'bg-[color:var(--bamboo)]/15 text-[color:var(--bamboo-deep)]' : 'hover:bg-muted hover:text-foreground'}`}
      >
        <HeartHandshake className="h-5 w-5" />
        Help
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); onShare?.(id); }}
        className="flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors hover:bg-muted hover:text-foreground"
      >
        <Share2 className="h-5 w-5" />
        Share
      </button>
    </div>
  );
}
