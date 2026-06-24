import { useState } from "react";
import type { NewsModel } from "../model/NewsModel";

export function useNewsViewModel() {
  const [news] = useState<NewsModel[]>([
    { id: "1", title: "Typhoon Warning Update", date: "2026-06-25" },
    { id: "2", title: "Community Center Open", date: "2026-06-24" },
  ]);
  return { news };
}
