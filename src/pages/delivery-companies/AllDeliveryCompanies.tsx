import DeliveryCompanyForm from "@components/forms/DeliveryCompanyForm";
import Heading from "@components/shared/Heading";
import Modal from "@components/shared/Modal";
import Spinner from "@components/shared/Spinner";
import Table from "@components/shared/Table";
import { DeliveryCompany } from "@custom-types/index";
import useConfirm from "@hooks/useConfirm";
import { useGetQuery } from "@hooks/useGetQuery";
import { Icon } from "@iconify/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { queryKeys } from "@utils/queryKeys";
import { useEffect, useState } from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import DeliveryCompanyDetails from "./DeliveryCompanyDetails";
import { effect } from "zod";

const AllDeliveryCompanies = () => {
  const { ConfirmationDialog, confirm, setIsOpen } = useConfirm();
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [deliveryCompany, setDeliveryCompany] =
    useState<DeliveryCompany | null>(null);

  const { data, isLoading } = useGetQuery<DeliveryCompany[]>({
    queryKey: queryKeys.DeliveryCompanies.key,
    url: queryKeys.DeliveryCompanies.url,
  });

  const handleDetails = (deliveryCompany: DeliveryCompany) => {
    setDeliveryCompany(deliveryCompany);
    setOpenDetails(true);
  };

  const handleEdit = (deliveryCompany: DeliveryCompany | null) => {
    setDeliveryCompany(deliveryCompany);
    setOpenForm(true);
  };

  const handleDelete = async (deliveryCompany: DeliveryCompany | null) => {
    if (!deliveryCompany) return;

    const isConfirmed = await confirm({
      title: "Are You Sure?",
      message: `Are you sure you want to delete "${deliveryCompany?.name}"?`,
    });

    if (isConfirmed) {
      console.log(isConfirmed);
      setIsOpen(false);
    }
  };

  const columnHelper = createColumnHelper<DeliveryCompany>();
  const columns = [
    columnHelper.display({
      id: "SN",
      header: "No.",
      cell: (info) => <span className="pl-2">{info.row.index + 1}</span>,
    }),
    columnHelper.accessor("name", {
      header: "Delivery Company",
      cell: (props) => (
        <div className="flex items-center">
          <div>
            <img
              src={props.row.original.slide_images[0]}
              alt=""
              className="h-12 w-12 object-cover rounded-full"
            />
          </div>
          <div className="ml-2">
            <div className=" text-blue-900 text-[15px] font-bold leading-snug">
              {props.row.original.name}
            </div>
            <div className=" text-slate-800 text-sm font-normal leading-tight">
              {props.row.original.owner_first_name}{" "}
              {props.row.original.owner_last_name}
            </div>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor("phone_number", {
      header: "Phone Number",
      cell: (info) => <span>{formatPhoneNumberIntl(info.getValue())}</span>,
    }),
    columnHelper.accessor("location", {
      header: "Location",
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
        <span className="w-20 flex gap-3">
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
  ] as Array<ColumnDef<DeliveryCompany, unknown>>;

  useEffect(() => {
    if (!openDetails && !openForm) {
      setDeliveryCompany(null);
    }
  }, [openForm, openDetails]);

  return (
    <div>
      {isLoading && <Spinner isLoading={isLoading} />}
      <Heading label="All Delivery Companies" />
      <Table
        data={data}
        columns={columns}
        actionButton={() => (
          <button
            onClick={() => setOpenForm(true)}
            className="text-xs py-1.5 px-4 bg-primary rounded text-white flex items-center gap-1"
          >
            <Icon icon="ic:baseline-add-circle-outline" />
            Add Delivery Company
          </button>
        )}
      />

      <DeliveryCompanyDetails
        handleEdit={handleEdit}
        openDetails={openDetails}
        deliveryCompany={deliveryCompany}
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
        <DeliveryCompanyForm
          openForm={openForm}
          setOpenForm={setOpenForm}
          deliveryCompany={deliveryCompany}
        />
      </Modal>

      <ConfirmationDialog />
    </div>
  );
};

export default AllDeliveryCompanies;
