import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { FeedsSidebar } from "./components/FeedsSidebar";
import { FeedCard } from "./components/FeedCard";
import { PostDetailStandaloneView } from "./components/PostDetailStandaloneView";
import { useFeedsViewModel } from "../viewmodel/useFeedsViewModel";
import { useLanguage } from "@/contexts/LanguageContext";
import { LeaderboardView } from "../../leaderboard/view/LeaderboardView";
import { NewsView } from "../../news/view/NewsView";
import { HotlineView } from "../../hotlines/view/HotlineView";
import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.jpg";
import image3 from "../../../assets/image3.jpg";
import image4 from "../../../assets/image4.jpeg";

interface FeedsViewProps {
  searchQuery: string;
  onOpenCreateModal: () => void;
  activeFeature: string;
  onSharePost?: (id: string) => void;
}

export function FeedsView({ searchQuery, onOpenCreateModal, activeFeature, onSharePost }: FeedsViewProps) {
  const vm = useFeedsViewModel(searchQuery);
  const { t } = useLanguage();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const selectedPost = selectedPostId ? vm.allRequests.find(r => r.id === selectedPostId) : null;
  const otherPosts = selectedPost ? vm.allRequests.filter(r => r.id !== selectedPostId) : [];

  const handleShareAndNavigate = (id: string) => {
    onSharePost?.(id);
    setSelectedPostId(id);
  };

  if (selectedPost) {
    return (
      <PostDetailStandaloneView
        r={selectedPost}
        onClose={() => setSelectedPostId(null)}
        otherRequests={otherPosts}
        onSelectPost={setSelectedPostId}
        onShare={handleShareAndNavigate}
      />
    );
  }

  return (
    <div className="w-full pb-12 animate-in fade-in duration-300">
      {/* Header spanning full width to align with hamburger */}
      <div className="relative w-full px-4 sm:px-6 py-6 sm:py-8 mb-6 sm:mb-8 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left overflow-hidden">
        {/* Animated Background Slider */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
          <div className="flex h-full w-[200%] animate-slide-images">
            {/* First set of 4 */}
            <div className="flex w-1/2 h-full">
              <img src={image1} className="w-1/4 h-full object-cover" alt="" />
              <img src={image2} className="w-1/4 h-full object-cover" alt="" />
              <img src={image3} className="w-1/4 h-full object-cover" alt="" />
              <img src={image4} className="w-1/4 h-full object-cover" alt="" />
            </div>
            {/* Second set of 4 for seamless loop */}
            <div className="flex w-1/2 h-full">
              <img src={image1} className="w-1/4 h-full object-cover" alt="" />
              <img src={image2} className="w-1/4 h-full object-cover" alt="" />
              <img src={image3} className="w-1/4 h-full object-cover" alt="" />
              <img src={image4} className="w-1/4 h-full object-cover" alt="" />
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="relative z-10">
          <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground">{t('feeds.header.title')}</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-lg">{t('feeds.header.subtitle')}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-2 sm:px-4 md:px-8 space-y-8 relative">

        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full">
          {/* Main Left Section */}
          <div className="w-full lg:flex-1 min-w-0">
            {activeFeature === "feed" && (
              <>
                {/* Post for Help Card — Vertical Block Layout */}
                <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-[#fdfbf7] border border-stone-200/40 rounded-[32px] w-full max-w-md mx-auto text-center shadow-sm mb-6 driver-post-help">
                  {/* Button with glow effects — no animation */}
                  <div className="relative flex items-center justify-center mb-4">
                    {/* Static soft glow halo */}
                    <span className="absolute inline-flex h-[72px] w-[72px] rounded-full bg-[#468b4c]/25 blur-lg" />
                    {/* Main button */}
                    <button
                      onClick={onOpenCreateModal}
                      className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-[0_8px_24px_rgba(70,139,76,0.45)] hover:shadow-[0_12px_32px_rgba(70,139,76,0.65)] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                      style={{ background: 'linear-gradient(135deg, #5aab61 0%, #3b7d42 60%, #2e6334 100%)' }}
                      aria-label="Post for Help"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                  <h2 className="text-[#1b4d24] font-bold text-2xl tracking-tight mb-2">{t('post.help.title')}</h2>
                  <p className="text-stone-600 text-sm max-w-[280px] leading-relaxed">{t('post.help.desc')}</p>
                </div>

                {/* Header with Dropdowns */}
                <div className="flex flex-col sm:flex-row items-center justify-start gap-4 mb-6 mt-6">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                      <select
                        value={vm.filterCategory}
                        onChange={e => vm.setFilterCategory(e.target.value)}
                        className="w-full appearance-none bg-white border border-stone-200/80 shadow-sm hover:border-[color:var(--bamboo)] rounded-xl pl-4 pr-10 py-2.5 text-sm font-bold text-stone-700 outline-none focus:ring-2 focus:ring-[color:var(--bamboo)]/20 transition-all cursor-pointer"
                      >
                        <option value="all">{t('filter.all')}</option>
                        <option value="moving">{t('filter.moving')}</option>
                        <option value="medical">{t('filter.medical')}</option>
                        <option value="fundraiser">{t('filter.fundraiser')}</option>
                        <option value="other">{t('filter.other')}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-500">
                        <SlidersHorizontal className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="relative flex-1 sm:flex-none">
                      <select
                        value={vm.sortBy}
                        onChange={e => vm.setSortBy(e.target.value)}
                        className="w-full appearance-none bg-white border border-stone-200/80 shadow-sm hover:border-[color:var(--bamboo)] rounded-xl pl-4 pr-10 py-2.5 text-sm font-bold text-stone-700 outline-none focus:ring-2 focus:ring-[color:var(--bamboo)]/20 transition-all cursor-pointer"
                      >
                        <option value="recent">{t('sort.recent')}</option>
                        <option value="urgent">{t('sort.urgent')}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-500">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-12 pt-4">
                  {vm.requests.map((r) => (
                    <FeedCard
                      key={r.id}
                      r={r}
                      onShare={handleShareAndNavigate}
                      onClick={() => setSelectedPostId(r.id)}
                    />
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
          <FeedsSidebar vm={vm} onSelectPost={setSelectedPostId} />
        </div>

      </div>
    </div>
  );
}
