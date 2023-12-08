import { DeliveryCompany } from "@custom-types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import useMutate from "@hooks/useMutate";
import { useQueryClient } from "@tanstack/react-query";
import { deliveryCompanyResolver } from "@utils/validators";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { PhoneInput } from "@components/shared/PhoneInput";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "../shared/Button";
import CustomFileInput from "../shared/CustomFileInput";
import InputField from "../shared/InputField";
import ErrorMessage from "@components/shared/ErrorMessage";
import { queryKeys } from "@utils/queryKeys";
import { useSetQueryData } from "@hooks/useSetQueryData";

const defaultValues = {
  name: "",
  email: "",
  phone_umber: "",
  alternate_phone_number: "",
  whatsapp_number: "",
  location: "",
  owner_first_name: "",
  owner_last_name: "",
  owner_phone_number: "",
  slide_images: [],
  logo: "",
};

const DeliveryCompanyForm = ({
  deliveryCompany,
}: {
  deliveryCompany?: DeliveryCompany;
}) => {
  const { setOrUpdateQueryData } = useSetQueryData();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [slideImages, setSlideImages] = useState<File[] | null>([]);
  const [slideImagesPreview, setSlideImagesPreview] = useState<string[]>([]);

  const formValues = deliveryCompanyResolver(deliveryCompany);
  type FormValues = z.infer<typeof formValues>;
  const {
    control,
    register,
    setValue,
    clearErrors,
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
          setOrUpdateQueryData({
            queryKeys: queryKeys.DeliveryCompanies.key,
            dataId: deliveryCompany?._id,
            data,
          });
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
    if (image) {
      setPreview(URL.createObjectURL(image));
      setValue("logo", image);
    }
  }, [image]);

  useEffect(() => {
    if (slideImages) {
      const images = slideImages.map((image) => URL.createObjectURL(image));
      setSlideImagesPreview(images);
      setValue("slide_images", images);
      clearErrors("slide_images");
    }
  }, [slideImages]);

  useEffect(() => {
    if (deliveryCompany) {
      Object.entries(deliveryCompany).forEach((item) =>
        setValue(item[0] as keyof FormValues, item[1])
      );
    }
  }, [deliveryCompany, setValue]);

  console.log(errors);

  return (
    <div className="p-5 bg-white">
      <form onSubmit={handleSubmit(submit)}>
        <div className="form-row">
          <InputField
            name="name"
            label="Company Name"
            register={register}
            required
            errors={errors}
          />
          <InputField
            name="email"
            type="email"
            label="Company Email"
            register={register}
            errors={errors}
            required
          />
        </div>

        <div className="form-row">
          <PhoneInput
            name="phone_number"
            label="Phone Number"
            control={control}
            errors={errors}
          />
          <PhoneInput
            name="alternate_phone_number"
            label="Alternate Phone Number"
            control={control}
            errors={errors}
          />
        </div>
        {!deliveryCompany && (
          <div className="form-row">
            <InputField
              name="password"
              type="password"
              label="Password"
              required
              register={register}
              errors={errors}
            />
            <InputField
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              required
              register={register}
              errors={errors}
            />
          </div>
        )}
        <div className="form-row">
          <InputField
            name="location"
            label="Location"
            required
            register={register}
            errors={errors}
          />

          <PhoneInput
            label="Whatsapp Number"
            control={control}
            errors={errors}
            name="whatsapp_number"
          />
        </div>

        <div className="form-row">
          <InputField
            name="owner_first_name"
            label="Owner's First Name"
            register={register}
            required
            errors={errors}
          />
          <InputField
            name="owner_last_name"
            label="Owner's Last Name"
            register={register}
            required
            errors={errors}
          />

          <PhoneInput
            label="Owner's Phone Number"
            control={control}
            errors={errors}
            name="owner_phone_number"
          />
        </div>

        <div className="flex gap-10 mt-10 flex-col md:flex-row">
          <div className="flex-1 flex flex-col gap-5 items-center">
            <div className="flex">
              {preview && (
                <img src={preview} className="rounded-md w-40 h-40" alt="" />
              )}
            </div>
            <CustomFileInput
              label="Company Logo"
              placeholder="Drop your profile image here"
              required
              onChange={setImage}
            />
          </div>

          <div className="flex-[2] flex flex-col gap-5 items-center">
            <div className="flex gap-5 items-center overflow-x-scroll">
              {slideImagesPreview.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  className="rounded-md w-40 h-40"
                  alt=""
                />
              ))}
            </div>
            <div>
              <CustomFileInput
                label="Company Slide Images"
                placeholder="Drop your profile image here"
                required
                onChange={setSlideImages}
                multiple={true}
              />
              <ErrorMessage name="slide_images" errors={errors} />
            </div>
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
