import React from "react";
import { useLocation } from "react-router-dom";

const Protected = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default Protected;
