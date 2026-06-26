import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { HelpRequest } from "@/features/requests/model/RequestModel";
import { ImageZoomModal } from "@/shared-components/ImageZoomModal/ImageZoomModal";
import { SquareFeedCard } from "./SquareFeedCard";
import { usePostDetailViewModel } from "../../viewmodel/usePostDetailViewModel";

import { PostDetailHeroFlip } from "./PostDetail/PostDetailHeroFlip";
import { PostDetailHeader } from "./PostDetail/PostDetailHeader";
import { PostDetailActions } from "./PostDetail/PostDetailActions";
import { PostDetailHelpForm } from "./PostDetail/PostDetailHelpForm";
import { PostDetailComments } from "./PostDetail/PostDetailComments";
import { PostDetailBottomGrid } from "./PostDetail/PostDetailBottomGrid";

import mainBackgroundImage from "../../../../assets/main_backgroundimage.png";
import appLogo from "../../../../assets/logo.png";

interface PostDetailStandaloneViewProps {
  r: HelpRequest;
  onClose: () => void;
  otherRequests: HelpRequest[];
  onSelectPost: (id: string) => void;
  onShare?: (id: string) => void;
}

export function PostDetailStandaloneView({ r, onClose, otherRequests, onSelectPost, onShare }: PostDetailStandaloneViewProps) {
  const vm = usePostDetailViewModel(r);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Trigger loading state on post change
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 500); // 500ms artificial delay for premium feel
    return () => clearTimeout(timer);
  }, [r.id]);

  useEffect(() => {
    if (!isNavigating) {
      // Scroll to the top of the container immediately after loading completes
      setTimeout(() => {
        if (containerRef.current) {
          const y = containerRef.current.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50); // Small delay to ensure DOM is fully painted
    }
  }, [isNavigating]);

  // Split other posts into sidebar (right) and bottom grid (below active post)
  const sidebarPosts = otherRequests.slice(0, 4);
  const allBottomPosts = otherRequests.slice(4);

  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.max(1, Math.ceil(allBottomPosts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(Math.max(1, vm.currentPage), totalPages);
  const bottomPosts = allBottomPosts.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  if (isNavigating) {
    return (
      <div
        className="w-full min-h-screen pt-8 flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${mainBackgroundImage})` }}
      >
        <div className="flex flex-col items-center gap-8">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* SVG spinner - smooth rotation, no jitter */}
            <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="var(--bamboo)" strokeWidth="4" strokeOpacity="0.15" />
              <circle cx="50" cy="50" r="44" fill="none" stroke="var(--bamboo)" strokeWidth="4" strokeDasharray="276" strokeDashoffset="69" strokeLinecap="round" />
            </svg>

            {/* Inner logo */}
            <div className="absolute inset-2 bg-white/90 rounded-full p-4 shadow-sm overflow-hidden flex items-center justify-center">
              <img src={appLogo} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 bg-white/70 px-6 py-3 rounded-2xl backdrop-blur-md border border-[color:var(--bamboo)]/10 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--bamboo-deep)]">Loading Post</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen pt-8 animate-in fade-in duration-300 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${mainBackgroundImage})` }}
    >
      {/* Back Navigation */}
      <div className="w-full max-w-7xl mx-auto px-4 mb-4">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to feed
        </button>
      </div>

      {/* Main Layout */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 mt-4 sm:mt-6 flex flex-col lg:flex-row items-start gap-6 sm:gap-8 pb-24">

        {/* Left Column */}
        <div className="w-full lg:w-[68%] flex flex-col gap-6 sm:gap-8 perspective-1000">

          {/* Active Post Card */}
          <div className="relative w-full shrink-0 bg-white border border-stone-200/50 rounded-2xl sm:rounded-3xl shadow-sm flex flex-col">

            {/* Flippable Hero: image → progress kubo */}
            <PostDetailHeroFlip
              r={r}
              isFlipped={vm.isFlipped}
              onFlip={() => vm.setIsFlipped(!vm.isFlipped)}
              imgIdx={vm.standaloneImgIdx}
              setImgIdx={vm.setStandaloneImgIdx}
              onLongPress={() => {
                const images = r.imageUrls && r.imageUrls.length > 0 ? r.imageUrls : (r.imageUrl ? [r.imageUrl] : []);
                if (images.length > 0) vm.setZoomImageUrl(images[vm.standaloneImgIdx % images.length]);
              }}
            />

            {/* Post Content Area */}
            <div className="flex flex-col flex-1">
              <PostDetailHeader r={r} />

              <PostDetailActions
                isHelping={vm.isHelping}
                onToggleHelp={() => vm.setIsHelping(!vm.isHelping)}
                onShare={() => onShare?.(r.id)}
              />

              <PostDetailHelpForm
                isVisible={vm.isHelping}
                isFull={r.currentVolunteers >= r.targetVolunteers}
                helpName={vm.helpName}
                helpContribution={vm.helpContribution}
                setHelpName={vm.setHelpName}
                setHelpContribution={vm.setHelpContribution}
                onSubmit={vm.submitHelp}
              />

              <PostDetailComments
                requestId={r.id}
                commitments={r.commitments}
                commentsPage={vm.commentsPage}
                setCommentsPage={vm.setCommentsPage}
                replyingToId={vm.replyingToId}
                setReplyingToId={vm.setReplyingToId}
                replyName={vm.replyName}
                setReplyName={vm.setReplyName}
                replyContent={vm.replyContent}
                setReplyContent={vm.setReplyContent}
                onSubmitReply={vm.submitReply}
              />
            </div>
          </div>

          {/* Bottom Related Cards */}
          <PostDetailBottomGrid
            posts={bottomPosts}
            currentPage={vm.currentPage}
            totalPages={totalPages}
            safePage={safePage}
            onPageChange={vm.setCurrentPage}
            onSelectPost={onSelectPost}
          />
        </div>

        {/* Sidebar Column (Right) */}
        <div className="w-full lg:w-[32%] flex flex-col gap-6">
          {sidebarPosts.map(req => (
            <SquareFeedCard key={req.id} r={req} onClick={() => onSelectPost(req.id)} />
          ))}
          {sidebarPosts.length === 0 && (
            <p className="text-sm text-muted-foreground italic">No other requests available.</p>
          )}
        </div>
      </div>

      {/* Image Zoom Modal */}
      {vm.zoomImageUrl && (
        <ImageZoomModal
          imageUrl={vm.zoomImageUrl}
          onClose={() => vm.setZoomImageUrl(null)}
        />
      )}
    </div>
  );
}
