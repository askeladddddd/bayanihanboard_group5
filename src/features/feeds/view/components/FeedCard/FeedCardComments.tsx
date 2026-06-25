import { Send, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { HelpRequest } from "@/features/requests/model/RequestModel";

interface Props {
  r: HelpRequest;
  expandedComments: string[];
  toggleComment: (id: string) => void;
  replyingToId: string | null;
  setReplyingToId: (id: string | null) => void;
  replyName: string;
  setReplyName: (val: string) => void;
  replyContent: string;
  setReplyContent: (val: string) => void;
  submitReply: (commitmentId: string, e: React.FormEvent) => void;
  helperPage: number;
  setHelperPage: (val: number) => void;
}

export function FeedCardComments({
  r,
  expandedComments,
  toggleComment,
  replyingToId,
  setReplyingToId,
  replyName,
  setReplyName,
  replyContent,
  setReplyContent,
  submitReply,
  helperPage,
  setHelperPage
}: Props) {
  const { t } = useLanguage();

  return (
    <div className="border-t border-stone-200/50 bg-[#fdfbf7] p-5 relative z-10 driver-comments" onClick={(e) => e.stopPropagation()}>
      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-5 flex items-center gap-2">
        Helpers & Comments <span className="bg-stone-200/80 text-stone-600 px-2 py-0.5 rounded-full text-[10px]">{r.commitments.length}</span>
      </h4>
      {r.commitments.length > 0 ? (
        <div className="space-y-5">
          {(() => {
            const itemsPerPage = 5;
            const totalPages = Math.ceil(r.commitments.length / itemsPerPage);
            const startIndex = (helperPage - 1) * itemsPerPage;
            const displayedCommitments = r.commitments.slice(startIndex, startIndex + itemsPerPage);

            return (
              <>
                {displayedCommitments.map((c, idx) => {
                  const commentId = `${r.id}-${idx}`;
                  const isCommentExpanded = expandedComments.includes(commentId);
                  const translatedContribution = t(c.contribution);
                  const shouldTruncateComment = translatedContribution.length > 120;
                  const displayContribution = shouldTruncateComment && !isCommentExpanded
                    ? translatedContribution.slice(0, 120) + "..."
                    : translatedContribution;

                  return (
                    <div key={idx} className="flex flex-col gap-2">
                      <div className="flex gap-3">
                        {/* Avatar */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--bamboo)] to-[color:var(--bamboo-deep)] text-white shadow-sm text-sm font-bold">
                          {c.volunteerName.charAt(0).toUpperCase()}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <div className="rounded-2xl bg-white border border-stone-100 shadow-sm px-4 py-3">
                            <p className="text-sm font-bold text-stone-800">{c.volunteerName}</p>
                            <p className="text-sm text-stone-600 mt-0.5 leading-relaxed whitespace-pre-wrap">{displayContribution}</p>
                            {shouldTruncateComment && (
                              <button
                                onClick={() => toggleComment(commentId)}
                                className="mt-1 font-bold text-[color:var(--bamboo-deep)] hover:underline focus:outline-none text-xs"
                              >
                                {isCommentExpanded ? "See Less" : "See More"}
                              </button>
                            )}
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center gap-4 mt-1.5 ml-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); setReplyingToId(replyingToId === c.id ? null : c.id); }}
                              className="text-xs font-bold text-stone-400 hover:text-stone-700 transition-colors"
                            >
                              Reply
                            </button>
                            <span className="text-[10px] text-stone-400">Just now</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Replies Display */}
                      {c.replies && c.replies.length > 0 && (
                        <div className="ml-12 mt-1 flex flex-col gap-3 border-l-2 border-stone-100 pl-4">
                          {c.replies.map(rep => (
                            <div key={rep.id} className="flex gap-2.5">
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-200 text-stone-600 text-xs font-bold">
                                {rep.authorName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="rounded-2xl bg-stone-100 px-3 py-2">
                                  <p className="text-xs font-bold text-stone-800">{rep.authorName}</p>
                                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed whitespace-pre-wrap">{t(rep.content)}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Form */}
                      {replyingToId === c.id && (
                        <div className="ml-12 mt-1 flex flex-col gap-2 border-l-2 border-[color:var(--bamboo)]/40 pl-4 animate-in slide-in-from-top-2">
                          <form onSubmit={(e) => submitReply(c.id, e)} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-2">
                            <input
                              type="text"
                              placeholder="Your Name"
                              required
                              value={replyName}
                              onChange={(e) => setReplyName(e.target.value)}
                              className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs outline-none transition focus:border-[color:var(--bamboo)] focus:ring-2 focus:ring-[color:var(--bamboo)]/10"
                            />
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Write a reply..."
                                required
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                className="flex-1 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs outline-none transition focus:border-[color:var(--bamboo)] focus:ring-2 focus:ring-[color:var(--bamboo)]/10"
                              />
                              <button type="submit" className="flex items-center justify-center rounded-xl bg-[color:var(--bamboo)] px-4 text-white transition-colors hover:bg-[color:var(--bamboo-deep)]">
                                <Send className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
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
        <div className="text-center py-6 text-stone-500 bg-white rounded-2xl border border-stone-100/50 shadow-sm">
          <p className="text-sm font-medium">No helpers yet</p>
          <p className="text-xs mt-1 text-stone-400">Be the first to offer assistance for this request.</p>
        </div>
      )}
    </div>
  );
}
