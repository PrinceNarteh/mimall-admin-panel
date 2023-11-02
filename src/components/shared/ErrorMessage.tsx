import * as _ from "lodash";
import { DeepMap, FieldErrors, Path } from "react-hook-form";

type ErrorMessageProps<TFormValues> = {
  name: Path<TFormValues>;
  errors?: FieldErrors;
};

const ErrorMessage = <TFormValues extends Record<string, unknown>>({
  errors,
  name,
}: ErrorMessageProps<TFormValues>) => {
  const errorMessages = _.get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <>
      {hasError && (
        <span className="text-red-500 text-[12px]">
          {errors[name]?.message as string}
        </span>
      )}
    </>
  );
};

export default ErrorMessage;
