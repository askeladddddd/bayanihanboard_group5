// src/mock/mockRequestsDb.ts
import type { HelpRequest } from "@/features/request-flow/model/RequestModel";

export const mockRequestsDb: HelpRequest[] = [
  {
    id: "req-101",
    title: "Bayanihan Move: Mang Juan's House",
    type: "moving",
    neighborhood: "Brgy. Maligaya, Quezon City",
    needs: "Lifters for the bahay kubo, a small truck, and a midday meal.",
    whenISO: "2026-06-29T08:00",
    targetVolunteers: 6,
    currentVolunteers: 2,
    commitments: [
      { volunteerName: "Alejandro", contribution: "Heavy lifting labor" },
      { volunteerName: "Maricel", contribution: "Lunch for the crew" },
    ],
  },
  {
    id: "req-102",
    title: "Aling Rosa's Dialysis Ride",
    type: "medical",
    neighborhood: "Brgy. San Roque, Pasig",
    needs: "Drivers for round-trip dialysis visits Tue/Thu/Sat.",
    whenISO: "2026-06-24T06:00",
    targetVolunteers: 4,
    currentVolunteers: 1,
    commitments: [{ volunteerName: "Kuya Ramon", contribution: "Tuesday driver" }],
  },
  {
    id: "req-103",
    title: "Lolo Ben's Wake — Food Brigade",
    type: "fundraiser",
    neighborhood: "Brgy. Bagong Silang, Caloocan",
    needs: "Pancit, kape, and pandesal donations for three evenings.",
    whenISO: "2026-06-23T18:00",
    targetVolunteers: 8,
    currentVolunteers: 5,
    commitments: [
      { volunteerName: "Tita Beng", contribution: "2 bilao pancit" },
      { volunteerName: "Nanay Cora", contribution: "Coffee & sugar" },
      { volunteerName: "Jomar", contribution: "Pandesal (50 pcs)" },
      { volunteerName: "Liza", contribution: "Plastic cups & utensils" },
      { volunteerName: "Mang Tonio", contribution: "Folding chairs" },
    ],
  },
];