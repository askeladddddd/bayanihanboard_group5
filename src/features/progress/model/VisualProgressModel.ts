// src/features/visual-progress/VisualProgressModel.ts
export interface LiftMetrics {
  ratio: number;        // 0..1
  percentLabel: string; // "33%"
  liftPx: number;       // SVG translateY (negative = up)
  polesVisible: number; // number of poles to render
  isComplete: boolean;
}