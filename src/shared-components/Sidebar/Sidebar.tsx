import { X, Trophy, Newspaper, Siren, Home, Plus, Languages } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeFeature: string;
  setActiveFeature: (feature: string) => void;
  onOpenCreateModal?: () => void;
  language: 'en' | 'tl';
  onToggleLanguage: () => void;
}

export function Sidebar({ isOpen, onClose, activeFeature, setActiveFeature, onOpenCreateModal, language, onToggleLanguage }: SidebarProps) {
  const menuItems = [
    { id: 'feed', label: 'Home (Feeds)', icon: Home, colorClass: 'text-[color:var(--bamboo-deep)]', activeBg: 'bg-[color:var(--bamboo)]/15', activeText: 'text-[color:var(--bamboo-deep)]' },
    { id: 'leaderboard', label: 'Community Leaderboard', icon: Trophy, colorClass: 'text-yellow-500', activeBg: 'bg-yellow-500/15', activeText: 'text-yellow-600' },
    { id: 'news', label: 'Local News & Alerts', icon: Newspaper, colorClass: 'text-blue-500', activeBg: 'bg-blue-500/15', activeText: 'text-blue-600' },
    { id: 'hotlines', label: 'Emergency Hotlines', icon: Siren, colorClass: 'text-red-500', activeBg: 'bg-red-500/15', activeText: 'text-red-600' },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity pointer-events-none lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-background border-r border-border/40 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-border/40">
          <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">Menu</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground transition hover:bg-muted/80"
              aria-label="Toggle language"
            >
              <Languages className="h-4 w-4" />
              {language === 'en' ? 'EN' : 'TL'}
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = activeFeature === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveFeature(item.id);
                  if (window.innerWidth < 1024) onClose(); // Close sidebar on mobile after selection
                }}
                className={`w-full flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-200 group ${isActive
                    ? `${item.activeBg} ${item.activeText} shadow-sm`
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
              >
                <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'} ${item.colorClass}`}>
                  <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                </div>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-border/40 bg-muted/10">
          <p className="text-xs text-muted-foreground text-center font-medium">Bayanihan Board v1.0</p>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/40 flex items-center justify-around px-2 py-2 lg:hidden safe-area-pb">
        {menuItems.map((item) => {
          const isActive = activeFeature === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveFeature(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[56px] ${
                isActive ? `${item.activeBg} ${item.activeText}` : 'text-muted-foreground'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? '' : item.colorClass}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
        {onOpenCreateModal && (
          <button
            onClick={onOpenCreateModal}
            className="flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl text-muted-foreground hover:text-foreground transition-all min-w-[56px]"
          >
            <Plus className="h-5 w-5 text-[color:var(--bamboo-deep)]" strokeWidth={2.5} />
            <span className="text-[10px] font-bold text-[color:var(--bamboo-deep)]">Post</span>
          </button>
        )}
      </nav>
    </>
  );
}
