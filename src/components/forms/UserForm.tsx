import Heading from "@components/shared/Heading";
import { Admin, Client, Role } from "@custom-types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetQuery } from "@hooks/useGetQuery";
import useMutate from "@hooks/useMutate";
import { useQueryClient } from "@tanstack/react-query";
import { nationalities } from "@utils/nationalities";
import { queryKeys } from "@utils/queryKeys";
import { adminResolver } from "@utils/validators";
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
  first_name: "",
  last_name: "",
  middle_name: "",
  phone_number: "",
  alternate_phone_number: "",
  email: "",
  address: "",
  nationality: "Ghanaian",
  profile_image: "",
  card_type: "",
  card_number: "",
  active: true,
  role: "",
};

type UserFormProps = {
  client: Client | null;
  setClient: React.Dispatch<React.SetStateAction<Client | null>>;
  handleDelete: (client: Client | null) => Promise<void>;
};

const UserForm = ({ client }: UserFormProps) => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File[] | null>(null);
  const [preview, setPreview] = useState("");

  const { data: roles } = useGetQuery<Role[]>({
    queryKey: queryKeys.Roles.key,
    url: queryKeys.Roles.url,
  });

  const formValues = adminResolver(client);
  type FormValues = z.infer<typeof formValues>;
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(adminResolver(client)),
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
        url: client
          ? `${queryKeys.Admin.url(client._id)}`
          : `${queryKeys.Admins.url}/register`,
        data,
        method: client ? "PATCH" : "POST",
        multipart: true,
      },
      {
        onSuccess(data) {
          queryClient.setQueryData<Admin[]>(queryKeys.Admins.key, (oldData) => {
            if (client) {
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

  // useEffect(() => {
  //   if (!client && image && image.some((image) => image !== undefined)) {
  //     setValue("profile_image", image[0]);
  //     setPreview(URL.createObjectURL(image[0]));
  //   } else if (!image && client && client.profile_image) {
  //     setPreview(
  //       fetchImage({ imageName: client.profile_image, entity: "admins" })
  //     );
  //   } else if (client && image && image.some((image) => image !== undefined)) {
  //     setValue("profile_image", image[0]);
  //     setPreview(URL.createObjectURL(image[0]));
  //   }
  // }, [client, image, setValue]);

  // useEffect(() => {
  //   if (roles) {
  //     const admin = roles.find((role) =>
  //       role.name.toLowerCase().startsWith("admin")
  //     );
  //     if (admin) {
  //       setValue("role", admin._id);
  //     }
  //   }
  // }, [roles, setValue]);

  useEffect(() => {
    if (client) {
      Object.entries(client).forEach((item) =>
        setValue(item[0] as keyof FormValues, item[1])
      );
    }
  }, [client, setValue]);

  return (
    <div className="p-5 bg-white">
      <Heading label={`${client ? "Edit" : "Add"} User`} />
      <form onSubmit={handleSubmit(submit)}>
        <div className="form-row">
          <InputField
            name="first_name"
            label="First Name"
            register={register}
          />
          <InputField name="last_name" label="Last Name" register={register} />
        </div>
        <div className="form-row">
          <InputField
            name="middle_name"
            label="Middle Name"
            register={register}
          />
          <InputField name="email" label="Email" register={register} />
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
        {!client && (
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
            name="address"
            label="Address"
            required
            register={register}
          />

          <div className="flex-1 flex flex-col justify-end">
            <label
              htmlFor="countries"
              className="mb-1 block text-blue-900 text-md font-semibold leading-loose"
            >
              Nationality
            </label>
            <select
              defaultValue="Ghanaian"
              id="countries"
              className="placeholder:text-slate-400 block bg-white w-full outline-none border border-slate-400 shadow-md rounded-md p-3 sm:text-sm"
            >
              {nationalities.map((nationality, idx) => (
                <option key={idx} value={nationality}>
                  {nationality}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="flex-1">
            <label
              htmlFor="cardType"
              className="mb-1 block text-blue-900 text-md font-semibold leading-loose"
            >
              Card Type
            </label>
            <select
              id="cardType"
              className="placeholder:text-slate-400 block bg-white w-full outline-none border border-slate-400 shadow-md rounded-md p-3 sm:text-sm"
              {...register("card_type")}
            >
              <option value="">Select Card</option>
              <option value="ghana_card">Ghana Card</option>
              <option value="student_id">Student ID</option>
              <option value="voters_id">Voters ID</option>
            </select>
          </div>
          <InputField
            name="card_number"
            label="Card Number"
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
          <Button>{`${client ? "Update" : "Create"} Admin`}</Button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
