import { useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Languages, Search, Menu, CheckCircle2, X as XIcon, Copy, HelpCircle } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { useRequestsContext } from './contexts/RequestsContext';
import { FeedsView } from './features/feeds/view/FeedsView';
import { CreateRequestView } from './features/post-request/view/CreateRequestView';
import { Sidebar } from './shared-components/Sidebar/Sidebar';
import { PostDetailStandaloneView } from './features/feeds/view/components/PostDetailStandaloneView';
import { FAQModal } from './shared-components/FAQModal/FAQModal';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useEffect } from 'react';
import mainBackgroundImage from './assets/main_backgroundimage.png';
import appLogo from './assets/logo.png';

export default function App() {
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const { addRequest } = useRequestsContext();

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFeature, setActiveFeature] = useState('feed');
  const [isFaqOpen, setFaqOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to show off the premium loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      popoverClass: 'bayanihan-driver-theme',
      steps: [
        {
          popover: {
            title: 'Welcome to Bayanihan Board!',
            description: 'This is a community-driven platform to ask for help or offer assistance to your community.'
          }
        },
        {
          element: '.driver-post-help',
          popover: {
            title: 'Posting for Help',
            description: 'Need something? Click here to post a request for your community.',
            side: 'left',
            align: 'start'
          }
        },
        {
          element: '.driver-feed-card',
          popover: {
            title: 'Interactive Requests',
            description: 'Click anywhere on a card to open its details. Inside, you can flip the card to see the Kubo progress build up based on community commitments!',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '.driver-offer-help',
          popover: {
            title: 'Submitting Helps',
            description: 'Ready to pitch in? Click this button to commit your resources or time to a request.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '.driver-comments',
          popover: {
            title: 'Comments & Replies',
            description: 'Discuss the details with the requester and other volunteers right here in the comments section.',
            side: 'top',
            align: 'start'
          }
        }
      ]
    });
    driverObj.drive();
  };

  useEffect(() => {
    if (localStorage.getItem('driverTourCompleted') !== 'true') {
      setTimeout(() => {
        startTour();
        localStorage.setItem('driverTourCompleted', 'true');
      }, 500);
    }
  }, []);

  // Success toast state
  const [showSuccess, setShowSuccess] = useState(false);
  const [successTitle, setSuccessTitle] = useState('');

  // Share/Copy toast state
  const [showCopied, setShowCopied] = useState(false);

  const handleSharePost = (postId: string) => {
    const url = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(url).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 3000);
    });
  };

  const handlePostSubmit = (input: any) => {
    addRequest(input);
    setCreateModalOpen(false);
    setSuccessTitle(input.title);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#fdfbf7] via-[#f8f5ee] to-[#e8e0d0]">
        {/* Ambient glow */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[color:var(--bamboo)]/8 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[color:var(--nipa)]/8 blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center gap-8">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* SVG spinner - smooth rotation, no jitter */}
            <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="var(--bamboo)" strokeWidth="4" strokeOpacity="0.15" />
              <circle cx="50" cy="50" r="44" fill="none" stroke="var(--bamboo)" strokeWidth="4" strokeDasharray="276" strokeDashoffset="69" strokeLinecap="round" />
            </svg>

            {/* Inner logo */}
            <div className="absolute inset-2 bg-white/90 rounded-full p-4 shadow-sm overflow-hidden flex items-center justify-center">
              <img src={appLogo} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <h2 className="font-display text-3xl font-bold text-[color:var(--bamboo-deep)] tracking-tight">Bayanihan Board</h2>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--bamboo)]/70">Loading Community</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${mainBackgroundImage})` }}
    >

      {isFaqOpen && <FAQModal onClose={() => setFaqOpen(false)} />}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeFeature={activeFeature}
        setActiveFeature={setActiveFeature}
        onOpenCreateModal={() => setCreateModalOpen(true)}
        language={language}
        onToggleLanguage={toggleLanguage}
      />

      <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:pl-72' : ''}`}>
        {/* Sticky Glass Header */}
        <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 py-4 backdrop-blur-md relative">
          <button
            onClick={() => setSidebarOpen(true)}
            className={`absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-muted/50 transition-colors text-foreground z-10 ${isSidebarOpen ? 'lg:hidden' : ''}`}
          >
            <Menu className="h-7 w-7" />
          </button>

          <div className="mx-auto flex max-w-[1600px] items-center justify-between pl-16 pr-4 sm:pl-20 sm:pr-6 lg:px-8">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
                <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm overflow-hidden">
                  <img src={appLogo} alt="Bayanihan Board Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h1 className="hidden md:block font-display text-2xl font-bold tracking-tight text-foreground">{t('app.title')}</h1>
                  <p className="hidden md:block text-sm font-medium text-muted-foreground">{t('app.subtitle')}</p>
                </div>
              </Link>
            </div>

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
                onClick={() => setFaqOpen(true)}
                className="hidden md:flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground transition hover:bg-muted/80"
              >
                <HelpCircle className="h-4 w-4" />
                FAQ
              </button>
              <button onClick={toggleLanguage} className="hidden md:flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground transition hover:bg-muted/80">
                <Languages className="h-4 w-4" />
                {language === 'en' ? 'EN' : 'TL'}
              </button>
            </nav>
          </div>
        </header>

        <main className="w-full pb-24">
          <Routes>
            <Route path="/" element={
              <FeedsView
                searchQuery={searchQuery}
                onOpenCreateModal={() => setCreateModalOpen(true)}
                activeFeature={activeFeature}
                onSharePost={handleSharePost}
              />
            } />
            <Route path="/post/:postId" element={
              <PostRouteWrapper
                onSharePost={handleSharePost}
                onNavigateToFeed={() => navigate('/')}
              />
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <CreateRequestView
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handlePostSubmit}
        />

        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-[#1b4d24] text-white px-6 py-4 rounded-2xl shadow-[0_8px_32px_rgba(27,77,36,0.45)] animate-in slide-in-from-bottom-4 duration-300 min-w-[320px] max-w-sm">
            <CheckCircle2 className="h-5 w-5 text-[#7dcf82] shrink-0" strokeWidth={2.5} />
            <div className="flex-1">
              <p className="font-bold text-sm">Request posted!</p>
              <p className="text-white/70 text-xs mt-0.5 truncate">"{successTitle}" is now live on the board.</p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="text-white/60 hover:text-white transition-colors ml-1"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        )}
        {/* Share Copied Toast */}
        {showCopied && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-stone-800 text-white px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300 min-w-[280px]">
            <Copy className="h-5 w-5 text-[color:var(--bamboo)] shrink-0" />
            <div className="flex-1">
              <p className="font-bold text-sm">Link copied!</p>
              <p className="text-white/70 text-xs mt-0.5">Share this link to let others view the post.</p>
            </div>
            <button onClick={() => setShowCopied(false)} className="text-white/60 hover:text-white transition-colors ml-1">
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Route component for /post/:postId — enables deep linking via shared URL
function PostRouteWrapper({ onSharePost, onNavigateToFeed }: {
  onSharePost: (id: string) => void;
  onNavigateToFeed: () => void;
}) {
  const { postId } = useParams<{ postId: string }>();
  const { requests } = useRequestsContext();
  const navigate = useNavigate();

  const post = requests.find(r => r.id === postId);
  const otherPosts = requests.filter(r => r.id !== postId);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
        <p className="text-2xl font-bold text-foreground">Post not found</p>
        <p className="text-muted-foreground">This post may have been removed or the link is invalid.</p>
        <button
          onClick={onNavigateToFeed}
          className="mt-2 px-6 py-2.5 rounded-xl bg-[color:var(--bamboo)] text-white font-bold hover:bg-[color:var(--bamboo-deep)] transition-colors"
        >
          Back to Feed
        </button>
      </div>
    );
  }

  return (
    <PostDetailStandaloneView
      r={post}
      onClose={onNavigateToFeed}
      otherRequests={otherPosts}
      onSelectPost={(id: string) => navigate(`/post/${id}`)}
      onShare={onSharePost}
    />
  );
}
