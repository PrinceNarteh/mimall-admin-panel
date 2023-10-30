import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../shared/InputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";

const schema = z.object({
  first_name: z
    .string({ required_error: "First name is required" })
    .min(1, "First name is required"),
  last_name: z
    .string({ required_error: "Last name is required" })
    .min(1, "Last name is required"),
  middle_name: z.union([z.string(), z.undefined()]),
  phone_number: z
    .string({ required_error: "Phone number is required" })
    .min(10, "Please enter a valid phone number")
    .max(13, "Please enter a valid phone number"),
  alternate_phone_number: z.union([z.string(), z.undefined()]),
  email: z.string().email("Please enter a valid email"),
  address: z.union([z.string(), z.undefined()]),
  nationality: z.union([z.string(), z.undefined()]),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
  profile_image: z.any(),
  card_type: z.union([z.string(), z.undefined()]),
  card_number: z.union([z.string(), z.undefined()]),
  active: z.boolean().default(true),
  role: z.string({ required_error: "role is required" }),
});

const AdminForm = () => {
  const methods = useForm({
    resolver: zodResolver(schema),
  });
  return (
    <div className="p-5 bg-white">
      <FormProvider {...methods}>
        <form>
          <div className="form-row">
            <InputField name="first_name" label="First Name" required />
            <InputField name="middle_name" label="Middle Name" />
            <InputField name="last_name" label="Last Name" required />
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
        </form>
      </FormProvider>
    </div>
  );
};

export default AdminForm;
