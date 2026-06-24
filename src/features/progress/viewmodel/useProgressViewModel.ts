// src/features/visual-progress/useProgressViewModel.ts
import { useMemo } from "react";


const MAX_LIFT_PX = 110;

export function useProgressViewModel(current: number, target: number) {
  return useMemo(() => {
    const safeTarget = Math.max(1, target);
    const ratio = Math.min(1, current / safeTarget);
    const polesVisible = current;

    // Distribute poles across the base width
    const baseWidth = 240;
    const baseLeft = 80;
    const poles = Array.from({ length: polesVisible }, (_, i) => ({
      x: polesVisible === 1 ? baseLeft + baseWidth / 2 : baseLeft + (i * baseWidth) / (polesVisible - 1),
      delay: i * 60,
    }));

    return {
      ratio,
      percentLabel: `${Math.round(ratio * 100)}%`,
      liftPx: -Math.round(ratio * MAX_LIFT_PX),
      polesVisible,
      isComplete: ratio >= 1,
      poles
    };
  }, [current, target]);
}