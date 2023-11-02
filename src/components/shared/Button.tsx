import React, { HTMLAttributes } from "react";

type ButtonProps = {
  width?: string;
  variant?: "outline" | "solid";
  children: React.ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  width = "w-40",
  children,
}) => {
  return (
    <button
      className={`px-5 py-2 ${width} ${
        variant === "solid"
          ? "bg-primary text-white hover:bg-white hover:border hover:border-primary hover:text-primary"
          : "border border-primary text-primary hover:bg-primary hover:text-white"
      } duration-300`}
    >
      {children}
    </button>
  );
};

export default Button;
