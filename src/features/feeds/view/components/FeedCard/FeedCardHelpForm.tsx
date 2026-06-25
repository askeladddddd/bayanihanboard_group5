import { HeartHandshake } from "lucide-react";
import { Button } from "@/shared-components/Button/Button";
import type { HelpRequest } from "@/features/requests/model/RequestModel";

interface Props {
  r: HelpRequest;
  helpName: string;
  setHelpName: (val: string) => void;
  helpContribution: string;
  setHelpContribution: (val: string) => void;
  submitHelp: (e: React.FormEvent) => void;
}

export function FeedCardHelpForm({ r, helpName, setHelpName, helpContribution, setHelpContribution, submitHelp }: Props) {
  return (
    <div className="border-t border-border/40 p-5 bg-muted/10 animate-in slide-in-from-top-2 duration-200" onClick={(e) => e.stopPropagation()}>
      {r.currentVolunteers >= r.targetVolunteers ? (
        <div className="flex flex-col items-center justify-center p-6 text-center bg-[color:var(--bamboo)]/10 rounded-2xl border border-[color:var(--bamboo)]/30">
          <HeartHandshake className="h-10 w-10 text-[color:var(--bamboo-deep)] mb-3" />
          <h3 className="font-display text-lg font-bold text-[color:var(--bamboo-deep)] mb-1">Target Reached!</h3>
          <p className="text-sm font-medium text-muted-foreground">
            The community has already fulfilled the requested help for this. Thank you!
          </p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.stopPropagation(); submitHelp(e); }} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Your Name</label>
            <input
              type="text"
              placeholder="Juan Dela Cruz"
              required
              value={helpName}
              onChange={(e) => setHelpName(e.target.value)}
              className="w-full rounded-xl border-2 border-transparent bg-background px-4 py-2.5 text-sm outline-none transition focus:border-[color:var(--bamboo)]/50 focus:ring-4 focus:ring-[color:var(--bamboo)]/10 shadow-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">What assist can be done?</label>
            <input
              type="text"
              placeholder=""
              required
              value={helpContribution}
              onChange={(e) => setHelpContribution(e.target.value)}
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
  );
}
