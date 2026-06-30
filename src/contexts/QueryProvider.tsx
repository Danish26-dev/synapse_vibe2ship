import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a single QueryClient instance with robust default configurations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes stale time
      gcTime: 1000 * 60 * 30,   // 30 minutes garbage collection time
      retry: 1,                 // Retry failing requests once
      refetchOnWindowFocus: false, // Prevent noisy refetch on tab focus
    },
  },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
