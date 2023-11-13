import InputField from "@components/shared/InputField";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

const Login = () => {
  const [category, setCategory] = useState<
    "admins" | "delivery-companies" | "shops"
  >("admins");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div>
      <button onClick={() => setCategory("admins")}>Admin</button>
      <button onClick={() => setCategory("delivery-companies")}>
        Delivery Company
      </button>
      <button onClick={() => setCategory("shops")}>Shop</button>
      <form>
        <InputField
          label="Email"
          name="email"
          type="email"
          register={register}
          errors={errors}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          register={register}
          errors={errors}
        />
      </form>
    </div>
  );
};

export default Login;
