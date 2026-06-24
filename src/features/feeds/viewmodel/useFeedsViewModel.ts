import { useState, useMemo } from 'react';
import { useRequestViewModel } from '../../requests/viewmodel/useRequestViewModel';

export function useFeedsViewModel(searchQuery: string) {
  const { requests, commit } = useRequestViewModel();

  // Track which post's "Help" section is currently open
  const [activeHelpId, setActiveHelpId] = useState<string | null>(null);

  // Form state for helping
  const [helpName, setHelpName] = useState("");
  const [helpContribution, setHelpContribution] = useState("");

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredRequests = useMemo(() => {
    let result = requests;

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(r =>
        r.title.toLowerCase().includes(lowerQuery) ||
        r.neighborhood.toLowerCase().includes(lowerQuery) ||
        r.needs.toLowerCase().includes(lowerQuery)
      );
    }

    return result;
  }, [requests, searchQuery]);

  const toggleHelpSection = (reqId: string) => {
    setActiveHelpId(prev => {
      // If opening a new one, clear the form
      if (prev !== reqId) {
        setHelpName("");
        setHelpContribution("");
        return reqId;
      }
      return null;
    });
  };

  const submitHelp = (reqId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!helpName.trim() || !helpContribution.trim()) return;

    // Call the commit function to add volunteer
    commit(reqId, {
      volunteerName: helpName,
      contribution: helpContribution
    });

    // Close and reset form
    setActiveHelpId(null);
    setHelpName("");
    setHelpContribution("");
  };

  // Track which animations are visible (hidden by default)
  const [visibleAnimations, setVisibleAnimations] = useState<string[]>([]);

  const toggleAnimation = (reqId: string) => {
    setVisibleAnimations(prev =>
      prev.includes(reqId) ? prev.filter(id => id !== reqId) : [...prev, reqId]
    );
  };

  return {
    requests: filteredRequests,
    allRequests: requests,
    selectedDate,
    setSelectedDate,
    activeHelpId,
    toggleHelpSection,
    helpName,
    setHelpName,
    helpContribution,
    setHelpContribution,
    submitHelp,
    visibleAnimations,
    toggleAnimation
  };
}
