import Heading from "@components/shared/Heading";
import Spinner from "@components/shared/Spinner";
import Table from "@components/shared/Table";
import { User } from "@custom-types/index";
import { useGetQuery } from "@hooks/useGetQuery";
import { Icon } from "@iconify/react";
import { createColumnHelper } from "@tanstack/react-table";
import { getImage } from "@utils/getImage";
import { queryKeys } from "@utils/queryKeys";
import { Link } from "react-router-dom";

const AllAdmins = () => {
  const { data, isLoading } = useGetQuery({
    queryKey: queryKeys.AllAdmins.key,
    url: queryKeys.AllAdmins.url,
  });

  const columnHelper = createColumnHelper<User>();
  const columns = [
    columnHelper.display({
      id: "name",
      header: "No.",
      cell: () => <span className="pl-2">1</span>,
    }),
    columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
      id: "Admin",
      cell: (props) => (
        <div className="flex items-center">
          <div>
            <img
              src={getImage(props.row.original.profile_image, "admins")}
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
    columnHelper.accessor("phone_number", {
      header: "Phone Number",
    }),
    columnHelper.accessor("active", {
      header: "Status",
      cell: (cell) => <span>{cell.getValue() ? "Active" : "Not Active"}</span>,
    }),
    columnHelper.display({
      header: "Details",
      cell: () => (
        <button className="text-xs border border-primary px-2 py-1 rounded text-primary">
          Details
        </button>
      ),
    }),
    columnHelper.display({
      header: "Actions",
      cell: (props) => (
        <span className="w-20 flex gap-3">
          <Link to={`/companies/${props.row.original._id}/edit`}>
            <Icon
              icon="iconamoon:edit-light"
              className="mt-[0.7rem] h-5 w-5 ml-3"
            />
          </Link>
          <button>
            <Icon
              icon="fluent:delete-28-regular"
              className="mt-[0.7rem] h-5 w-5 ml-3 text-red-500"
            />
          </button>
        </span>
      ),
    }),
  ];

  return (
    <div>
      {isLoading && <Spinner isLoading={isLoading} />}
      <Heading label="All Administrators" />
      <Table data={data} columns={columns} />
    </div>
  );
};

export default AllAdmins;
