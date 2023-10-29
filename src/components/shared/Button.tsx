import React from "react";

type ButtonProps = {
  width: string;
  variant: "outline" | "full";
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  //   variant = "full",
  width = "w-20",
  children,
}) => {
  return <button className={`px-5 py-2 ${width}`}>{children}</button>;
};

export default Button;
