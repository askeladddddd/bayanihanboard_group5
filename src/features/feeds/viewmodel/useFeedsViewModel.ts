import { useState, useMemo } from 'react';
import { useRequestsContext } from '@/contexts/RequestsContext';

export function useFeedsViewModel(searchQuery: string) {
  const { requests: rawRequests } = useRequestsContext();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [visibleAnimations, setVisibleAnimations] = useState<string[]>([]);

  const filteredRequests = useMemo(() => {
    let result = [...rawRequests];

    if (filterCategory !== 'all') {
      result = result.filter(r => r.type === filterCategory);
    }

    if (selectedDate) {
      result = result.filter(r => r.whenISO.startsWith(selectedDate));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        r =>
          r.title.toLowerCase().includes(q) ||
          r.neighborhood.toLowerCase().includes(q) ||
          r.needs.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'urgent') {
      result.sort((a, b) => {
        const gapA = a.targetVolunteers - a.currentVolunteers;
        const gapB = b.targetVolunteers - b.currentVolunteers;
        return gapB - gapA;
      });
    }

    return result;
  }, [rawRequests, searchQuery, selectedDate, filterCategory, sortBy]);

  const toggleAnimation = (reqId: string) => {
    setVisibleAnimations(prev =>
      prev.includes(reqId) ? prev.filter(id => id !== reqId) : [...prev, reqId]
    );
  };

  return {
    requests: filteredRequests,
    allRequests: rawRequests,
    selectedDate,
    setSelectedDate,
    visibleAnimations,
    toggleAnimation,
    filterCategory,
    setFilterCategory,
    sortBy,
    setSortBy
  };
}
