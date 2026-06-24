import { useLeaderboardViewModel } from "../viewmodel/useLeaderboardViewModel";
import { Trophy } from "lucide-react";

export function LeaderboardView() {
  const vm = useLeaderboardViewModel();
  return (
    <div className="bg-card p-8 rounded-3xl shadow-md border border-border/60">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-yellow-500/20 rounded-2xl">
          <Trophy className="h-8 w-8 text-yellow-500" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Community Leaderboard</h1>
          <p className="text-muted-foreground">Top contributors making a difference</p>
        </div>
      </div>
      <div className="space-y-4">
        {vm.entries.map((e, i) => (
          <div key={e.id} className="p-5 border border-border/40 rounded-2xl flex items-center justify-between bg-muted/10 hover:bg-muted/30 transition-colors group">
            <div className="flex items-center gap-4">
              <div className={`h-10 w-10 flex items-center justify-center rounded-full font-bold text-lg ${i === 0 ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/30' : i === 1 ? 'bg-gray-300 text-gray-800 shadow-md' : i === 2 ? 'bg-amber-600 text-white shadow-md' : 'bg-muted text-muted-foreground'}`}>
                #{i + 1}
              </div>
              <span className="font-bold text-lg group-hover:text-[color:var(--bamboo-deep)] transition-colors">{e.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[color:var(--bamboo-deep)] font-bold text-xl">{e.points}</span>
              <span className="text-muted-foreground text-sm uppercase tracking-wider font-bold">pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
