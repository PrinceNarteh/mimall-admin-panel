import { Admin, Role } from "@custom-types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import useMutate from "@hooks/useMutate";
import { useQueryClient } from "@tanstack/react-query";
import { nationalities } from "@utils/nationalities";
import { queryKeys } from "@utils/queryKeys";
import { adminResolver } from "@utils/validators";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { z } from "zod";
import Button from "../shared/Button";
import CustomFileInput from "../shared/CustomFileInput";
import ErrorMessage from "../shared/ErrorMessage";
import InputField from "../shared/InputField";
import { useGetQuery } from "@hooks/useGetQuery";

const defaultValues = {
  first_name: "",
  last_name: "",
  middle_name: "",
  phone_number: "",
  alternate_phone_number: "",
  email: "",
  address: "",
  nationality: "",
  profile_image: "",
  card_type: "",
  card_number: "",
  active: true,
  role: "",
};

const AdminForm = ({ admin }: { admin?: Admin }) => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File[] | null>(null);
  const [preview, setPreview] = useState("");
  const formValues = adminResolver(admin);
  type FormValues = z.infer<typeof formValues>;
  const { data: roles } = useGetQuery<Role[]>({
    queryKey: queryKeys.AllRoles.key,
    url: queryKeys.AllRoles.url,
  });

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(adminResolver(admin)),
  });

  const { mutate } = useMutate();
  const submit: SubmitHandler<FormValues> = (data) => {
    const toastId = toast.loading("Creating Admin...");
    const formData = new FormData();
    Object.values(data).forEach((item) => formData.append(item[0], item[1]));

    mutate(
      {
        url: `${queryKeys.AllAdmins.url}/register`,
        data,
      },
      {
        onSuccess(data) {
          console.log(data);
          queryClient.setQueryData<Admin[]>(
            queryKeys.AllAdmins.key,
            (oldData) => [data, ...(oldData ?? [])]
          );
          toast.dismiss(toastId);
          toast.success("Admin successfully created");
        },
        onError(error: any) {
          toast.dismiss(toastId);
          toast.error(error.response.data.message);
        },
      }
    );
  };

  useEffect(() => {
    if (image && image.some((image) => image !== undefined)) {
      methods.setValue("profile_image", image[0]);
      setPreview(URL.createObjectURL(image[0]));
    }
  }, [image, methods]);

  useEffect(() => {
    if (roles) {
      const admin = roles.find((role) =>
        role.name.toLowerCase().startsWith("admin")
      );
      if (admin) {
        methods.setValue("role", admin._id);
      }
    }
  }, [roles, methods]);

  console.log(queryClient);

  return (
    <div className="p-5 bg-white">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submit)}>
          <div className="form-row">
            <InputField name="first_name" label="First Name" required />
            <InputField name="last_name" label="Last Name" required />
          </div>
          <div className="form-row">
            <InputField name="middle_name" label="Middle Name" />
            <InputField name="email" type="email" label="Email" required />
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
                control={methods.control}
                rules={{ required: true }}
                className="placeholder:text-slate-400 bg-white w-full outline-none border border-slate-400 shadow-md rounded-md p-3 sm:text-sm"
              />
              <ErrorMessage name="phone_number" />
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
                control={methods.control}
                className="placeholder:text-slate-400 bg-white w-full outline-none border border-slate-400 shadow-md rounded-md p-3 sm:text-sm"
              />
            </div>
          </div>
          {!admin && (
            <div className="form-row">
              <InputField
                name="password"
                type="password"
                label="Password"
                required
              />
              <InputField
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                required
              />
            </div>
          )}
          <div className="form-row">
            <InputField name="address" label="Address" required />

            <div className="flex-1 flex flex-col justify-end">
              <label
                htmlFor="countries"
                className="mb-1 block text-blue-900 text-md font-semibold leading-loose"
              >
                Nationality
              </label>
              <select
                defaultValue="Ghanian"
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
                {...methods.register("card_type")}
              >
                <option value="">Select Card</option>
                <option value="ghana_card">Ghana Card</option>
                <option value="student_id">Student ID</option>
                <option value="voters_id">Voters ID</option>
              </select>
            </div>
            <InputField name="card_number" label="Card Number" />
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
            <Button>{`${admin ? "Update" : "Create"} Admin`}</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AdminForm;
