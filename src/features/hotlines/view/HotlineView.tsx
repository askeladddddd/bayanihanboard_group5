import { useHotlineViewModel } from "../viewmodel/useHotlineViewModel";
import { Siren, PhoneCall } from "lucide-react";

export function HotlineView() {
  const vm = useHotlineViewModel();
  return (
    <div className="bg-card p-8 rounded-3xl shadow-md border border-border/60">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-red-500/20 rounded-2xl animate-pulse">
          <Siren className="h-8 w-8 text-red-500" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Emergency Hotlines</h1>
          <p className="text-muted-foreground">Quick access to essential services</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {vm.hotlines.map((h) => (
          <div key={h.id} className="p-5 border-2 border-transparent hover:border-red-500/30 rounded-2xl flex items-center justify-between bg-red-500/5 transition-colors group">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Service</span>
              <span className="font-bold text-lg text-foreground">{h.name}</span>
            </div>
            <a href={`tel:${h.number}`} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl font-bold shadow-md hover:bg-red-600 transition-colors hover:scale-105 active:scale-95">
              <PhoneCall className="h-4 w-4" />
              {h.number}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
