import React from "react";
import { useFormContext } from "react-hook-form";

type ErrorMessageProps = {
  name: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ name }) => {
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <>
      {errors[name] && (
        <span className="text-red-500 text-[12px]">
          {errors[name]?.message as string}
        </span>
      )}
    </>
  );
};

export default ErrorMessage;
