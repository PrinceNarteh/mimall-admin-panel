import { Product, Role } from "@custom-types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetQuery } from "@hooks/useGetQuery";
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

const defaultValues = {
  name: "",
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

const ProductForm = ({ product }: ProductFormProps) => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File[] | null>(null);
  const [preview, setPreview] = useState("");

  const { data: roles } = useGetQuery<Role[]>({
    queryKey: queryKeys.Roles.key,
    url: queryKeys.Roles.url,
  });

  const formValues = productResolver(product);
  type FormValues = z.infer<typeof formValues>;
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(productResolver(product)),
  });

  const navigate = useNavigate();
  const { mutate } = useMutate();
  const submit: SubmitHandler<FormValues> = (data) => {
    const toastId = toast.loading("Creating Product...");
    const formData = new FormData();
    // Object.values(data).forEach((item) => formData.append(item[0], item[1]));

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
      <form onSubmit={handleSubmit(submit)}>
        <div className="form-row">
          <InputField name="name" label="First Name" register={register} />
          <InputField
            name="description"
            label="Last Name"
            register={register}
          />
        </div>
        <div className="form-row">
          <InputField
            type="number"
            name="price"
            label="Middle Name"
            register={register}
          />
          <InputField
            type="number"
            name="stock"
            label="Email"
            register={register}
          />
        </div>

        <div className="form-row">
          <InputField
            name="discount_percentage"
            label="Discount Percentage"
            required
            register={register}
          />

          <InputField name="brand" label="Brand" register={register} />
        </div>

        <div className="form-row">
          <InputField name="category" label="Category" register={register} />
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
          <Button>{`${product ? "Update" : "Create"} Product`}</Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
