// src/features/visual-progress/useProgressViewModel.ts
import { useMemo } from "react";
import type { LiftMetrics } from "../model/VisualProgressModel";

const MAX_LIFT_PX = 110;

export function useProgressViewModel(current: number, target: number): LiftMetrics {
  return useMemo(() => {
    const safeTarget = Math.max(1, target);
    const ratio = Math.min(1, current / safeTarget);
    return {
      ratio,
      percentLabel: `${Math.round(ratio * 100)}%`,
      liftPx: -Math.round(ratio * MAX_LIFT_PX),
      polesVisible: current,
      isComplete: ratio >= 1,
    };
  }, [current, target]);
}