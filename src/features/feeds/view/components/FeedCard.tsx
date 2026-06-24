import { useState } from "react";
import { Share2, HeartHandshake, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared-components/Button/Button";
import { TYPE_LABEL } from "@/config/constants";
import type { HelpRequest, RequestType } from "@/features/requests/model/RequestModel";
import { ProgressView } from "@/features/progress/view/ProgressView";
import { useFeedsViewModel } from "../../viewmodel/useFeedsViewModel";

const TYPE_TONE: Record<RequestType, string> = {
  moving: "bg-[color:var(--bamboo)]/20 text-[color:var(--bamboo-deep)] border-[color:var(--bamboo)]/30",
  medical: "bg-[color:var(--terracotta)]/20 text-[color:var(--terracotta)] border-[color:var(--terracotta)]/30",
  fundraiser: "bg-[color:var(--nipa)]/20 text-[color:var(--nipa-deep)] border-[color:var(--nipa)]/30",
  other: "bg-muted text-muted-foreground border-border",
};

interface FeedCardProps {
  r: HelpRequest;
  vm: ReturnType<typeof useFeedsViewModel>;
}

export function FeedCard({ r, vm }: FeedCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [helperPage, setHelperPage] = useState(1);
  const [expandedComments, setExpandedComments] = useState<string[]>([]);

  const toggleDescription = () => setIsExpanded(prev => !prev);

  const toggleComment = (id: string) => {
    setExpandedComments(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const isHelping = vm.activeHelpId === r.id;
  const isAnimationVisible = vm.visibleAnimations.includes(r.id);

  return (
    <div className="relative flex flex-col lg:flex-row bg-card rounded-3xl border border-border/60 shadow-md hover:shadow-lg transition-shadow overflow-hidden items-stretch">
      {/* Floating Hide Button Inside Card */}
      <button
        onClick={() => vm.toggleAnimation(r.id)}
        title={isAnimationVisible ? "Hide Animation" : "Show Animation"}
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border/60 shadow-sm hover:bg-muted text-muted-foreground transition-colors"
      >
        {isAnimationVisible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
      </button>

      {/* Main Feed Column */}
      <div className="flex-1 w-full flex flex-col">
        {/* Header: Avatar, Name, Time */}
        <div className="flex items-center gap-3 p-5 pb-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--capiz)] font-display font-bold text-[color:var(--nipa-deep)] text-lg shadow-inner">
            {r.title.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col pr-12">
            <span className="font-bold text-base text-foreground cursor-pointer hover:text-[color:var(--bamboo-deep)] transition-colors">{r.neighborhood}</span>
            <span className="text-xs text-muted-foreground">{new Date(r.whenISO).toLocaleDateString()}</span>
          </div>
          <div className="ml-auto pr-12">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${TYPE_TONE[r.type]}`}>
              {r.type === 'other' && r.customType ? r.customType : TYPE_LABEL[r.type]}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="px-5 pb-4">
          <h2 className="text-xl font-bold leading-tight text-foreground mb-2">{r.title}</h2>
          {(() => {
            const shouldTruncate = r.needs.length > 150;
            const displayNeeds = shouldTruncate && !isExpanded
              ? r.needs.slice(0, 150) + "..."
              : r.needs;
            return (
              <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {displayNeeds}
                {shouldTruncate && (
                  <button
                    onClick={toggleDescription}
                    className="ml-2 font-bold text-[color:var(--bamboo-deep)] hover:underline focus:outline-none"
                  >
                    {isExpanded ? "See Less" : "See More"}
                  </button>
                )}
              </p>
            );
          })()}
        </div>

        {/* Image */}
        {r.imageUrl && (
          <div className="w-full">
            <img
              src={r.imageUrl}
              alt={r.title}
              className="w-full max-h-[400px] object-cover"
            />
          </div>
        )}

        {/* Action Bar */}
        <div className="flex items-center justify-between p-2 px-4 text-muted-foreground border-t border-border/30 mt-auto">
          <button
            onClick={() => vm.toggleHelpSection(r.id)}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors ${isHelping ? 'bg-[color:var(--bamboo)]/15 text-[color:var(--bamboo-deep)]' : 'hover:bg-muted hover:text-foreground'}`}
          >
            <HeartHandshake className="h-5 w-5" />
            Help
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors hover:bg-muted hover:text-foreground">
            <Share2 className="h-5 w-5" />
            Share
          </button>
        </div>

        {/* Help Form Section */}
        {isHelping && (
          <div className="border-t border-border/40 p-5 bg-muted/10 animate-in slide-in-from-top-2 duration-200">
            {r.currentVolunteers >= r.targetVolunteers ? (
              <div className="flex flex-col items-center justify-center p-6 text-center bg-[color:var(--bamboo)]/10 rounded-2xl border border-[color:var(--bamboo)]/30">
                <HeartHandshake className="h-10 w-10 text-[color:var(--bamboo-deep)] mb-3" />
                <h3 className="font-display text-lg font-bold text-[color:var(--bamboo-deep)] mb-1">Target Reached!</h3>
                <p className="text-sm font-medium text-muted-foreground">
                  The community has already fulfilled the requested help for this. Thank you!
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => vm.submitHelp(r.id, e)} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Your Name</label>
                  <input
                    type="text"
                    placeholder="Juan Dela Cruz"
                    required
                    value={vm.helpName}
                    onChange={(e) => vm.setHelpName(e.target.value)}
                    className="w-full rounded-xl border-2 border-transparent bg-background px-4 py-2.5 text-sm outline-none transition focus:border-[color:var(--bamboo)]/50 focus:ring-4 focus:ring-[color:var(--bamboo)]/10 shadow-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">What assist can be done?</label>
                  <input
                    type="text"
                    placeholder=""
                    required
                    value={vm.helpContribution}
                    onChange={(e) => vm.setHelpContribution(e.target.value)}
                    className="w-full rounded-xl border-2 border-transparent bg-background px-4 py-2.5 text-sm outline-none transition focus:border-[color:var(--bamboo)]/50 focus:ring-4 focus:ring-[color:var(--bamboo)]/10 shadow-sm"
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <Button type="submit" variant="primary" className="px-6 py-2 shadow-md hover:-translate-y-0.5 transition-transform">
                    Submit Help
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Comments (Helpers) Section */}
        <div className="border-t border-border/40 bg-muted/5 p-5">
          <h4 className="text-sm font-bold text-foreground mb-4">Helpers ({r.commitments.length})</h4>
          {r.commitments.length > 0 ? (
            <div className="space-y-4">
              {(() => {
                const itemsPerPage = 10;
                const totalPages = Math.ceil(r.commitments.length / itemsPerPage);
                const startIndex = (helperPage - 1) * itemsPerPage;
                const displayedCommitments = r.commitments.slice(startIndex, startIndex + itemsPerPage);

                return (
                  <>
                    {displayedCommitments.map((c, idx) => {
                      const commentId = `${r.id}-${idx}`;
                      const isCommentExpanded = expandedComments.includes(commentId);
                      const shouldTruncateComment = c.contribution.length > 120;
                      const displayContribution = shouldTruncateComment && !isCommentExpanded
                        ? c.contribution.slice(0, 120) + "..."
                        : c.contribution;

                      return (
                        <div key={idx} className="flex gap-3 text-sm">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--terracotta)]/20 font-display text-[color:var(--terracotta)] shadow-inner text-xs font-bold">
                            {c.volunteerName.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 rounded-2xl bg-background border border-border/60 shadow-sm px-4 py-3">
                            <span className="font-bold mr-2 text-foreground">{c.volunteerName}</span>
                            <span className="text-muted-foreground whitespace-pre-wrap">{displayContribution}</span>
                            {shouldTruncateComment && (
                              <button
                                onClick={() => toggleComment(commentId)}
                                className="ml-2 font-bold text-[color:var(--bamboo-deep)] hover:underline focus:outline-none"
                              >
                                {isCommentExpanded ? "See Less" : "See More"}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-1.5 pt-4 mt-2 border-t border-border/20">
                        <button
                          onClick={() => setHelperPage(Math.max(1, helperPage - 1))}
                          disabled={helperPage === 1}
                          className="flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-all"
                          title="Previous"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>

                        <div className="flex items-center gap-1">
                          {Array.from({ length: totalPages }).map((_, i) => {
                            const page = i + 1;
                            const isActive = page === helperPage;
                            return (
                              <button
                                key={page}
                                onClick={() => setHelperPage(page)}
                                className={`flex items-center justify-center h-8 min-w-[32px] px-2 rounded-md text-sm font-medium transition-all ${isActive
                                  ? 'bg-foreground text-background shadow-md scale-105'
                                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                  }`}
                              >
                                {page}
                              </button>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => setHelperPage(Math.min(totalPages, helperPage + 1))}
                          disabled={helperPage === totalPages}
                          className="flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-all"
                          title="Next"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          ) : (
            <p className="text-sm text-center text-muted-foreground italic bg-background rounded-xl p-4 border border-dashed border-border/60">
              Be the first to help!
            </p>
          )}
        </div>
      </div>

      {/* Side Animation Column */}
      {isAnimationVisible && (
        <div className="w-full lg:w-[400px] shrink-0 border-t lg:border-t-0 lg:border-l border-border/40 p-5 bg-card/50 flex flex-col justify-center">
          <ProgressView request={r} />
        </div>
      )}
    </div>
  );
}
