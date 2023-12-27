import React from "react";
import QueryClientProvider from "./react-query";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider>{children}</QueryClientProvider>;
};

export default Providers;
