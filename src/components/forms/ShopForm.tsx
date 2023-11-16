import { Shop, Role } from "@custom-types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetQuery } from "@hooks/useGetQuery";
import useMutate from "@hooks/useMutate";
import { useQueryClient } from "@tanstack/react-query";
import { fetchImage } from "@utils/fetchImage";
import { nationalities } from "@utils/nationalities";
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
  password: "",
  confirm_password: "",
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
  image: z.any(),
  banner: z.any(),
};

const ShopForm = ({ shop }: { shop?: Shop }) => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File[] | null>(null);
  const [preview, setPreview] = useState("");

  const { data: roles } = useGetQuery<Role[]>({
    queryKey: queryKeys.Roles.key,
    url: queryKeys.Roles.url,
  });

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
    const toastId = toast.loading("Creating Shop...");
    const formData = new FormData();
    Object.values(data).forEach((item) => formData.append(item[0], item[1]));

    console.log(data);

    mutate(
      {
        url: shop
          ? `${queryKeys.Admin.url(shop._id)}`
          : `${queryKeys.Admins.url}/register`,
        data,
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
          toast.dismiss(toastId);
          toast.error(error.response.data.message);
        },
      }
    );
  };

  // useEffect(() => {
  //   if (!shop && image && image.some((image) => image !== undefined)) {
  //     setValue("profile_image", image[0]);
  //     setPreview(URL.createObjectURL(image[0]));
  //   } else if (!image && shop && shop.profile_image) {
  //     setPreview(
  //       fetchImage({ imageName: shop.profile_image, entity: "admins" })
  //     );
  //   } else if (shop && image && image.some((image) => image !== undefined)) {
  //     setValue("profile_image", image[0]);
  //     setPreview(URL.createObjectURL(image[0]));
  //   }
  // }, [shop, image, setValue]);

  useEffect(() => {
    if (shop) {
      Object.entries(shop).forEach((item) =>
        setValue(item[0] as keyof FormValues, item[1])
      );
    }
  }, [shop, setValue]);

  return (
    <div className="p-5 bg-white">
      <form onSubmit={handleSubmit(submit)}>
        <div className="form-row">
          <InputField name="name" label="Shop Name" register={register} />
          <InputField
            name="description"
            label="Shop Description"
            register={register}
          />
        </div>
        {!shop && (
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
          <InputField name="location" label="Location" register={register} />
          <InputField
            name="mapDirection"
            label="Map Direction"
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
              name="phoneNumber"
              control={control}
              rules={{ required: true }}
              className="placeholder:text-slate-400 bg-white w-full outline-none border border-slate-400 shadow-md rounded-md p-3 sm:text-sm"
            />
            <ErrorMessage name="phoneNumber" errors={errors} />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-blue-900 text-md font-semibold leading-loose">
              Alternate Phone Number
              <span className="text-slate-300 text-md">(Optional)</span>
            </label>
            <PhoneInputWithCountry
              international
              defaultCountry="GH"
              name="alternatePhoneNumber"
              control={control}
              className="placeholder:text-slate-400 bg-white w-full outline-none border border-slate-400 shadow-md rounded-md p-3 sm:text-sm"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="flex-1">
            <label className="mb-1 block text-blue-900 text-md font-semibold leading-loose">
              Whatsapp Number
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
        </div>

        <div className="form-row">
          <InputField
            name="tiktok_handle"
            label="TikTok Handle"
            register={register}
          />
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
          <Button>{`${shop ? "Update" : "Create"} Shop`}</Button>
        </div>
      </form>
    </div>
  );
};

export default ShopForm;
