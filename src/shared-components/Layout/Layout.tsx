// src/shared-components/Layout/Layout.tsx
import type { ReactNode } from "react";
import { APP_NAME } from "@/config/constants";

export function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen">
            <header className="border-b border-border/60 bg-background/70 backdrop-blur-sm">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--bamboo)]/15 text-lg">
                            🏠
                        </div>
                        <div>
                            <p className="font-display text-lg leading-none text-foreground">{APP_NAME}</p>
                            <p className="text-xs text-muted-foreground">Community help, lifted together</p>
                        </div>
                    </div>
                    <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
                        <a className="hover:text-foreground" href="#wall">The Wall</a>
                        <a className="hover:text-foreground" href="#post">Post a Request</a>
                        <a className="hover:text-foreground" href="#plan">Plan Big</a>
                    </nav>
                </div>
            </header>
            <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
            <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
                Frontend prototype · MVVM · Static mock data · AE-GRP-5
            </footer>
        </div>
    );
}