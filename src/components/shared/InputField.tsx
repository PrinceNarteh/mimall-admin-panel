import _ from "lodash";
import { InputHTMLAttributes } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type InputFieldProps<TFormValues extends FieldValues = FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register: UseFormRegister<TFormValues>;
  errors?: any;
  label?: string;
  required?: boolean;
  placeholder?: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = <TFormValues extends Record<string, unknown>>({
  name,
  label,
  register,
  rules,
  errors,
  required = false,
  placeholder,
  errorMessage = "",
  ...props
}: InputFieldProps<TFormValues>) => {
  const errorMessages = _.get(errors, name);
  const hasError = Boolean(errors && errorMessages);

  return (
    <div className="flex-1">
      {label && (
        <div className="line-clamp-1">
          <label className="mb-1 block text-primary text-md font-semibold leading-loose">
            {label}{" "}
            {!required && (
              <span className="text-slate-300 text-md">(Optional)</span>
            )}
          </label>
        </div>
      )}
      <input
        placeholder={placeholder}
        className="placeholder:text-slate-400 block bg-white w-full outline-none border border-slate-400 shadow-md rounded-md p-3 sm:text-sm"
        {...register(name, rules)}
        {...props}
      />
      {hasError && (
        <span className="text-red-500 text-[12px]">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default InputField;
