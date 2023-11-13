import { DeliveryCompany } from "@custom-types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import useMutate from "@hooks/useMutate";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@utils/queryKeys";
import { deliveryCompanyResolver } from "@utils/validators";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "../shared/Button";
import CustomFileInput from "../shared/CustomFileInput";
import ErrorMessage from "../shared/ErrorMessage";
import InputField from "../shared/InputField";

const defaultValues = {
  _id: "",
  name: "",
  email: "",
  phoneNumber: "",
  alternatePhoneNumber: "",
  whatsappNumber: "",
  location: "",
  ownerFirstName: "",
  ownerLastName: "",
  ownerPhoneNumber: "",
  slide_images: [],
};

const DeliveryCompanyForm = ({
  deliveryCompany,
}: {
  deliveryCompany?: DeliveryCompany;
}) => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File[] | null>(null);
  const [preview, setPreview] = useState("");

  const formValues = deliveryCompanyResolver(deliveryCompany);
  type FormValues = z.infer<typeof formValues>;
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(deliveryCompanyResolver(deliveryCompany)),
  });

  const navigate = useNavigate();
  const { mutate } = useMutate();
  const submit: SubmitHandler<FormValues> = (data) => {
    const toastId = toast.loading("Creating Admin...");
    const formData = new FormData();
    Object.values(data).forEach((item) => formData.append(item[0], item[1]));

    console.log(data);

    mutate(
      {
        url: deliveryCompany
          ? `${queryKeys.DeliveryCompany.url(deliveryCompany._id)}`
          : `${queryKeys.DeliveryCompany.url}/register`,
        data,
        method: deliveryCompany ? "PATCH" : "POST",
        multipart: true,
      },
      {
        onSuccess(data) {
          queryClient.setQueryData<DeliveryCompany[]>(
            queryKeys.DeliveryCompanies.key,
            (oldData) => {
              if (deliveryCompany) {
                return (oldData ?? []).map((item) => {
                  if (item._id === data._id) {
                    return data;
                  }
                  return item;
                });
              } else {
                return [data, ...(oldData ?? [])];
              }
            }
          );
          toast.dismiss(toastId);
          toast.success("Admin successfully created");
          navigate("/admins");
        },
        onError(error: any) {
          toast.dismiss(toastId);
          toast.error(error.response.data.message);
        },
      }
    );
  };

  useEffect(() => {
    if (deliveryCompany) {
      Object.entries(deliveryCompany).forEach((item) =>
        setValue(item[0] as keyof FormValues, item[1])
      );
    }
  }, [deliveryCompany, setValue]);

  return (
    <div className="p-5 bg-white">
      <form onSubmit={handleSubmit(submit)}>
        <div className="form-row">
          <InputField name="name" label="Product Name" register={register} />
          <InputField
            name="email"
            type="email"
            label="Last Name"
            register={register}
          />
        </div>

        <div className="form-row">
          <div className="flex-1">
            <label className="mb-1 block text-blue-900 text-md font-semibold leading-loose">
              Phone Number
            </label>
            <PhoneInputWithCountry
              international
              defaultCountry="GH"
              name="phone_number"
              control={control}
              rules={{ required: true }}
              className="placeholder:text-slate-400 bg-white w-full outline-none border border-slate-400 shadow-md rounded-md p-3 sm:text-sm"
            />
            <ErrorMessage name="phone_number" errors={errors} />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-blue-900 text-md font-semibold leading-loose">
              Alternate Phone Number
              <span className="text-slate-300 text-md">(Optional)</span>
            </label>
            <PhoneInputWithCountry
              international
              defaultCountry="GH"
              name="alternate_phone_number"
              control={control}
              className="placeholder:text-slate-400 bg-white w-full outline-none border border-slate-400 shadow-md rounded-md p-3 sm:text-sm"
            />
          </div>
        </div>
        {!deliveryCompany && (
          <div className="form-row">
            <InputField
              name="password"
              type="password"
              label="Password"
              required
              register={register}
            />
            <InputField
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              required
              register={register}
            />
          </div>
        )}
        <div className="form-row">
          <InputField
            name="location"
            label="location"
            required
            register={register}
          />

          <div className="flex-1">
            <label className="mb-1 block text-blue-900 text-md font-semibold leading-loose">
              Phone Number
            </label>
            <PhoneInputWithCountry
              international
              defaultCountry="GH"
              name="whatsappNumber"
              control={control}
              rules={{ required: true }}
              className="placeholder:text-slate-400 bg-white w-full outline-none border border-slate-400 shadow-md rounded-md p-3 sm:text-sm"
            />
            <ErrorMessage name="whatsappNumber" errors={errors} />
          </div>
        </div>

        <div className="form-row">
          <InputField
            name="ownerFirstName"
            label="Owner's First Name"
            register={register}
          />
          <InputField
            name="ownerLastName"
            label="Owner's Last Name"
            register={register}
          />

          <div className="flex-1">
            <label className="mb-1 block text-blue-900 text-md font-semibold leading-loose">
              Owner's Phone Number
            </label>
            <PhoneInputWithCountry
              international
              defaultCountry="GH"
              name="ownerPhoneNumber"
              control={control}
              rules={{ required: true }}
              className="placeholder:text-slate-400 bg-white w-full outline-none border border-slate-400 shadow-md rounded-md p-3 sm:text-sm"
            />
            <ErrorMessage name="ownerPhoneNumber" errors={errors} />
          </div>
        </div>

        <div className="flex flex-col gap-5 items-center md:flex-row md:items-end max-w-lg md:justify-center mx-auto">
          {preview && (
            <img src={preview} className="rounded-md w-40 h-40" alt="" />
          )}
          <div className="flex-1">
            <CustomFileInput
              label="Profile Image"
              placeholder="Drop your profile image here"
              required
              onChange={setImage}
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <Button>{`${deliveryCompany ? "Update" : "Create"} Admin`}</Button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryCompanyForm;
