import { useState } from "react";
import { HeartHandshake } from "lucide-react";
import { Button } from "@/shared-components/Button/Button";
import { TYPE_LABEL } from "@/config/constants";
import type { HelpRequest, RequestType } from "../model/RequestModel";
import { useLanguage } from '@/contexts/LanguageContext';

const TYPE_TONE: Record<RequestType, string> = {
  moving: "bg-[color:var(--bamboo)]/20 text-[color:var(--bamboo-deep)] border-[color:var(--bamboo)]/30",
  medical: "bg-[color:var(--terracotta)]/20 text-[color:var(--terracotta)] border-[color:var(--terracotta)]/30",
  fundraiser: "bg-[color:var(--nipa)]/20 text-[color:var(--nipa-deep)] border-[color:var(--nipa)]/30",
  other: "bg-muted text-muted-foreground border-border",
};

export function RequestList({
  requests,
  activeId,
  onSelect,
}: {
  requests: HelpRequest[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const paginatedRequests = requests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col gap-4 scroll-mt-32" id="wall">
      <div className="flex items-baseline justify-between px-1">
        <h2 className="font-display text-3xl font-bold tracking-tight">{t('wall.title')}</h2>
        <span className="rounded-full bg-muted/50 px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm">
          {requests.length} {t('wall.open')}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {paginatedRequests.map((r) => {
          const pct = Math.round((r.currentVolunteers / r.targetVolunteers) * 100);
          const active = r.id === activeId;
          return (
            <button
              key={r.id}
              onClick={() => onSelect(r.id)}
              className={`group relative w-full overflow-hidden rounded-3xl border bg-card p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${active ? "border-[color:var(--bamboo)] bg-[color:var(--bamboo)]/5 ring-4 ring-[color:var(--bamboo)]/10" : "border-border hover:border-border/80"
                } ${r.currentVolunteers === 0 ? 'shadow-[0_0_8px_2px_rgba(255,255,0,0.6)]' : ''}`}
            >
              <div className="flex items-start justify-between gap-4 relative z-10">
                <div className="flex-1 space-y-1">
                  <div className={`mb-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${TYPE_TONE[r.type]}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                    {r.type === 'other' && r.customType ? r.customType : TYPE_LABEL[r.type]}
                  </div>  <h3 className="font-display text-xl font-semibold leading-tight text-foreground transition-colors group-hover:text-[color:var(--bamboo-deep)]">
                    {r.title}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                    {r.neighborhood}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end text-right">
                  <p className="font-display text-3xl font-bold text-[color:var(--bamboo-deep)] tracking-tight">
                    {pct}%
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
                    {r.currentVolunteers}/{r.targetVolunteers} {t('wall.lifted')}
                  </p>
                </div>
              </div>
              <div className="relative z-10 mt-5 h-2 w-full overflow-hidden rounded-full bg-muted/60 shadow-inner">
                <div
                  className={
                    `h-full rounded-full transition-[width] duration-1000 ease-out ${(() => {
                      const remaining = r.targetVolunteers - r.currentVolunteers;
                      if (remaining === r.targetVolunteers) return 'bg-yellow-300 shadow-[0_0_8px_2px_rgba(255,255,0,0.6)]';
                      if (remaining === 2) return 'bg-gradient-to-r from-[color:var(--terracotta)]/40 to-[color:var(--terracotta)]/70';
                      if (remaining === 1) return 'bg-gradient-to-r from-[color:var(--terracotta)]/70 to-[color:var(--terracotta)]';
                      return 'bg-gradient-to-r from-[color:var(--bamboo)] to-[color:var(--bamboo-deep)]';
                    })()
                    }`
                  }
                  style={{ width: `${pct}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-2 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${currentPage === page
                  ? "bg-[color:var(--bamboo-deep)] text-[color:var(--primary-foreground)] shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 disabled:opacity-50 disabled:pointer-events-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}

export function RequestDetail({
  request,
  onCommit,
}: {
  request: HelpRequest;
  onCommit: (name: string, contribution: string) => void;
}) {
  const [name, setName] = useState("");
  const [contribution, setContribution] = useState("");
  const [selectedCommitment, setSelectedCommitment] = useState<{ name: string, contribution: string, index: number } | null>(null);
  const [isDescModalOpen, setIsDescModalOpen] = useState(false);
  const full = request.currentVolunteers >= request.targetVolunteers;
  const isLongDesc = request.needs.length > 100;
  const { t } = useLanguage();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !contribution.trim() || full) return;
    onCommit(name.trim(), contribution.trim());
    setName("");
    setContribution("");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-xl shadow-black/5 relative transition-all">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-[color:var(--bamboo)]/5 blur-3xl" />
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${TYPE_TONE[request.type].split(' ')[0]}`} />
            {request.type === 'other' && request.customType ? request.customType : TYPE_LABEL[request.type]} · {request.neighborhood}
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-foreground break-words">
            {request.title}
          </h2>
          <div className="mt-6 flex items-start gap-4 rounded-2xl bg-muted/30 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[color:var(--bamboo)] mt-0.5"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" /><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" /></svg>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-relaxed text-muted-foreground break-words">
                {isLongDesc ? `${request.needs.slice(0, 100)}...` : request.needs}
              </p>
              {isLongDesc && (
                <button onClick={() => setIsDescModalOpen(true)} className="mt-2 text-xs font-bold text-[color:var(--bamboo-deep)] hover:underline">
                  See more
                </button>
              )}
            </div>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
            {t('detail.when')} {new Date(request.whenISO).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" })}
          </p>

          {full ? (
            <div className="mt-8 flex flex-col items-center justify-center p-6 text-center bg-[color:var(--bamboo)]/10 rounded-2xl border border-[color:var(--bamboo)]/30">
              <HeartHandshake className="h-10 w-10 text-[color:var(--bamboo-deep)] mb-3" />
              <h3 className="font-display text-lg font-bold text-[color:var(--bamboo-deep)] mb-1">Target Reached!</h3>
              <p className="text-sm font-medium text-muted-foreground">
                The community has already fulfilled the requested help for this. Thank you!
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-8">
              <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-foreground">{t('detail.join')}</h4>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t('detail.name')}</label>
                  <input
                    placeholder={t('detail.name.ph')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border-2 border-transparent bg-muted/50 px-4 py-3 text-sm font-medium outline-none transition focus:border-[color:var(--bamboo)]/50 focus:bg-background focus:ring-4 focus:ring-[color:var(--bamboo)]/10"
                  />
                </div>
                <div className="flex-[1.5] space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t('detail.contribution')}</label>
                  <input
                    placeholder={t('detail.contribution.ph')}
                    value={contribution}
                    onChange={(e) => setContribution(e.target.value)}
                    className="w-full rounded-2xl border-2 border-transparent bg-muted/50 px-4 py-3 text-sm font-medium outline-none transition focus:border-[color:var(--bamboo)]/50 focus:bg-background focus:ring-4 focus:ring-[color:var(--bamboo)]/10"
                  />
                </div>
                <Button type="submit" disabled={full} variant="primary" className="h-[48px] shrink-0 sm:mb-[2px]">
                  {t('detail.btn.help')}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-sm">
        <h3 className="font-display text-2xl font-bold">{t('detail.commitments')}</h3>
        {request.commitments.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-border p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6" /><path d="M22 11h-6" /></svg>
            </div>
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              {t('detail.empty.1')}<br />{t('detail.empty.2')}
            </p>
          </div>
        ) : (
          <ul className="mt-6 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[color:var(--bamboo)]/50 hover:[&::-webkit-scrollbar-thumb]:bg-[color:var(--bamboo)]">
            {request.commitments.map((c, i) => (
              <li key={i} className="shrink-0 w-[280px] snap-start">
                <button
                  onClick={() => setSelectedCommitment({ name: c.volunteerName, contribution: c.contribution, index: i + 1 })}
                  className="flex w-full items-center gap-4 rounded-2xl border border-border/50 bg-muted/20 p-4 text-left transition hover:bg-muted/40 hover:shadow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--capiz)] font-display text-xl font-bold text-[color:var(--nipa-deep)] shadow-inner">
                    {c.volunteerName.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-base font-bold text-foreground">{c.volunteerName}</p>
                    <p className="truncate text-sm font-medium text-muted-foreground">{c.contribution}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-muted/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {t('detail.pole')} #{i + 1}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedCommitment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-card shadow-2xl shadow-black/20 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center p-8 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[color:var(--capiz)] font-display text-4xl font-bold text-[color:var(--nipa-deep)] shadow-inner">
                {selectedCommitment.name.slice(0, 1).toUpperCase()}
              </div>
              <span className="mb-2 rounded-full bg-[color:var(--bamboo)]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[color:var(--bamboo-deep)]">
                {t('detail.pole')} #{selectedCommitment.index}
              </span>
              <h3 className="font-display text-2xl font-bold text-foreground">
                {selectedCommitment.name}
              </h3>
              <p className="mt-4 text-sm font-medium leading-relaxed text-muted-foreground">
                "{selectedCommitment.contribution}"
              </p>
              <Button
                variant="soft"
                className="mt-8 w-full"
                onClick={() => setSelectedCommitment(null)}
              >
                {t('detail.close')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {isDescModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-card shadow-2xl shadow-black/20 animate-in zoom-in-95 duration-200 p-8">
            <h3 className="font-display text-2xl font-bold text-foreground">
              Description
            </h3>
            <p className="mt-4 text-sm font-medium leading-relaxed text-muted-foreground whitespace-pre-wrap break-words max-h-[60vh] overflow-y-auto">
              {request.needs}
            </p>
            <Button
              variant="soft"
              className="mt-8 w-full"
              onClick={() => setIsDescModalOpen(false)}
            >
              {t('detail.close')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
