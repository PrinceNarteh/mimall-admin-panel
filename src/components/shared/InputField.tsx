import { InputHTMLAttributes } from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type InputFieldProps<TFormValues extends FieldValues = FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
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
  const errorMessages = errors?.[name];
  const hasError = !!(errors && errorMessages);

  return (
    <div className="flex-1">
      {label && (
        <label className="mb-1 block text-blue-900 text-md font-semibold leading-loose">
          {label}{" "}
          {!required && (
            <span className="text-slate-300 text-md">(Optional)</span>
          )}
        </label>
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
