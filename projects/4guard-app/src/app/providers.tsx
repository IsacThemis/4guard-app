"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import ViewTransitions from "@/components/ui/ViewTransitions";

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
      <ViewTransitions>
        <AuthGuard>
          {children}
        </AuthGuard>
      </ViewTransitions>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
