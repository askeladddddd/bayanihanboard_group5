import { useState } from 'react';
import { RequestList, RequestDetail } from './features/request-flow/view/RequestView';
import { ProgressView } from './features/visual-progress/view/ProgressView';
import { useRequestViewModel } from './features/request-flow/viewmodel/useRequestViewModel';
import { CreateRequestView } from './features/create-request/view/CreateRequestView';
import { Button } from './shared-components/Button/Button';
import { BellRing, CalendarDays, HeartHandshake, Languages, Search } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';

export default function App() {
  const { requests, active, activeId, setActiveId, addRequest, commit } = useRequestViewModel();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { language, toggleLanguage, t } = useLanguage();

  const filteredRequests = requests.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.needs.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Glass Header - Full Width */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--bamboo)]/15 shadow-sm">
              <HeartHandshake className="h-7 w-7 text-[color:var(--bamboo-deep)]" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">{t('app.title')}</h1>
              <p className="text-sm font-medium text-muted-foreground">{t('app.subtitle')}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('nav.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-64 rounded-full border border-border/50 bg-muted/30 pl-10 pr-4 text-sm font-medium outline-none transition focus:border-[color:var(--bamboo)]/50 focus:bg-background focus:ring-2 focus:ring-[color:var(--bamboo)]/20"
              />
            </div>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="font-semibold text-muted-foreground transition hover:text-[color:var(--bamboo-deep)]"
            >
              {t('nav.post')}
            </button>
            <a href="#plan-big" className="font-semibold text-muted-foreground transition hover:text-foreground">{t('nav.plan')}</a>
            <button onClick={toggleLanguage} className="flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground transition hover:bg-muted/80">
              <Languages className="h-4 w-4" />
              {language === 'en' ? 'EN' : 'TL'}
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-16 px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="flex flex-col gap-12 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center rounded-full border border-[color:var(--bamboo)]/20 bg-[color:var(--bamboo)]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[color:var(--bamboo-deep)] shadow-sm">
              {t('hero.badge')}
            </div>
            <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:leading-[1.1]">
              {t('hero.title.1')}<span className="bg-gradient-to-r from-[color:var(--bamboo)] to-[color:var(--nipa)] bg-clip-text text-transparent">{t('hero.title.2')}</span>{t('hero.title.3')}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t('hero.desc')}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button onClick={() => setCreateModalOpen(true)} className="h-12 px-8 text-base shadow-lg shadow-[color:var(--bamboo)]/20 hover:-translate-y-0.5">
                {t('hero.btn.post')}
              </Button>

            </div>
          </div>
          <div className="flex-1 lg:max-w-[500px]">
            <ProgressView request={active} />
          </div>
        </section>

        {/* Alert Banner */}
        <div className="group relative overflow-hidden rounded-3xl border border-[color:var(--terracotta)]/20 bg-[color:var(--terracotta)]/5 p-6 shadow-sm transition hover:shadow-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--terracotta)]/20 text-[color:var(--terracotta)]">
              <BellRing className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--terracotta)]">
                {t('alert.badge')}
              </span>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground">
                <span className="flex items-center gap-1.5 font-medium">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  {t('alert.event1')} <span className="text-muted-foreground">{t('alert.event1.date')}</span>
                </span>
                <span className="hidden text-muted-foreground sm:inline">•</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  {t('alert.event2')} <span className="text-muted-foreground">{t('alert.event2.date')}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Request Flow MVVM */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <RequestList requests={filteredRequests} activeId={activeId} onSelect={setActiveId} />
          <RequestDetail request={active} onCommit={(name, cont) => commit(activeId, { volunteerName: name, contribution: cont })} />
        </div>

        <CreateRequestView
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={addRequest}
        />

        {/* CTA Banner */}
        <div id="plan-big" className="relative overflow-hidden rounded-3xl bg-[color:var(--primary)] px-6 py-12 text-[color:var(--primary-foreground)] shadow-xl transition duration-300 hover:-translate-y-1 sm:px-12 sm:py-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[color:var(--nipa)] opacity-20 blur-3xl"></div>
          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--bamboo)]">
                {t('cta.badge')}
              </span>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                {t('cta.title')}
              </h2>
              <p className="text-lg text-[color:var(--primary-foreground)]/80">
                {t('cta.desc')}
              </p>
            </div>
            <Button
              variant="accent"
              className="h-14 shrink-0 px-8 text-lg font-bold shadow-lg shadow-[color:var(--terracotta)]/30 hover:-translate-y-1 hover:shadow-xl"
              onClick={() => alert("Redirecting to the scheduling calendar... (Feature coming soon!)")}
            >
              {t('cta.btn')}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
