import InputField from "@components/shared/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import useMutate from "@hooks/useMutate";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useUserStore from "store/userStore";
import { z } from "zod";

const schema = (category: "admins" | "delivery-companies" | "shops") => {
  const schema = z.object({
    password: z.string().min(6, "Password should be at least 6 characters"),
  });

  if (category === "shops") {
    return schema.extend({
      shopCode: z.string().length(12, "Shops should be 12 characters"),
    });
  } else {
    return schema.extend({
      email: z.string().email(),
    });
  }
};

const Login = () => {
  const setUser = useUserStore((store) => store.setUser);
  const [category, setCategory] = useState<
    "admins" | "delivery-companies" | "shops"
  >("admins");
  const formValues = schema(category);
  type FormValues = z.infer<typeof formValues>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      ...(category === "shops" ? { shopCode: "" } : { email: "" }),
      password: "",
    },
    resolver: zodResolver(schema(category)),
  });

  const navigate = useNavigate();
  const state = useLocation().state;
  const { mutate } = useMutate(["login"]);
  const submit: SubmitHandler<FormValues> = (data) => {
    const toastId = toast.loading("Logging in...");
    mutate(
      {
        url: `/${category}/login`,
        data,
      },
      {
        onSuccess(data) {
          setUser({
            ...data.data,
            token: data.token,
          });
          toast.dismiss(toastId);
          toast.success("Login successful");
          navigate(state?.from ? state.from : "/");
        },
        onError(error: any) {
          toast.dismiss(toastId);
          toast.error(error.response.data.message);
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full grid gap-16 grid-cols-1 px-5 md:px-16 lg:grid-cols-12 lg:max-w-5xl">
        <div className="md:col-span-10 lg:col-span-6">
          <div className="flex justify-center mb-5">
            <img src="/images/logo.png" alt="" className="h-16" />
          </div>
          <h3 className="text-3xl font-semibold text-center text-slate-800">
            Log in to your Account
          </h3>
          <p className="text-slate-600 mt-1 text-center">
            Provide your credentials to login
          </p>
          <div className="my-5">
            <label className="mb-1 block text-primary text-md font-semibold leading-loose">
              Login As
            </label>
            <div className="relative h-10 flex">
              <div className="absolute h-full w-full grid grid-cols-12 border border-slate-400 rounded-full p-1">
                <span
                  className={`col-span-4 h-full bg-green-800 rounded-full
            transform duration-500
                ${
                  category === "admins"
                    ? "col-start-1"
                    : category === "delivery-companies"
                    ? "col-start-5"
                    : "col-start-9"
                }
            `}
                ></span>
              </div>
              <button
                className={`flex-1 z-0 ${
                  category === "admins" ? "text-white" : ""
                }`}
                onClick={() => setCategory("admins")}
              >
                Admin
              </button>
              <button
                className={`flex-1 z-0 ${
                  category === "delivery-companies" ? "text-white" : ""
                }`}
                onClick={() => setCategory("delivery-companies")}
              >
                Delivery
              </button>
              <button
                className={`flex-1 z-0 ${
                  category === "shops" ? "text-white" : ""
                }`}
                onClick={() => setCategory("shops")}
              >
                Shop
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit(submit)} className="space-y-5">
            <InputField
              label={category === "shops" ? "Shop Code" : "Email"}
              name={category === "shops" ? "shopCode" : "email"}
              type={category === "shops" ? "text" : "email"}
              register={register}
              errors={errors}
              required
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              register={register}
              errors={errors}
              required
            />
            <button className="w-full py-2 rounded-full bg-green-800 text-white">
              Login
            </button>
          </form>
        </div>
        <div className="hidden lg:block lg:col-span-6">
          <img
            src="/images/admin-login.jpg"
            alt=""
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
