import CustomSelect from "@components/shared/CustomSelect";
import ErrorMessage from "@components/shared/ErrorMessage";
import Heading from "@components/shared/Heading";
import { Product, Shop } from "@custom-types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetQuery } from "@hooks/useGetQuery";
import useMutate from "@hooks/useMutate";
import { useUser } from "@hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@utils/queryKeys";
import { productResolver } from "@utils/validators";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Button from "../shared/Button";
import CustomFileInput from "../shared/CustomFileInput";
import InputField from "../shared/InputField";

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
  const user = useUser();
  const queryClient = useQueryClient();
  const [images, setImages] = useState<File[] | null>(null);
  const [preview, setPreview] = useState<string[]>([]);

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      stock: 0,
      discount_percentage: 0,
      brand: "",
      category: "",
      product_images: [],
      shop: user?.role.name === "Shop" ? user._id : "",
    },
    resolver: zodResolver(productResolver),
  });

  const { data, isLoading } = useGetQuery<Shop[]>({
    queryKey: queryKeys.Shops.key,
    url: queryKeys.Shops.url,
  });

  const shops =
    data?.map((shop) => ({
      id: shop._id,
      label: shop.name,
    })) ?? [];

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
          : `${queryKeys.Products.url}`,
        data,
        method: product ? "PATCH" : "POST",
        multipart: true,
      },
      {
        onSuccess(data) {
          queryClient.setQueryData<Product[]>(
            queryKeys.Products.key,
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
        },
        onError(error: any) {
          toast.dismiss(toastId);
          toast.error(error.response.data.message);
        },
      }
    );
  };

  useEffect(() => {
    if (images) {
      setValue("product_images", images);
      setPreview(images.map((image) => URL.createObjectURL(image)));
    }
  }, [images, setValue]);

  console.log(errors);

  return (
    <div className="p-5 bg-white">
      <Heading label={`${product ? "Edit" : "Add"} Product`} />
      <form onSubmit={handleSubmit(submit)} className="mt-5">
        <CustomSelect
          data={shops}
          label="Select Shop"
          loading={isLoading}
          name="shop"
          placeholder="Select Shop..."
          setValue={setValue}
          errors={errors}
        />
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

        <div className="flex justify-center overflow-auto gap-5 mt-5">
          {preview.map((image, key) => (
            <img
              key={key}
              src={image}
              className="rounded-md w-40 h-40"
              alt=""
            />
          ))}
        </div>
        <div className="max-w-sm mx-auto">
          <CustomFileInput
            label="Product Images"
            placeholder="Drop slide images here"
            required
            onChange={setImages}
            multiple
            height="h-28"
          />
          <ErrorMessage name="slide_images" errors={errors} />
        </div>

        <div className="flex justify-end mt-5">
          <Button>{`${product ? "Update" : "Create"} Product`}</Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
