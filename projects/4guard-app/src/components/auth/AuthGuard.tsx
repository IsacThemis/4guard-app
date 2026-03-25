"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/lib/store";

const PUBLIC_ROUTES = ["/login"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useStore();
  const [isReady, setIsReady] = useState(false);

  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route));

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady && !isAuthenticated && !isPublicRoute) {
      router.push("/login");
    }
  }, [isReady, isAuthenticated, isPublicRoute, router]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#000515]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated && !isPublicRoute) {
    return null;
  }

  if (isAuthenticated && isPublicRoute) {
    router.push("/");
    return null;
  }

  return <>{children}</>;
}
