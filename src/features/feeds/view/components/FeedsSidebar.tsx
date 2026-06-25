import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useFeedsViewModel } from "../../viewmodel/useFeedsViewModel";
import { useLanguage } from "@/contexts/LanguageContext";

function MiniCalendar({
  allRequests,
  selectedDate,
  onSelectDate
}: {
  allRequests: any[],
  selectedDate: string | null,
  onSelectDate: (d: string | null) => void
}) {
  const [currentMonth, setCurrentMonth] = useState(() => new Date(2026, 5, 1)); // Default June 2026 based on mock data

  const eventDates = useMemo(() => {
    const dates = new Set<string>();
    allRequests.forEach(r => {
      if (r.whenISO) {
        const d = r.whenISO.split('T')[0];
        dates.add(d);
      }
    });
    return dates;
  }, [allRequests]);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="mt-2 bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
      <div className="flex items-center justify-between mb-4 text-white">
        <button onClick={prevMonth} className="p-1 hover:bg-white/20 rounded-full transition-colors"><ChevronLeft className="h-4 w-4" /></button>
        <span className="font-bold text-sm tracking-wider uppercase">{monthName}</span>
        <button onClick={nextMonth} className="p-1 hover:bg-white/20 rounded-full transition-colors"><ChevronRight className="h-4 w-4" /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-widest mb-2 text-white/50">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const hasEvent = eventDates.has(dateStr);
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={dateStr}
              disabled={!hasEvent}
              onClick={() => onSelectDate(isSelected ? null : dateStr)}
              className={`
                h-8 w-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${hasEvent ? 'cursor-pointer hover:scale-110' : 'opacity-30 cursor-not-allowed'}
                ${isSelected ? 'bg-red-500 text-white shadow-lg shadow-red-500/40 ring-2 ring-white ring-offset-2 ring-offset-[#2b5c38]' :
                  hasEvent ? 'bg-red-500/80 text-white hover:bg-red-400' : 'text-white/50'}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface FeedsSidebarProps {
  vm: ReturnType<typeof useFeedsViewModel>;
  onSelectPost: (id: string) => void;
}

export function FeedsSidebar({ vm, onSelectPost }: FeedsSidebarProps) {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const displayedMiniEvents = useMemo(() => {
    if (vm.selectedDate) {
      return vm.allRequests.filter((r: any) => r.whenISO.startsWith(vm.selectedDate)).slice(0, 3);
    }
    return [...vm.allRequests]
      .sort((a, b) => new Date(a.whenISO).getTime() - new Date(b.whenISO).getTime())
      .slice(0, 3);
  }, [vm.allRequests, vm.selectedDate]);

  const sidebarContent = (
    <div className="sticky top-28 space-y-4">
      {/* CTA Banner (Schedule Planning) */}
      <div className="relative overflow-hidden rounded-3xl bg-[color:var(--primary)] p-5 sm:p-6 text-[color:var(--primary-foreground)] shadow-xl transition duration-300 hover:-translate-y-1">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[color:var(--nipa)] opacity-20 blur-3xl"></div>
        <div className="relative z-10 flex flex-col gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[color:var(--bamboo)]">Calendar</span>
            <h2 className="font-display text-lg sm:text-xl font-bold leading-tight">Upcoming Community Efforts</h2>
            <p className="text-sm text-[color:var(--primary-foreground)]/80">View and coordinate large-scale Bayanihan events ahead of time.</p>
          </div>
          <MiniCalendar allRequests={vm.allRequests} selectedDate={vm.selectedDate} onSelectDate={vm.setSelectedDate} />
        </div>
      </div>

      {/* Mini Results List */}
      <div className="bg-card rounded-3xl border border-border/60 shadow-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-foreground text-sm">
            {vm.selectedDate
              ? `Showing events for ${new Date(vm.selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
              : "Upcoming Events"}
          </h3>
          {vm.selectedDate && (
            <button onClick={() => vm.setSelectedDate(null)} className="text-xs font-bold text-muted-foreground hover:text-[color:var(--terracotta)] transition-colors">
              Clear Filter
            </button>
          )}
        </div>
        <div className="space-y-3">
          {displayedMiniEvents.length > 0 ? (
            displayedMiniEvents.map((event: any) => (
              <div key={event.id} onClick={() => onSelectPost(event.id)} className="flex gap-3 bg-muted/30 rounded-2xl p-3 border border-border/40 hover:bg-muted/50 transition-colors cursor-pointer group">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--capiz)] font-display font-bold text-[color:var(--nipa-deep)] text-sm shadow-inner group-hover:scale-105 transition-transform">
                  {event.title.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col overflow-hidden justify-center">
                  <span className="font-bold text-sm text-foreground truncate group-hover:text-[color:var(--bamboo-deep)] transition-colors">{t(event.title)}</span>
                  <span className="text-xs text-muted-foreground truncate">{t(event.neighborhood)}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4 italic">No events scheduled.</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile: Collapsible toggle button + dropdown */}
      <div className="block lg:hidden w-full">
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="w-full flex items-center justify-between px-5 py-3 bg-card border border-border/50 rounded-2xl shadow-sm font-bold text-sm text-foreground hover:bg-muted/40 transition-colors"
        >
          <span>📅 Calendar & Upcoming Events</span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${mobileOpen ? 'rotate-180' : ''}`} />
        </button>
        {mobileOpen && (
          <div className="mt-3 animate-in slide-in-from-top-2 duration-200">
            {sidebarContent}
          </div>
        )}
      </div>

      {/* Desktop: Full sidebar */}
      <aside className="w-[340px] xl:w-[360px] shrink-0 hidden lg:block">
        {sidebarContent}
      </aside>
    </>
  );
}
