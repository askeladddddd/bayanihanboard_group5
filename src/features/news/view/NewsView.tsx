import { useNewsViewModel } from "../viewmodel/useNewsViewModel";
import { Newspaper, Clock } from "lucide-react";

export function NewsView() {
  const vm = useNewsViewModel();
  return (
    <div className="bg-card p-8 rounded-3xl shadow-md border border-border/60">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-500/20 rounded-2xl">
          <Newspaper className="h-8 w-8 text-blue-500" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Local News & Alerts</h1>
          <p className="text-muted-foreground">Stay updated with your community</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vm.news.map((n) => (
          <div key={n.id} className="p-6 border border-border/40 rounded-2xl flex flex-col bg-muted/10 hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg group">
            <h3 className="font-bold text-lg mb-4 group-hover:text-blue-500 transition-colors leading-tight">{n.title}</h3>
            <div className="mt-auto flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <Clock className="h-4 w-4" />
              {new Date(n.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
