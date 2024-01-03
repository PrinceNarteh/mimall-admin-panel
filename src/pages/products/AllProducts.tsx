import ProductForm from "@components/forms/ProductForm";
import Heading from "@components/shared/Heading";
import Modal from "@components/shared/Modal";
import Spinner from "@components/shared/Spinner";
import Table from "@components/shared/Table";
import { Product } from "@custom-types/index";
import useConfirm from "@hooks/useConfirm";
import { useGetQuery } from "@hooks/useGetQuery";
import { useUser } from "@hooks/useUser";
import { Icon } from "@iconify/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { capitalize } from "@utils/capitalize";
import { queryKeys } from "@utils/queryKeys";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProductDetails from "./ProductDetails";

const AllProducts = () => {
  const user = useUser();
  const { ConfirmationDialog, confirm, setIsOpen } = useConfirm();
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const { data, isLoading } = useGetQuery<Product[]>({
    queryKey: queryKeys.Products.key,
    url: queryKeys.Products.url,
  });

  const handleDetails = (shop: Product | null) => {
    setProduct(shop);
    setOpenDetails(true);
  };

  const handleEdit = (shop: Product | null) => {
    setProduct(shop);
    setOpenForm(true);
  };

  const handleDelete = async (product: Product | null) => {
    if (!product) return;

    const isConfirmed = await confirm({
      title: "Are You Sure?",
      message: `Are you sure you want to delete "${product?.title}"?`,
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
    columnHelper.accessor("title", {
      id: "Product",
      cell: (props) => (
        <div className="flex items-center">
          <div>
            <img
              src={props.row.original.product_images[0]}
              alt=""
              className="h-12 w-12 object-cover rounded-full"
            />
          </div>
          <div className="ml-2">
            <div className=" text-blue-900 text-[15px] font-bold leading-snug">
              {props.row.original.title}
            </div>
            <div className=" text-slate-400 text-sm font-normal leading-tight line-clamp-1">
              {props.row.original.description}
            </div>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("category", {
      header: "category",
      cell: (info) => capitalize(info.getValue()),
    }),
    columnHelper.accessor<"price", number>("price", {
      header: "Price",
    }),
    columnHelper.accessor<"stock", number>("stock", {
      header: "Stock",
    }),
    columnHelper.display({
      header: "Details",
      cell: (props) => (
        <button
          onClick={() => handleDetails(props.row.original)}
          className="text-xs border border-primary px-2 py-1 rounded text-primary"
        >
          Details
        </button>
      ),
    }),
    columnHelper.display({
      header: "Actions",
      cell: (props) => (
        <span className="flex gap-3">
          <button onClick={() => handleEdit(props.row.original)}>
            <Icon icon="iconamoon:edit-light" className="text-xl" />
          </button>
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
      <Heading label="All Products" />
      <Table
        data={data}
        columns={columns}
        actionButton={() => (
          <button
            onClick={() => setOpenForm(true)}
            className="text-xs py-1.5 px-4 bg-primary rounded text-white flex items-center gap-1"
          >
            <Icon icon="ic:baseline-add-circle-outline" />
            Add Product
          </button>
        )}
      />

      <ProductDetails
        product={product}
        handleEdit={handleEdit}
        openDetails={openDetails}
        handleDelete={handleDelete}
        setOpenDetails={setOpenDetails}
      />

      <Modal
        start
        disableOutsideClick
        width="max-w-3xl"
        openModal={openForm}
        closeModal={setOpenForm}
      >
        <ProductForm
          product={product}
          setProduct={setProduct}
          handleDelete={handleDelete}
        />
      </Modal>

      <ConfirmationDialog />
    </div>
  );
};

export default AllProducts;
