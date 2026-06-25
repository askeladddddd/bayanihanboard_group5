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

interface PostDetailStandaloneViewProps {
  r: HelpRequest;
  onClose: () => void;
  otherRequests: HelpRequest[];
  onSelectPost: (id: string) => void;
  onShare?: (id: string) => void;
}

export function PostDetailStandaloneView({ r, onClose, otherRequests, onSelectPost, onShare }: PostDetailStandaloneViewProps) {
  const vm = usePostDetailViewModel(r);

  // Split other posts into sidebar (right) and bottom grid (below active post)
  const sidebarPosts = otherRequests.slice(0, 4);
  const allBottomPosts = otherRequests.slice(4);

  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.max(1, Math.ceil(allBottomPosts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(Math.max(1, vm.currentPage), totalPages);
  const bottomPosts = allBottomPosts.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  return (
    <div
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
