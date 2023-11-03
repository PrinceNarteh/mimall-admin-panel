import ProductForm from "@components/forms/ProductForm";
import Heading from "@components/shared/Heading";

const AddProduct = () => {
  return (
    <div className="px-5">
      <Heading label="Add Product" />
      <ProductForm />
    </div>
  );
};

export default AddProduct;
