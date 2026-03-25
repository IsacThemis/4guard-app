"use client";

import { useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function ViewTransitions({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!document.startViewTransition) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (
        anchor &&
        anchor.href &&
        anchor.href.startsWith(window.location.origin) &&
        anchor.href !== window.location.href &&
        anchor.target !== "_blank"
      ) {
        e.preventDefault();
        
        document.startViewTransition(() => {
          window.location.href = anchor.href;
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  useEffect(() => {
    if (!document.startViewTransition) return;

    document.documentElement.style.viewTransitionName = pathname === "/" ? "home" : pathname.replace(/\//g, "-");
  }, [pathname]);

  return <>{children}</>;
}
