// src/features/request-flow/RequestModel.ts
export type RequestType = "moving" | "medical" | "fundraiser" | "other";

export interface Commitment {
    volunteerName: string;
    contribution: string;
}

export interface HelpRequest {
    id: string;
    title: string;
    type: RequestType;
    customType?: string;
    neighborhood: string;
    needs: string;
    whenISO: string;
    targetVolunteers: number;
    currentVolunteers: number;
    commitments: Commitment[];
    imageUrl?: string;
}
