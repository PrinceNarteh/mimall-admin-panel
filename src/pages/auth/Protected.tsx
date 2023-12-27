import { useUser } from "@hooks/useUser";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const path = useLocation().pathname;
  const user = useUser();

  if (!user?.token) {
    return <Navigate to="/login" state={{ from: path }} replace />;
  }

  return <div>{children}</div>;
};

export default Protected;
