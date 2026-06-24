import { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { HeartHandshake, Languages, Plus, Search, Menu } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { FeedsView } from './features/feeds/view/FeedsView';
import { CreateRequestView } from './features/post-request/view/CreateRequestView';
import { useRequestViewModel } from './features/requests/viewmodel/useRequestViewModel';
import { Sidebar } from './shared-components/Sidebar/Sidebar';

// Feature views are now dynamically rendered inside FeedsView

export default function App() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFeature, setActiveFeature] = useState("feed");
  const { addRequest } = useRequestViewModel();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeFeature={activeFeature}
        setActiveFeature={setActiveFeature}
      />

      <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:pl-72' : ''}`}>
        {/* Sticky Glass Header - Full Width */}
        <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 py-4 backdrop-blur-md relative">
          {/* Hamburger Menu - Absolute Left Corner */}
          <button
            onClick={() => setSidebarOpen(true)}
            className={`absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-muted/50 transition-colors text-foreground z-10 ${isSidebarOpen ? 'lg:hidden' : ''}`}
          >
            <Menu className="h-7 w-7" />
          </button>

          <div className="mx-auto flex max-w-[1600px] items-center justify-between pl-16 pr-4 sm:pl-20 sm:pr-6 lg:px-8">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
                <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--bamboo)]/15 shadow-sm">
                  <HeartHandshake className="h-7 w-7 text-[color:var(--bamboo-deep)]" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="hidden md:block font-display text-2xl font-bold tracking-tight text-foreground">{t('app.title')}</h1>
                  <p className="hidden md:block text-sm font-medium text-muted-foreground">{t('app.subtitle')}</p>
                </div>
              </Link>
            </div>

            {/* Search Bar centered in header */}
            <div className="relative flex-1 max-w-md mx-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search feeds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-full border-2 border-transparent bg-muted/50 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-[color:var(--bamboo)]/50 focus:bg-background focus:ring-4 focus:ring-[color:var(--bamboo)]/10"
              />
            </div>

            <nav className="flex items-center gap-2 md:gap-4 shrink-0">
              <button
                onClick={() => setCreateModalOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--bamboo)] text-white shadow-md hover:bg-[color:var(--bamboo-deep)] transition-colors"
                aria-label="Post for Help"
              >
                <Plus className="h-6 w-6" strokeWidth={3} />
              </button>
              <button onClick={toggleLanguage} className="hidden md:flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground transition hover:bg-muted/80">
                <Languages className="h-4 w-4" />
                {language === 'en' ? 'EN' : 'TL'}
              </button>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] px-4 pb-24 pt-12 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={
              <FeedsView
                searchQuery={searchQuery}
                onOpenCreateModal={() => setCreateModalOpen(true)}
                activeFeature={activeFeature}
              />
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <CreateRequestView
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={(input) => {
            addRequest(input);
            setCreateModalOpen(false);
          }}
        />
      </div>
    </div>
  );
}
