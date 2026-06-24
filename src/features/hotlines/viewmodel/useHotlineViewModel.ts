import { useState } from "react";
import type { HotlineModel } from "../model/HotlineModel";

export function useHotlineViewModel() {
  const [hotlines] = useState<HotlineModel[]>([
    { id: "1", name: "National Emergency", number: "911" },
    { id: "2", name: "Red Cross", number: "143" },
  ]);
  return { hotlines };
}
