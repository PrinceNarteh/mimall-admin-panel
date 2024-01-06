import { usePermissions } from "@hooks/usePermissions";
import { useUser } from "@hooks/useUser";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const path = useLocation().pathname;
  const user = useUser();
  const { paths } = usePermissions();
  const { pathname } = useLocation();

  const allowedPath =
    pathname.length > 1 ? paths.some((path) => pathname === path) : true;

  if (!user?.token) {
    return <Navigate to="/login" state={{ from: path }} replace />;
  } else if (!allowedPath) {
    return <Navigate to="/" state={{ from: path }} replace />;
  }

  return <div>{children}</div>;
};

export default Protected;
