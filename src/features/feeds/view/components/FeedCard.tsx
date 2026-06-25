import type { HelpRequest } from "@/features/requests/model/RequestModel";
import { useFeedCardViewModel } from "../../viewmodel/useFeedCardViewModel";
import { FeedCardHeader } from "./FeedCard/FeedCardHeader";
import { FeedCardImage } from "./FeedCard/FeedCardImage";
import { FeedCardActions } from "./FeedCard/FeedCardActions";
import { FeedCardHelpForm } from "./FeedCard/FeedCardHelpForm";
import { FeedCardComments } from "./FeedCard/FeedCardComments";

interface FeedCardProps {
  r: HelpRequest;
  onClick?: () => void;
  onShare?: (id: string) => void;
}

export function FeedCard({ r, onClick, onShare }: FeedCardProps) {
  const vm = useFeedCardViewModel(r);

  return (
    <div 
      onClick={onClick}
      className="relative flex flex-col bg-card rounded-3xl border border-border/40 shadow-sm hover:shadow-md transition-shadow overflow-hidden items-stretch cursor-pointer w-full driver-feed-card"
    >
      {/* Main Feed Column */}
      <div className="flex-1 w-full flex flex-col">
        <FeedCardHeader r={r} />
        
        <FeedCardImage 
          r={r} 
          imgIndex={vm.imgIndex} 
          setImgIndex={vm.setImgIndex} 
        />
        
        <FeedCardActions 
          id={r.id} 
          isHelping={vm.isHelping} 
          toggleHelpSection={vm.toggleHelpSection} 
          onShare={onShare} 
        />

        {vm.isHelping && (
          <FeedCardHelpForm 
            r={r} 
            helpName={vm.helpName}
            setHelpName={vm.setHelpName}
            helpContribution={vm.helpContribution}
            setHelpContribution={vm.setHelpContribution}
            submitHelp={vm.submitHelp}
          />
        )}

        <FeedCardComments 
          r={r}
          expandedComments={vm.expandedComments}
          toggleComment={vm.toggleComment}
          replyingToId={vm.replyingToId}
          setReplyingToId={vm.setReplyingToId}
          replyName={vm.replyName}
          setReplyName={vm.setReplyName}
          replyContent={vm.replyContent}
          setReplyContent={vm.setReplyContent}
          submitReply={vm.submitReply}
          helperPage={vm.helperPage}
          setHelperPage={vm.setHelperPage}
        />
      </div>
    </div>
  );
}
