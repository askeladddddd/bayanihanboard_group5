// src/features/request-flow/useRequestViewModel.ts
import { useCallback, useState } from "react";
import { mockRequestsDb } from "@/mock/mockRequestsDb";
import type { Commitment, HelpRequest, RequestType } from "../model/RequestModel";

export interface NewRequestInput {
    title: string;
    type: RequestType;
    neighborhood: string;
    needs: string;
    whenISO: string;
    targetVolunteers: number;
}

export function useRequestViewModel() {
    const [requests, setRequests] = useState<HelpRequest[]>(() => [...mockRequestsDb]);
    const [activeId, setActiveId] = useState<string>(mockRequestsDb[0]?.id ?? "");

    const addRequest = useCallback((input: NewRequestInput) => {
        const req: HelpRequest = {
            id: `req-${Math.random().toString(36).slice(2, 8)}`,
            ...input,
            targetVolunteers: Math.max(1, Math.min(50, input.targetVolunteers)),
            currentVolunteers: 0,
            commitments: [],
        };
        setRequests((r) => [req, ...r]);
        setActiveId(req.id);
        return req;
    }, []);

    const commit = useCallback((id: string, c: Commitment) => {
        setRequests((rs) =>
            rs.map((r) =>
                r.id === id && r.currentVolunteers < r.targetVolunteers
                    ? {
                        ...r,
                        currentVolunteers: r.currentVolunteers + 1,
                        commitments: [...r.commitments, c],
                    }
                    : r,
            ),
        );
    }, []);

    const active = requests.find((r) => r.id === activeId) ?? requests[0];

    return { requests, active, activeId, setActiveId, addRequest, commit };
}
