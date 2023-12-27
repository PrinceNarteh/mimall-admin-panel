import { Control, FieldErrors, FieldValues } from "react-hook-form";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import ErrorMessage from "./ErrorMessage";

type PhoneInputProps<TFormValues extends FieldValues = FieldValues> = {
  name: string;
  label?: string;
  control: Control<TFormValues> | undefined;
  errors: FieldErrors | undefined;
  required?: boolean;
};

export const PhoneInput = <TFormValues extends Record<string, unknown>>({
  label,
  name,
  control,
  errors,
  required = false,
}: PhoneInputProps<TFormValues>) => {
  return (
    <div className="flex-1">
      <label className="mb-1 block text-blue-900 text-md font-semibold leading-loose">
        {label}
      </label>
      <PhoneInputWithCountry
        international
        defaultCountry="GH"
        name={name}
        control={control}
        rules={{ required }}
        className="placeholder:text-slate-400 bg-white w-full outline-none border border-slate-400 shadow-md rounded-md p-3 sm:text-sm"
      />
      <ErrorMessage name={name} errors={errors} />
    </div>
  );
};
