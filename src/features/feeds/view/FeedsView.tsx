import { FeedsSidebar } from "./components/FeedsSidebar";
import { FeedCard } from "./components/FeedCard";
import { useFeedsViewModel } from "../viewmodel/useFeedsViewModel";
import { LeaderboardView } from "../../leaderboard/view/LeaderboardView";
import { NewsView } from "../../news/view/NewsView";
import { HotlineView } from "../../hotlines/view/HotlineView";

interface FeedsViewProps {
  searchQuery: string;
  onOpenCreateModal: () => void;
  activeFeature: string;
}

export function FeedsView({ searchQuery, onOpenCreateModal, activeFeature }: FeedsViewProps) {
  const vm = useFeedsViewModel(searchQuery);

  return (
    <div className="mx-auto max-w-[1600px] space-y-8 pb-12 px-4 md:px-8 relative">
      {/* Header */}
      <div className="border-b border-border/40 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">Community Help Board</h1>
          <p className="text-muted-foreground mt-1">See what the community is up to and lend a hand.</p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="flex flex-row gap-6 max-w-7xl mx-auto px-4 w-full">
        {/* Main Left Section */}
        <div className="w-full lg:flex-1">
          {activeFeature === "feed" && (
            <>
              {/* Facebook-style "Post for Help" Block */}
              <div className="bg-card rounded-3xl border border-border/60 shadow-md p-5 flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--bamboo)]/20 font-display font-bold text-[color:var(--bamboo-deep)] text-lg shadow-inner">
                  You
                </div>
                <button
                  onClick={onOpenCreateModal}
                  className="flex-1 text-left bg-muted/50 hover:bg-muted/80 transition-colors rounded-full px-6 py-3.5 text-muted-foreground text-sm font-medium border-2 border-transparent focus:outline-none"
                >
                  What kind of help do you need right now?
                </button>
              </div>

              <div className="flex flex-col gap-12 pt-4">
                {vm.requests.map((r) => (
                  <FeedCard key={r.id} r={r} vm={vm} />
                ))}
                {vm.requests.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-3xl border border-border/60 shadow-md">
                    <h3 className="font-display text-2xl font-bold text-foreground">No events found</h3>
                    <p className="text-muted-foreground mt-2">Try selecting a different date or adjusting your search.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeFeature === "leaderboard" && <LeaderboardView />}
          {activeFeature === "news" && <NewsView />}
          {activeFeature === "hotlines" && <HotlineView />}
        </div>

        {/* Right Corner Sidebar Section */}
        <FeedsSidebar vm={vm} />
      </div>
    </div>
  );
}
