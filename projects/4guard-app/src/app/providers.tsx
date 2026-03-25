"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import PageTransition from "@/components/ui/PageTransition";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PageTransition>
        <AuthGuard>
          {children}
        </AuthGuard>
      </PageTransition>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
