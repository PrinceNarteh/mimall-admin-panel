import DetailsCard from "@components/shared/DetailsCard";
import DetailsCardItem from "@components/shared/DetailsCardItem";
import ImageGallery from "@components/shared/ImageGallery";
import { Product } from "@custom-types/index";
import { Icon } from "@iconify/react";
import { fetchImage } from "@utils/fetchImage";
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
      title={`${product?.name}`}
      description={`${product?.description}`}
      closeDetails={() => setProduct(null)}
      image={`${fetchImage({
        imageName: product?.product_images[0],
        entity: "admins",
      })}`}
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
      <div className="bg-white flex flex-col md:flex-row gap-5 p-5 rounded-md">
        <div className="shrink-0 md:w-60 md:h-60 mx-auto">
          <ImageGallery images={product?.product_images} entity="products" />
        </div>
        <div className="w-full space-y-2">
          <DetailsCardItem label="Price" value={product?.price} />
          <DetailsCardItem label="Stock" value={product?.stock} />
          <DetailsCardItem label="Brand" value={product?.brand} />
          <DetailsCardItem label="Category" value={product?.category} />
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
