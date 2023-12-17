import { DeliveryCompany } from "@custom-types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import useMutate from "@hooks/useMutate";
import { deliveryCompanyResolver } from "@utils/validators";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import ErrorMessage from "@components/shared/ErrorMessage";
import { PhoneInput } from "@components/shared/PhoneInput";
import { useSetQueryData } from "@hooks/useSetQueryData";
import { queryKeys } from "@utils/queryKeys";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import CustomFileInput from "../shared/CustomFileInput";
import InputField from "../shared/InputField";
import Heading from "@components/shared/Heading";

const DeliveryCompanyForm = ({
  deliveryCompany,
}: {
  deliveryCompany: DeliveryCompany | null;
}) => {
  const { setOrUpdateQueryData } = useSetQueryData();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [slideImages, setSlideImages] = useState<File[] | null>([]);
  const [previewSlideImages, setPreviewSlideImages] = useState<string[]>([]);

  const formValues = deliveryCompanyResolver(deliveryCompany);
  type FormValues = z.infer<typeof formValues>;
  const defaultValues: FormValues = {
    alternate_phone_number: "",
    email: "",
    location: "",
    logo: undefined,
    name: "",
    owner_first_name: "",
    owner_last_name: "",
    owner_phone_number: "",
    phone_number: "",
    slide_images: [],
    whatsapp_number: "",
  };

  const {
    control,
    register,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: deliveryCompany ? deliveryCompany : defaultValues,
    resolver: zodResolver(deliveryCompanyResolver(deliveryCompany)),
  });

  const navigate = useNavigate();
  const { mutate } = useMutate();
  const submit: SubmitHandler<FormValues> = (data) => {
    const toastId = toast.loading("Creating Delivery company...");
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("location", data.location);
    formData.append("name", data.name);
    formData.append("owner_first_name", data.owner_first_name);
    formData.append("owner_last_name", data.owner_last_name);
    formData.append("owner_phone_number", data.owner_phone_number);
    formData.append("phone_number", data.phone_number);
    formData.append("whatsapp_number", data.whatsapp_number);
    // if ( )
    data?.logo && formData.append("logo", data.logo);
    data?.alternate_phone_number &&
      formData.append("alternate_phone_number", data.alternate_phone_number);
    for (let image of data.slide_images) {
      formData.append("slide_images", image);
    }

    console.log(data);

    mutate(
      {
        url: deliveryCompany
          ? `${queryKeys.DeliveryCompany.url(deliveryCompany._id)}`
          : `${queryKeys.DeliveryCompanies.url}/register`,
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
          console.log(error);
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
      setPreviewSlideImages(
        slideImages.map((item) => URL.createObjectURL(item))
      );
      setValue("slide_images", slideImages);
      clearErrors("slide_images");
    }
  }, [slideImages]);

  console.log(previewSlideImages);

  return (
    <div className="p-5 bg-white">
      <Heading label={`${deliveryCompany ? "Edit" : "Add"} Delivery Company`} />
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
        {!deliveryCompany ? (
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
              name="confirm_password"
              type="password"
              label="Confirm Password"
              required
              register={register}
              errors={errors}
            />
          </div>
        ) : null}
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

        <div className="flex mt-10 gap-5 flex-col md:flex-row">
          <div className="flex-1 shrink-0 flex flex-col gap-5 items-center">
            <div className="flex">
              {preview && (
                <img src={preview} className="rounded-md w-40 h-40" alt="" />
              )}
            </div>
            <CustomFileInput
              label="Company Logo"
              placeholder="Drop logo here"
              required
              onChange={setImage}
            />
          </div>

          <div className="flex-[2] flex flex-col gap-5 items-center">
            <div className="flex overflow-auto">
              {previewSlideImages && (
                <>
                  {previewSlideImages.map((image, key) => (
                    <img
                      key={key}
                      src={image}
                      className="rounded-md w-40 h-40"
                      alt=""
                    />
                  ))}
                </>
              )}
            </div>
            <CustomFileInput
              label="Slide Images"
              placeholder="Drop slide images here"
              required
              onChange={setSlideImages}
              multiple
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
