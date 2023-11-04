import ProductForm from "@components/forms/ProductForm";
import Heading from "@components/shared/Heading";
import Spinner from "@components/shared/Spinner";
import { Product } from "@custom-types/index";
import { useGetQuery } from "@hooks/useGetQuery";
import { queryKeys } from "@utils/queryKeys";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { productId } = useParams();
  const { data, isLoading } = useGetQuery<Product>({
    queryKey: queryKeys.Product.key(productId as string),
    url: queryKeys.Product.url(productId as string),
  });

  return (
    <div className="px-5">
      {isLoading && <Spinner isLoading={isLoading} />}
      <Heading label="Add Administrators" />
      <ProductForm product={data} />
    </div>
  );
};

export default EditProduct;
