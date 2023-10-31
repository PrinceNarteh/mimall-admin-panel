import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

const queryClient = new QueryClient();

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [queryClient] = useState(
  //   () =>
  //     new QueryClient({
  //       defaultOptions: {
  //         queries: {
  //           refetchOnWindowFocus: false,
  //         },
  //       },
  //     })
  // );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
