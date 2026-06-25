import React from "react";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import type { Commitment } from "@/features/requests/model/RequestModel";
import { useLanguage } from "@/contexts/LanguageContext";

const COMMENTS_PER_PAGE = 2;

interface Props {
  commitments: Commitment[];
  commentsPage: number;
  setCommentsPage: (page: number) => void;
  replyingToId: string | null;
  setReplyingToId: (id: string | null) => void;
  replyName: string;
  setReplyName: (v: string) => void;
  replyContent: string;
  setReplyContent: (v: string) => void;
  onSubmitReply: (commitmentId: string, e: React.FormEvent) => void;
}

export function PostDetailComments({
  commitments,
  commentsPage,
  setCommentsPage,
  replyingToId,
  setReplyingToId,
  replyName,
  setReplyName,
  replyContent,
  setReplyContent,
  onSubmitReply,
}: Props) {
  const { t } = useLanguage();

  const totalPages = Math.ceil(commitments.length / COMMENTS_PER_PAGE);
  const safePage = Math.min(commentsPage, totalPages || 1);
  const startIdx = (safePage - 1) * COMMENTS_PER_PAGE;
  const currentComments = commitments.slice(startIdx, startIdx + COMMENTS_PER_PAGE);

  return (
    <div className="p-6 flex-1 bg-[#fdfbf7]" onClick={e => e.stopPropagation()}>
      {/* Section Header */}
      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-5 flex items-center justify-between">
        <span>Helpers &amp; Comments</span>
        <span className="bg-stone-200/80 text-stone-600 px-2 py-0.5 rounded-full text-[10px]">
          {commitments.length}
        </span>
      </h4>

      {commitments.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-center bg-white rounded-2xl border border-dashed border-stone-200/60 p-6">
          <p className="text-sm font-medium text-foreground mb-1">No helpers yet</p>
          <p className="text-xs text-muted-foreground">Be the first to offer assistance for this request.</p>
        </div>
      ) : (
        <>
          {/* Comment List */}
          <div className="space-y-5">
            {currentComments.map((c, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                {/* Commitment Row */}
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--bamboo)] to-[color:var(--bamboo-deep)] text-white shadow-sm text-sm font-bold">
                    {c.volunteerName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="rounded-2xl bg-white border border-stone-100 shadow-sm px-4 py-3">
                      <p className="text-sm font-bold text-stone-800">{c.volunteerName}</p>
                      <p className="text-sm text-stone-600 mt-0.5 leading-relaxed whitespace-pre-wrap">{t(c.contribution)}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-1.5 ml-2">
                      <button
                        onClick={e => { e.stopPropagation(); setReplyingToId(replyingToId === c.id ? null : c.id); }}
                        className="text-xs font-bold text-stone-400 hover:text-stone-700 transition-colors"
                      >
                        Reply
                      </button>
                      <span className="text-[10px] text-stone-400">Just now</span>
                    </div>
                  </div>
                </div>

                {/* Replies */}
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
                  <div className="mt-3 flex flex-col gap-2 border-l-2 border-[color:var(--bamboo)]/40 pl-4 ml-2 animate-in slide-in-from-top-2">
                    <form onSubmit={e => onSubmitReply(c.id, e)} onClick={e => e.stopPropagation()} className="flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={replyName}
                        onChange={e => setReplyName(e.target.value)}
                        className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs outline-none transition focus:border-[color:var(--bamboo)] focus:ring-2 focus:ring-[color:var(--bamboo)]/10"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Write a reply..."
                          required
                          value={replyContent}
                          onChange={e => setReplyContent(e.target.value)}
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
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={e => { e.stopPropagation(); setCommentsPage(Math.max(1, commentsPage - 1)); }}
                disabled={commentsPage === 1}
                className="flex items-center justify-center h-7 w-7 rounded-md bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
              >
                <ChevronLeft className="h-3 w-3" />
              </button>
              <span className="text-xs font-medium text-stone-500">
                Page {safePage} of {totalPages}
              </span>
              <button
                onClick={e => { e.stopPropagation(); setCommentsPage(Math.min(totalPages, commentsPage + 1)); }}
                disabled={commentsPage === totalPages}
                className="flex items-center justify-center h-7 w-7 rounded-md bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
              >
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
