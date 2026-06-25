import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { mockRequestsDb } from '@/mock/mockRequestsDb';
import type { Commitment, HelpRequest } from '../features/requests/model/RequestModel';

export interface NewRequestInput {
  title: string;
  type: string;
  customType?: string;
  neighborhood: string;
  needs: string;
  whenISO: string;
  targetVolunteers: number;
  imageUrl?: string;
  imageUrls?: string[];
}

interface RequestsContextType {
  requests: HelpRequest[];
  addRequest: (input: NewRequestInput) => HelpRequest;
  commit: (id: string, c: Commitment) => void;
  replyToCommitment: (reqId: string, commitmentId: string, reply: import('../features/requests/model/RequestModel').Reply) => void;
}

const RequestsContext = createContext<RequestsContextType | null>(null);

export function RequestsProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<HelpRequest[]>(() => [...mockRequestsDb]);

  const addRequest = useCallback((input: NewRequestInput): HelpRequest => {
    const req: HelpRequest = {
      id: `req-${Math.random().toString(36).slice(2, 8)}`,
      title: input.title,
      type: input.type as any,
      customType: input.customType,
      neighborhood: input.neighborhood,
      needs: input.needs,
      whenISO: input.whenISO,
      targetVolunteers: Math.max(1, Math.min(50, input.targetVolunteers)),
      currentVolunteers: 0,
      commitments: [],
      imageUrl: input.imageUrls && input.imageUrls.length > 0 ? input.imageUrls[0] : input.imageUrl,
      imageUrls: input.imageUrls,
    };
    setRequests((prev) => [req, ...prev]);
    return req;
  }, []);

  const commit = useCallback((id: string, c: Commitment) => {
    setRequests((rs) =>
      rs.map((r) =>
        r.id === id && r.currentVolunteers < r.targetVolunteers
          ? { ...r, currentVolunteers: r.currentVolunteers + 1, commitments: [...r.commitments, c] }
          : r,
      ),
    );
  }, []);

  const replyToCommitment = useCallback((reqId: string, commitmentId: string, reply: import('../features/requests/model/RequestModel').Reply) => {
    setRequests((rs) =>
      rs.map((r) => {
        if (r.id !== reqId) return r;
        return {
          ...r,
          commitments: r.commitments.map((c) => {
            if (c.id !== commitmentId) return c;
            return { ...c, replies: [...(c.replies || []), reply] };
          })
        };
      })
    );
  }, []);

  return (
    <RequestsContext.Provider value={{ requests, addRequest, commit, replyToCommitment }}>
      {children}
    </RequestsContext.Provider>
  );
}

export function useRequestsContext() {
  const ctx = useContext(RequestsContext);
  if (!ctx) throw new Error('useRequestsContext must be used within <RequestsProvider>');
  return ctx;
}
