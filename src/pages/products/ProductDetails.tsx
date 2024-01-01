import DetailsCard from "@components/shared/DetailsCard";
import DetailsCardItem from "@components/shared/DetailsCardItem";
import ImageGallery from "@components/shared/ImageGallery";
import { Product } from "@custom-types/index";
import { Icon } from "@iconify/react";
import { capitalize } from "@utils/capitalize";
import React from "react";

type ProductProps = {
  product: Product | null;
  setProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  handleDelete: (product: Product | null) => Promise<void>;
};

const ProductDetails: React.FC<ProductProps> = ({
  product = null,
  setProduct,
  handleDelete,
}) => {
  console.log(product);
  return (
    <DetailsCard
      heading="Product Details"
      title={`${product?.title}`}
      description={`${product?.description}`}
      closeDetails={() => setProduct(null)}
      image={product?.product_images[0]}
      openDetails={!!product}
      editLink={`/admins/${product?._id}/edit`}
      actionButtons={() => (
        <button onClick={() => handleDelete(product)}>
          <Icon
            icon="fluent:delete-28-regular"
            className="text-xl text-red-500"
          />
        </button>
      )}
    >
      <div className="flex flex-col lg:flex-row gap-5 mb-5">
        <div className="flex-1 bg-white p-5 rounded-md">
          <ImageGallery images={product?.product_images} entity="products" />
        </div>
        <div className="flex-1 bg-white space-y-2 p-5 rounded-md">
          <DetailsCardItem label="Price" value={product?.price} />
          <DetailsCardItem label="Stock" value={product?.stock} />
          <DetailsCardItem label="Brand" value={product?.brand} />
          <DetailsCardItem
            label="Category"
            value={capitalize(product?.category)}
          />
          <DetailsCardItem
            label="Discount Percentage"
            value={product?.discount_percentage}
          />
          <DetailsCardItem label="Rating" value={5} />
        </div>
      </div>
    </DetailsCard>
  );
};

export default ProductDetails;
