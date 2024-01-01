import Heading from "@components/shared/Heading";
import { Product, Shop } from "@custom-types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import useMutate from "@hooks/useMutate";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@utils/queryKeys";
import { productResolver } from "@utils/validators";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "../shared/Button";
import CustomFileInput from "../shared/CustomFileInput";
import InputField from "../shared/InputField";
import { useGetQuery } from "@hooks/useGetQuery";
import CustomSelect from "@components/shared/CustomSelect";

const defaultValues = {
  title: "",
  description: "",
  price: 0,
  stock: 0,
  discount_percentage: 0,
  brand: "",
  category: "",
  product_images: [],
  shop: "",
};

type ProductFormProps = {
  product: Product | null;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  handleDelete: (product: Product | null) => Promise<void>;
};

type FormValues = z.infer<typeof productResolver>;
const categories = [
  { label: "Food", value: "food" },
  { label: "Fashion And Wears", value: "fashion_and_wears" },
  { label: "Grocery And General", value: "grocery_and_general" },
  { label: "Health And Wellness", value: "health_and_wellness" },
  {
    label: "Home And Electrical Appliances",
    value: "home_and_electrical_appliances",
  },
  { label: "Personal Services", value: "personal_services" },
  { label: "Printing And Stationery", value: "printing_and_stationery" },
  { label: "Tech", value: "tech" },
];

const ProductForm = ({ product }: ProductFormProps) => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File[] | null>(null);
  const [preview, setPreview] = useState("");

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(productResolver),
  });

  const navigate = useNavigate();
  const { mutate } = useMutate();
  const submit: SubmitHandler<FormValues> = (data) => {
    const toastId = toast.loading("Creating Product...");
    const formData = new FormData();
    Object.entries(data).forEach((item) => {
      if (item[0] === "product_images") {
        for (let image of item[1] as File[] | string[]) {
          formData.append("product_images", image);
        }
      } else {
        formData.append(item[0], item[1] as string);
      }
    });

    console.log(data);

    mutate(
      {
        url: product
          ? `${queryKeys.Product.url(product._id)}`
          : `${queryKeys.Admins.url}/register`,
        data,
        method: product ? "PATCH" : "POST",
        multipart: true,
      },
      {
        onSuccess(data) {
          queryClient.setQueryData<Product[]>(
            queryKeys.Admins.key,
            (oldData) => {
              if (product) {
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
          toast.success("Product successfully created");
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
    // if (!product && image && image.some((image) => image !== undefined)) {
    //   setValue("profile_image", image[0]);
    //   setPreview(URL.createObjectURL(image[0]));
    // } else if (!image && product && product.profile_image) {
    //   setPreview(
    //     fetchImage({ imageName: product.profile_image, entity: "admins" })
    //   );
    // } else if (product && image && image.some((image) => image !== undefined)) {
    //   setValue("profile_image", image[0]);
    //   setPreview(URL.createObjectURL(image[0]));
    // }
  }, [product, image, setValue]);

  // useEffect(() => {
  //   if (product) {
  //     Object.entries(product).forEach((item) =>
  //       setValue(item[0] as keyof FormValues, item[1])
  //     );
  //   }
  // }, [product, setValue]);

  return (
    <div className="p-5 bg-white">
      <Heading label={`${product ? "Edit" : "Add"} Product`} />
      <form onSubmit={handleSubmit(submit)}>
        <div className="form-row">
          <InputField name="title" label="Title" register={register} required />
          <InputField
            name="description"
            label="Description"
            register={register}
            required
          />
        </div>
        <div className="form-row">
          <InputField
            type="number"
            name="stock"
            label="Stock"
            register={register}
            required
          />
          <InputField
            type="number"
            name="price"
            label="Price"
            register={register}
            required
          />
          <InputField
            name="discount_percentage"
            label="Discount Percentage"
            required
            register={register}
          />
        </div>

        <div className="form-row">
          <InputField name="brand" required label="Brand" register={register} />
          <div className="flex-1">
            <label className="mb-1 block text-primary text-md font-semibold leading-loose">
              Category
            </label>
            <select
              {...register("category")}
              className="placeholder:text-slate-400 block bg-white w-full outline-none border border-slate-400 shadow-md rounded-md p-3 sm:text-sm"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors["category"] && (
              <span className="text-red-500 text-[12px]">
                {errors["category"]?.message as string}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 items-center md:flex-row md:items-end max-w-lg md:justify-center mx-auto">
          {preview && (
            <img src={preview} className="rounded-md w-40 h-40" alt="" />
          )}
          <div className="flex-1">
            <CustomFileInput
              height="h-28"
              label="Profile Image"
              placeholder="Drop your profile image here"
              required
              onChange={setImage}
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <Button>{`${product ? "Update" : "Create"} Product`}</Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
