// src/shared-components/Button/Button.tsx
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "soft" | "accent";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-[color:var(--bamboo-deep)] text-[color:var(--primary-foreground)] hover:bg-[color:var(--bamboo)] shadow-md shadow-[color:var(--bamboo)]/20 active:scale-95",
  accent:
    "bg-[color:var(--terracotta)] text-[color:var(--primary-foreground)] hover:opacity-90 shadow-md shadow-[color:var(--terracotta)]/20 active:scale-95",
  ghost: "bg-transparent text-foreground hover:bg-muted active:scale-95",
  soft: "bg-[color:var(--capiz)] text-[color:var(--nipa-deep)] hover:bg-muted/80 border border-border active:scale-95",
};

export function Button({ variant = "primary", className = "", ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 ${styles[variant]} ${className}`}
    />
  );
}