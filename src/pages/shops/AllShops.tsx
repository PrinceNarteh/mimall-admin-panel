import ShopForm from "@components/forms/ShopForm";
import Heading from "@components/shared/Heading";
import Modal from "@components/shared/Modal";
import Spinner from "@components/shared/Spinner";
import Table from "@components/shared/Table";
import { Admin, Shop } from "@custom-types/index";
import useConfirm from "@hooks/useConfirm";
import { useGetQuery } from "@hooks/useGetQuery";
import { Icon } from "@iconify/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { fetchImage } from "@utils/fetchImage";
import { queryKeys } from "@utils/queryKeys";
import { useEffect, useState } from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import ShopDetails from "./ShopDetails";

const AllShops = () => {
  const { ConfirmationDialog, confirm, setIsOpen } = useConfirm();
  const [shop, setShop] = useState<Shop | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const { data, isLoading } = useGetQuery<Admin[]>({
    queryKey: queryKeys.Shops.key,
    url: queryKeys.Shops.url,
  });

  const handleDetails = (shop: Shop | null) => {
    setShop(shop);
    setOpenDetails(true);
  };

  const handleEdit = (shop: Shop | null) => {
    setShop(shop);
    setOpenForm(true);
  };

  const handleDelete = async (shop: Shop | null) => {
    if (!shop) return;

    const isConfirmed = await confirm({
      title: "Are You Sure?",
      message: `Are you sure you want to delete "${shop?.name}"?`,
    });

    if (isConfirmed) {
      console.log(isConfirmed);
      setIsOpen(false);
    }
  };

  const columnHelper = createColumnHelper<Shop>();
  const columns = [
    columnHelper.display({
      id: "Index",
      header: "No.",
      cell: (info) => <span className="pl-2">{info.row.index + 1}</span>,
    }),
    columnHelper.accessor((row) => `${row.name}`, {
      id: "Admin",
      cell: (props) => (
        <div className="flex items-center">
          <div>
            <img
              src={fetchImage({
                imageName: props.row.original.profile_image,
                entity: "shops",
              })}
              alt=""
              className="h-12 w-12 object-cover rounded-full"
            />
          </div>
          <div className="ml-2">
            <div className=" text-blue-900 text-[15px] font-bold leading-snug">
              {props.row.original.name}
            </div>
            <div className=" text-slate-400 text-sm font-normal leading-tight">
              {props.row.original.shop_code}
            </div>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor<"phone_number", string>("phone_number", {
      header: "Phone Number",
      cell: (info) => <span>{formatPhoneNumberIntl(info.getValue())}</span>,
    }),
    columnHelper.accessor<"location", string>("location", {
      header: "Location",
    }),
    columnHelper.accessor<"active", boolean>("active", {
      header: "Status",
      cell: (cell) => <span>{cell.getValue() ? "Active" : "Not Active"}</span>,
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
        <span className="w-20 flex gap-5">
          <button onClick={() => handleEdit(props.row.original)}>
            <Icon
              icon="iconamoon:edit-light"
              className="text-xl text-primary"
            />
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
  ] as Array<ColumnDef<Admin, unknown>>;

  useEffect(() => {
    if (!openDetails && !openForm) {
      setShop(null);
    }
  }, [openForm, openDetails]);

  return (
    <div>
      {isLoading && <Spinner isLoading={isLoading} />}
      <Heading label="All Administrators" />
      <Table
        data={data}
        columns={columns}
        actionButton={() => (
          <button
            onClick={() => setOpenForm(true)}
            className="text-xs py-1.5 px-4 bg-primary rounded text-white flex items-center gap-1"
          >
            <Icon icon="ic:baseline-add-circle-outline" />
            Add Shop
          </button>
        )}
      />

      <ShopDetails
        shop={shop}
        handleEdit={handleEdit}
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
        handleDelete={handleDelete}
      />

      <Modal
        start
        disableOutsideClick
        width="max-w-3xl"
        openModal={openForm}
        closeModal={setOpenForm}
      >
        <ShopForm shop={shop} />
      </Modal>

      <ConfirmationDialog />
    </div>
  );
};

export default AllShops;
