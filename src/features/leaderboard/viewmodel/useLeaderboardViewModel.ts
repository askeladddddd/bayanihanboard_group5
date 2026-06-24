import { useState } from "react";
import type { LeaderboardModel } from "../model/LeaderboardModel";

export function useLeaderboardViewModel() {
  const [entries] = useState<LeaderboardModel[]>([
    { id: "1", name: "Top Helper 1", points: 1500 },
    { id: "2", name: "Top Helper 2", points: 1200 },
  ]);
  return { entries };
}
