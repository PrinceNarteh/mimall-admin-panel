import Heading from "@components/shared/Heading";
import { Shop } from "@custom-types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import useMutate from "@hooks/useMutate";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@utils/queryKeys";
import { shopResolver } from "@utils/validators";
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
  name: "",
  description: "",
  location: "",
  map_direction: "",
  phone_number: "",
  alternate_phone_number: "",
  whatsapp_number: "",
  instagram_handle: "",
  facebook_handle: "",
  twitter_handle: "",
  tiktok_handle: "",
  opening_time: "",
  closing_time: "",
  profile_image: "",
  banner: "",
};

type ShopFormProps = {
  shop: Shop | null;
};

const ShopForm = ({ shop }: ShopFormProps) => {
  const queryClient = useQueryClient();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewProfileImage, setPreviewProfileImage] = useState<string | null>(
    null
  );
  const [banner, setBanner] = useState<File | null>(null);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);

  const formValues = shopResolver(shop);
  type FormValues = z.infer<typeof formValues>;
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(shopResolver(shop)),
  });

  const navigate = useNavigate();
  const { mutate } = useMutate();
  const submit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    const toastId = toast.loading("Creating Shop...");
    const formData = new FormData();
    Object.entries(data).forEach((item) => formData.append(item[0], item[1]));

    mutate(
      {
        url: shop
          ? `${queryKeys.Shop.url(shop._id)}`
          : `${queryKeys.Shops.url}/register`,
        data: formData,
        method: shop ? "PATCH" : "POST",
        multipart: true,
      },
      {
        onSuccess(data) {
          queryClient.setQueryData<Shop[]>(queryKeys.Admins.key, (oldData) => {
            if (shop) {
              return (oldData ?? []).map((item) => {
                if (item._id === data._id) {
                  return data;
                }
                return item;
              });
            } else {
              return [data, ...(oldData ?? [])];
            }
          });
          toast.dismiss(toastId);
          toast.success("Shop successfully created");
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
    if (profileImage) {
      setValue("profile_image", profileImage);
      setPreviewProfileImage(URL.createObjectURL(profileImage));
    }
  }, [profileImage, setValue]);

  useEffect(() => {
    if (banner) {
      setValue("banner", banner);
      setPreviewBanner(URL.createObjectURL(banner));
    }
  }, [banner, setValue]);

  useEffect(() => {
    if (shop) {
      Object.entries(shop).forEach((item) =>
        setValue(item[0] as keyof FormValues, item[1])
      );
    }
  }, [shop, setValue]);

  console.log({ errors });

  return (
    <div className="p-5 bg-white">
      <Heading label={`${shop ? "Edit" : "Add"} Shop`} />
      <form onSubmit={handleSubmit(submit)}>
        <div className="form-row">
          <InputField
            name="name"
            label="Shop Name"
            register={register}
            required
          />
          <InputField
            name="description"
            label="Shop Description"
            register={register}
            required
          />
        </div>
        <div className="form-row">
          <InputField
            name="location"
            label="Location"
            register={register}
            required
          />
          <InputField
            name="map_direction"
            label="Map Direction"
            register={register}
            required
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
              Alternate Number
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

        <div className="form-row">
          <InputField
            type="time"
            name="opening_time"
            label="Opening Time"
            register={register}
            required
          />
          <InputField
            type="time"
            name="closing_time"
            label="Closing Time"
            register={register}
            required
          />
        </div>

        <div className="form-row">
          <div className="flex-1">
            <label className="mb-1 block text-blue-900 text-md font-semibold leading-loose">
              Whatsapp Number{" "}
              <span className="text-slate-300 text-md">(Optional)</span>
            </label>
            <PhoneInputWithCountry
              international
              defaultCountry="GH"
              name="whatsapp_number"
              control={control}
              rules={{ required: true }}
              className="placeholder:text-slate-400 bg-white w-full outline-none border border-slate-400 shadow-md rounded-md p-3 sm:text-sm"
            />
            <ErrorMessage name="whatsapp_number" errors={errors} />
          </div>
          <InputField
            name="instagram_handle"
            label="Instagram Handle"
            register={register}
          />
        </div>

        <div className="form-row">
          <InputField
            name="facebook_handle"
            label="Facebook Handle"
            register={register}
          />
          <InputField
            name="twitter_handle"
            label="Twitter Handle"
            register={register}
          />
          <InputField
            name="tiktok_handle"
            label="TikTok Handle"
            register={register}
          />
        </div>

        <div className="form-row">
          <div className="flex-1 flex flex-col gap-5 items-center justify-center">
            {previewProfileImage && (
              <img
                src={previewProfileImage}
                className="rounded-md w-40 h-40"
                alt=""
              />
            )}
            <div className="flex-1">
              <CustomFileInput
                label="Profile Image"
                placeholder="Drop your profile image here"
                required
                onChange={setProfileImage}
                height="h-28"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-5 justify-center">
            {previewBanner && (
              <img
                src={previewBanner}
                className="rounded-md w-full h-40"
                alt=""
              />
            )}
            <div className="flex-1">
              <CustomFileInput
                height="h-28"
                label="Banner"
                placeholder="Drop your banner image here"
                required
                onChange={setBanner}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <Button>{`${shop ? "Update" : "Create"} Shop`}</Button>
        </div>
      </form>
    </div>
  );
};

export default ShopForm;
