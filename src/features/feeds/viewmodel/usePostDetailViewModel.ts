import { useState, useEffect } from "react";
import { useRequestsContext } from '@/contexts/RequestsContext';
import type { HelpRequest } from "@/features/requests/model/RequestModel";

export function usePostDetailViewModel(r: HelpRequest) {
  const { replyToCommitment, commit } = useRequestsContext();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false);
  const [standaloneImgIdx, setStandaloneImgIdx] = useState(0);
  
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyName, setReplyName] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [commentsPage, setCommentsPage] = useState(1);
  
  const [isHelping, setIsHelping] = useState(false);
  const [helpName, setHelpName] = useState("");
  const [helpContribution, setHelpContribution] = useState("");
  const [zoomImageUrl, setZoomImageUrl] = useState<string | null>(null);

  // Reset image state when active post changes
  useEffect(() => {
    setIsFlipped(false);
    setStandaloneImgIdx(0);
  }, [r.id]);

  const submitReply = (commitmentId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyName.trim() || !replyContent.trim()) return;
    replyToCommitment(r.id, commitmentId, {
      id: `rep-${Math.random().toString(36).slice(2, 9)}`,
      authorName: replyName,
      content: replyContent,
      createdAtISO: new Date().toISOString()
    });
    setReplyingToId(null);
    setReplyName("");
    setReplyContent("");
  };

  const submitHelp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!helpName.trim() || !helpContribution.trim()) return;
    const newId = `cmt-${Math.random().toString(36).slice(2, 9)}`;
    commit(r.id, { id: newId, volunteerName: helpName, contribution: helpContribution, replies: [] });
    setIsHelping(false);
    setHelpName("");
    setHelpContribution("");
  };

  return {
    currentPage,
    setCurrentPage,
    isFlipped,
    setIsFlipped,
    standaloneImgIdx,
    setStandaloneImgIdx,
    replyingToId,
    setReplyingToId,
    replyName,
    setReplyName,
    replyContent,
    setReplyContent,
    commentsPage,
    setCommentsPage,
    submitReply,
    isHelping,
    setIsHelping,
    helpName,
    setHelpName,
    helpContribution,
    setHelpContribution,
    submitHelp,
    zoomImageUrl,
    setZoomImageUrl
  };
}
