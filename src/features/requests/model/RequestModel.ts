// src/features/request-flow/RequestModel.ts
export type RequestType = "moving" | "medical" | "fundraiser" | "other";

export interface Reply {
    id: string;
    authorName: string;
    content: string;
    createdAtISO: string;
}

export interface Commitment {
    id: string;
    volunteerName: string;
    contribution: string;
    replies?: Reply[];
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
    imageUrls?: string[];
}
