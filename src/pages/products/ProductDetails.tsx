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
      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="h-96 col-span-12 lg:col-span-6 bg-white p-5 rounded-md">
          <ImageGallery images={product?.product_images} />
        </div>
        <div className="col-span-12 lg:col-span-6 bg-white space-y-2 p-5 rounded-md">
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
