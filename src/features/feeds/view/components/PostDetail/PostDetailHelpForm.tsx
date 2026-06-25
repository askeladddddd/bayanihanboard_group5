import React from "react";
import { HeartHandshake } from "lucide-react";

interface Props {
  isVisible: boolean;
  isFull: boolean;
  helpName: string;
  helpContribution: string;
  setHelpName: (v: string) => void;
  setHelpContribution: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function PostDetailHelpForm({ isVisible, isFull, helpName, helpContribution, setHelpName, setHelpContribution, onSubmit }: Props) {
  if (!isVisible) return null;

  return (
    <div
      className="mx-4 mb-4 border border-stone-200/50 p-5 bg-stone-50 rounded-2xl animate-in slide-in-from-top-2 duration-200"
      onClick={e => e.stopPropagation()}
    >
      {isFull ? (
        <div className="flex flex-col items-center justify-center p-4 text-center bg-[color:var(--bamboo)]/10 rounded-xl border border-[color:var(--bamboo)]/30">
          <HeartHandshake className="h-6 w-6 text-[color:var(--bamboo-deep)] mb-2" />
          <h3 className="font-display font-bold text-[color:var(--bamboo-deep)] mb-1">Target Reached!</h3>
          <p className="text-xs font-medium text-muted-foreground">
            The community has already fulfilled the requested help for this. Thank you!
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Juan Dela Cruz"
              required
              value={helpName}
              onChange={e => setHelpName(e.target.value)}
              className="w-full rounded-xl border-2 border-stone-200/50 bg-white px-4 py-2 text-sm outline-none transition focus:border-[color:var(--bamboo)]/50 focus:ring-4 focus:ring-[color:var(--bamboo)]/10 shadow-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">
              What assist can be done?
            </label>
            <input
              type="text"
              placeholder="e.g. I can help with lifting"
              required
              value={helpContribution}
              onChange={e => setHelpContribution(e.target.value)}
              className="w-full rounded-xl border-2 border-stone-200/50 bg-white px-4 py-2 text-sm outline-none transition focus:border-[color:var(--bamboo)]/50 focus:ring-4 focus:ring-[color:var(--bamboo)]/10 shadow-sm"
            />
          </div>
          <div className="flex justify-end mt-1">
            <button
              type="submit"
              className="bg-[color:var(--bamboo)] text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md hover:-translate-y-0.5 transition-transform"
            >
              Submit Help
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
