import AdminForm from "@components/forms/AdminForm";
import Heading from "@components/shared/Heading";
import Modal from "@components/shared/Modal";
import Spinner from "@components/shared/Spinner";
import Table from "@components/shared/Table";
import { Admin } from "@custom-types/index";
import useConfirm from "@hooks/useConfirm";
import { useGetQuery } from "@hooks/useGetQuery";
import { Icon } from "@iconify/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { queryKeys } from "@utils/queryKeys";
import { useEffect, useState } from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import AdminDetails from "./AdminDetails";
import useMutate from "@hooks/useMutate";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AllAdmins = () => {
  const { ConfirmationDialog, confirm, setIsOpen } = useConfirm();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const { data, isLoading } = useGetQuery<Admin[]>({
    queryKey: queryKeys.Admins.key,
    url: queryKeys.Admins.url,
  });
  const handleDetails = (admin: Admin) => {
    setAdmin(admin);
    setOpenDetails(true);
  };

  const handleEdit = (admin: Admin | null) => {
    setAdmin(admin);
    setOpenForm(true);
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutate(["delete-admin"]);
  const handleDelete = async (admin: Admin | null) => {
    const isConfirmed = await confirm({
      title: "Are You Sure?",
      message: `Are you sure you want to delete "${admin?.first_name} ${admin?.last_name}"?`,
    });

    if (isConfirmed) {
      const toastId = toast.loading(
        `Deleting ${admin?.first_name} ${admin?.last_name}...`
      );
      mutate(
        {
          url: `/admins/${admin?._id}`,
          method: "DELETE",
        },
        {
          onSuccess(data) {
            queryClient.setQueryData<Admin[]>(queryKeys.Admins.key, (oldData) =>
              (oldData ?? []).filter((item) => item._id !== admin?._id)
            );
            toast.dismiss(toastId);
            toast.success(
              `${admin?.first_name} ${admin?.last_name} deleted successfully!`
            );
            setIsOpen(false);
          },
          onError(error: any) {
            toast.dismiss(toastId);
            toast.error(error.response.data.message);
          },
        }
      );
    }
  };

  const columnHelper = createColumnHelper<Admin>();
  const columns = [
    columnHelper.display({
      id: "name",
      header: "No.",
      cell: (info) => <span className="pl-2">{info.row.index + 1}</span>,
    }),
    columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
      id: "Admin",
      cell: (props) => (
        <div className="flex items-center">
          <div>
            <img
              src={props.row.original.profile_image}
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
      setAdmin(null);
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
            Add Admin
          </button>
        )}
      />

      <AdminDetails
        admin={admin}
        openDetails={openDetails}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        closeDetails={() => {
          setAdmin(null);
          setOpenDetails(false);
        }}
      />

      <ConfirmationDialog />

      <Modal
        start
        width="max-w-3xl"
        disableOutsideClick
        openModal={openForm}
        closeModal={setOpenForm}
      >
        <AdminForm admin={admin} setOpenForm={setOpenForm} />
      </Modal>
    </div>
  );
};

export default AllAdmins;
