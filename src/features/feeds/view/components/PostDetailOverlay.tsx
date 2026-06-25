import { X } from "lucide-react";
import type { HelpRequest } from "@/features/requests/model/RequestModel";
import { SquareFeedCard } from "./SquareFeedCard";

interface PostDetailOverlayProps {
  r: HelpRequest;
  onClose: () => void;
  otherRequests: HelpRequest[];
  onSelectPost: (id: string) => void;
}

export function PostDetailOverlay({ r, onClose, otherRequests, onSelectPost }: PostDetailOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 bg-[#fdfbf7]/95 backdrop-blur-md overflow-y-auto p-4 md:p-8 animate-in fade-in duration-200">
      {/* Close Button */}
      <button 
        onClick={onClose} 
        className="fixed top-6 right-6 p-3 bg-white rounded-full shadow-md z-50 hover:bg-stone-100 transition-colors border border-border/40"
      >
         <X className="w-6 h-6 text-foreground" />
      </button>

      {/* Master Container */}
      <div className="w-full max-w-7xl mx-auto mt-6 flex flex-col lg:flex-row items-start gap-8 relative z-10 pb-20">
        
        {/* Left Side (65% width) */}
        <div className="w-full lg:w-[65%] grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-sm border border-border/40">
           {/* Hero Image on the left */}
           <div className="w-full h-[300px] md:h-[600px] bg-muted">
             {r.imageUrl ? (
               <img src={r.imageUrl} alt={r.title} className="w-full h-full object-cover" />
             ) : (
               <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-stone-100">
                 <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[color:var(--capiz)] font-display font-bold text-[color:var(--nipa-deep)] text-3xl shadow-inner mb-4">
                    {r.title.charAt(0).toUpperCase()}
                 </div>
                 <span>No Image Provided</span>
               </div>
             )}
           </div>

           {/* Comments/Helpers on the right */}
           <div className="flex flex-col h-full max-h-[600px]">
             {/* Header Info */}
             <div className="p-6 border-b border-border/40 shrink-0">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--bamboo-deep)] bg-[color:var(--bamboo)]/20 px-2 py-1 rounded-md">
                        {r.neighborhood}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {new Date(r.whenISO).toLocaleDateString()}
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-foreground leading-tight mb-3">{r.title}</h2>
                <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap max-h-32 overflow-y-auto custom-scrollbar">
                    {r.needs}
                </p>
             </div>

             {/* Helpers List */}
             <div className="p-6 overflow-y-auto flex-1 custom-scrollbar bg-stone-50/50">
               <h4 className="text-sm font-bold text-foreground mb-4 flex items-center justify-between">
                   <span>Helpers & Comments</span>
                   <span className="bg-muted px-2 py-0.5 rounded-full text-xs">{r.commitments.length}</span>
               </h4>
               
               {r.commitments.length > 0 ? (
                 <div className="space-y-4">
                   {r.commitments.map((c, idx) => (
                      <div key={idx} className="flex gap-3 text-sm">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--terracotta)]/20 font-display text-[color:var(--terracotta)] shadow-inner text-sm font-bold">
                          {c.volunteerName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 rounded-2xl bg-white border border-border/60 shadow-sm px-4 py-3">
                          <span className="font-bold mr-2 text-foreground block mb-1">{c.volunteerName}</span>
                          <span className="text-muted-foreground whitespace-pre-wrap text-xs leading-relaxed">{c.contribution}</span>
                        </div>
                      </div>
                   ))}
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center h-40 text-center bg-white rounded-2xl border border-dashed border-border/60 p-6">
                    <p className="text-sm font-medium text-foreground mb-1">No helpers yet</p>
                    <p className="text-xs text-muted-foreground">Be the first to offer assistance for this request.</p>
                 </div>
               )}
             </div>
           </div>
        </div>

        {/* Right Side (35% width) */}
        <div className="w-full lg:w-[35%] flex flex-col gap-5">
           <h3 className="font-display font-bold text-2xl text-foreground sticky top-6">More like this</h3>
           <div className="grid grid-cols-1 gap-4">
              {otherRequests.slice(0, 6).map((req) => (
                 <SquareFeedCard key={req.id} r={req} onClick={() => onSelectPost(req.id)} />
              ))}
              {otherRequests.length === 0 && (
                 <p className="text-sm text-muted-foreground italic">No other requests available.</p>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
