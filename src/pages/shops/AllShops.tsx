import Heading from "@components/shared/Heading";
import Spinner from "@components/shared/Spinner";
import Table from "@components/shared/Table";
import { Admin, Shop } from "@custom-types/index";
import { useGetQuery } from "@hooks/useGetQuery";
import { Icon } from "@iconify/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { fetchImage } from "@utils/fetchImage";
import { queryKeys } from "@utils/queryKeys";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import AdminDetails from "./ShopDetails";
import useConfirm from "@hooks/useConfirm";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import Modal from "@components/shared/Modal";
import ShopForm from "@components/forms/ShopForm";

// _id: string;
// role: Role;
// phone_number: string;
// alternate_phone_number: string;
// active: boolean;
// createdAt: string;
// updatedAt: string;
// token: string;
// shopCode: string;
// name: string;
// password: string;
// plainPassword: string;
// description: string;
// location: string;
// mapDirection: string;
// phoneNumber: string;
// alternateNumber: string;
// whatsappNumber: string;
// instagramHandle: string;
// facebookHandle: string;
// twitterHandle: string;
// tiktokHandle: string;
// openingTime: string;
// closingTime: string;
// image: string;
// banner: string;
// products: Product[];
// orders: OrderItem[];
// quickOrderItems: QuickOrderItem[];

const AllShops = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { ConfirmationDialog, confirm, setIsOpen } = useConfirm();
  const [shop, setShop] = useState<Shop | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const { data, isLoading } = useGetQuery<Admin[]>({
    queryKey: queryKeys.Shops.key,
    url: queryKeys.Shops.url,
  });

  const handleDelete = async (admin: Admin | null) => {
    if (!admin) return;

    const isConfirmed = await confirm({
      title: "Are You Sure?",
      message: `Are you sure you want to delete "${admin?.first_name} ${admin?.last_name}"?`,
    });

    if (isConfirmed) {
      console.log(isConfirmed);
      setIsOpen(false);
    }
  };

  const columnHelper = createColumnHelper<Admin>();
  const columns = [
    columnHelper.display({
      id: "Index",
      header: "No.",
      cell: (info) => <span className="pl-2">{info.row.index + 1}</span>,
    }),
    columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
      id: "Admin",
      cell: (props) => (
        <div className="flex items-center">
          <div>
            <img
              src={fetchImage({
                imageName: props.row.original.profile_image,
                entity: "admins",
              })}
              alt=""
              className="h-12 w-12 object-cover rounded-full"
            />
          </div>
          <div className="ml-2">
            <div className=" text-blue-900 text-[15px] font-bold leading-snug">
              {props.row.original.first_name} {props.row.original.last_name}
            </div>
            <div className=" text-slate-400 text-sm font-normal leading-tight">
              {props.row.original.email}
            </div>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor<"phone_number", string>("phone_number", {
      header: "Phone Number",
      cell: (info) => <span>{formatPhoneNumberIntl(info.getValue())}</span>,
    }),
    columnHelper.accessor<"active", boolean>("active", {
      header: "Status",
      cell: (cell) => <span>{cell.getValue() ? "Active" : "Not Active"}</span>,
    }),
    columnHelper.display({
      header: "Details",
      cell: (props) => (
        <button
          onClick={() => setAdmin(props.row.original)}
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
  ] as Array<ColumnDef<Admin, unknown>>;

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

      <AdminDetails
        admin={admin}
        setAdmin={setAdmin}
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
