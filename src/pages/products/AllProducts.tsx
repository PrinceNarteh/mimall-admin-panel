import Heading from "@components/shared/Heading";
import Spinner from "@components/shared/Spinner";
import Table from "@components/shared/Table";
import { Product } from "@custom-types/index";
import { useGetQuery } from "@hooks/useGetQuery";
import { Icon } from "@iconify/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { fetchImage } from "@utils/fetchImage";
import { queryKeys } from "@utils/queryKeys";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import AdminDetails from "./ProductDetails";
import useConfirm from "@hooks/useConfirm";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import ProductDetails from "./ProductDetails";

const AllProducts = () => {
  const ref = useRef<HTMLDivElement>(null);
  console.log(ref);
  const { ConfirmationDialog, confirm, setIsOpen } = useConfirm();
  const [product, setProduct] = useState<Product | null>(null);
  const { data, isLoading } = useGetQuery<Product[]>({
    queryKey: queryKeys.Products.key,
    url: queryKeys.Products.url,
  });

  const handleDelete = async (product: Product | null) => {
    if (!product) return;

    const isConfirmed = await confirm({
      title: "Are You Sure?",
      message: `Are you sure you want to delete "${product?.name}"?`,
    });

    if (isConfirmed) {
      console.log(isConfirmed);
      setIsOpen(false);
    }
  };

  const columnHelper = createColumnHelper<Product>();
  const columns = [
    columnHelper.display({
      id: "name",
      header: "No.",
      cell: (info) => <span className="pl-2">{info.row.index + 1}</span>,
    }),
    columnHelper.accessor("name", {
      id: "Product",
      cell: (props) => (
        <div className="flex items-center">
          <div>
            <img
              src={fetchImage({
                imageName: props.row.original.product_images[0],
                entity: "admins",
              })}
              alt=""
              className="h-12 w-12 object-cover rounded-full"
            />
          </div>
          <div className="ml-2">
            <div className=" text-blue-900 text-[15px] font-bold leading-snug">
              {props.row.original.name}
            </div>
            <div className=" text-slate-400 text-sm font-normal leading-tight line-clamp-1">
              {props.row.original.description}
            </div>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor<"stock", number>("stock", {
      header: "Stock",
    }),
    columnHelper.accessor<"price", number>("price", {
      header: "Price",
    }),
    columnHelper.display({
      header: "Details",
      cell: (props) => (
        <button
          onClick={() => setProduct(props.row.original)}
          className="text-xs border border-primary px-2 py-1 rounded text-primary"
        >
          Details
        </button>
      ),
    }),
    columnHelper.display({
      header: "Actions",
      cell: (props) => (
        <span className="w-20 flex gap-3">
          <Link to={`/admins/${props.row.original._id}/edit`}>
            <Icon icon="iconamoon:edit-light" className="text-xl" />
          </Link>
          <button onClick={() => handleDelete(props.row.original)}>
            <Icon
              icon="fluent:delete-28-regular"
              className="text-xl text-red-500"
            />
          </button>
        </span>
      ),
    }),
  ] as Array<ColumnDef<Product, unknown>>;

  return (
    <div>
      {isLoading && <Spinner isLoading={isLoading} />}
      <Heading label="All Administrators" />
      <Table data={data} columns={columns} />

      <ProductDetails
        product={product}
        setProduct={setProduct}
        handleDelete={handleDelete}
      />

      <ConfirmationDialog />
    </div>
  );
};

export default AllProducts;
