import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HelpRequest } from "@/features/requests/model/RequestModel";
import { SquareFeedCard } from "../SquareFeedCard";

interface Props {
  posts: HelpRequest[];
  currentPage: number;
  totalPages: number;
  safePage: number;
  onPageChange: (page: number) => void;
  onSelectPost: (id: string) => void;
}

export function PostDetailBottomGrid({ posts, currentPage, totalPages, safePage, onPageChange, onSelectPost }: Props) {
  if (posts.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6">
      {/* Card Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {posts.map(req => (
          <SquareFeedCard key={req.id} r={req} onClick={() => onSelectPost(req.id)} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-8 mt-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center h-8 w-8 rounded-md bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`flex items-center justify-center h-8 min-w-[32px] px-2 rounded-md text-sm font-medium transition-all ${
                    page === safePage
                      ? "bg-[color:var(--bamboo)] text-white shadow-md scale-105"
                      : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center h-8 w-8 rounded-md bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
