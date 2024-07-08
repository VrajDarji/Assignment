"use client";
import React from "react";
import StyledComponentRegistry from "./registry";
import {
  DefaultOptions,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function ClientSideWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryConfig: DefaultOptions = {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  };

  const queryClient = new QueryClient({ defaultOptions: queryConfig });

  return (
    <StyledComponentRegistry>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </StyledComponentRegistry>
  );
}
