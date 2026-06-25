import { useState } from 'react';
import { useRequestsContext } from '@/contexts/RequestsContext';
import type { HelpRequest } from '@/features/requests/model/RequestModel';

export function useFeedCardViewModel(r: HelpRequest) {
  const { commit, replyToCommitment } = useRequestsContext();

  const [isHelping, setIsHelping] = useState(false);
  const [helpName, setHelpName] = useState('');
  const [helpContribution, setHelpContribution] = useState('');
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyName, setReplyName] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [imgIndex, setImgIndex] = useState(0);
  const [helperPage, setHelperPage] = useState(1);

  const toggleHelpSection = () => {
    setIsHelping(prev => !prev);
    if (!isHelping) {
      setHelpName('');
      setHelpContribution('');
    }
  };

  const submitHelp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!helpName.trim() || !helpContribution.trim()) return;
    const newId = `cmt-${Math.random().toString(36).slice(2, 9)}`;
    commit(r.id, { id: newId, volunteerName: helpName, contribution: helpContribution, replies: [] });
    setIsHelping(false);
    setHelpName('');
    setHelpContribution('');
  };

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
    setReplyName('');
    setReplyContent('');
  };

  const toggleComment = (commentId: string) => {
    setExpandedComments(prev => 
      prev.includes(commentId) 
        ? prev.filter(id => id !== commentId) 
        : [...prev, commentId]
    );
  };

  return {
    isHelping,
    toggleHelpSection,
    helpName,
    setHelpName,
    helpContribution,
    setHelpContribution,
    submitHelp,
    expandedComments,
    toggleComment,
    replyingToId,
    setReplyingToId,
    replyName,
    setReplyName,
    replyContent,
    setReplyContent,
    submitReply,
    imgIndex,
    setImgIndex,
    helperPage,
    setHelperPage,
  };
}
