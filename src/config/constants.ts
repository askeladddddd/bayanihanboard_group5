// src/config/constants.ts
export const APP_NAME = "Bayanihan Board";
export const APP_TAGLINE = "A community help wall, lifted by neighbors.";
export const REQUEST_TYPES = ["moving", "medical", "fundraiser", "other"] as const;
export const TYPE_LABEL: Record<(typeof REQUEST_TYPES)[number], string> = {
    moving: "Moving House",
    medical: "Medical Emergency",
    fundraiser: "Fundraiser / Wake",
    other: "Other",
};