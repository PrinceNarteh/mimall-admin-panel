import { useGetQuery } from "@src/hooks/useGetQuery";
import { queryKeys } from "@src/utils/queryKeys";
import Table from "@src/components/shared/Table";
import { User } from "@src/types";
import { createColumnHelper } from "@tanstack/react-table";
import Spinner from "@src/components/shared/Spinner";
import { getImage } from "@src/utils/getImage";

const AllAdmins = () => {
  const { data, isLoading } = useGetQuery({
    queryKey: queryKeys.AllAdmins.key,
    url: queryKeys.AllAdmins.url,
  });

  console.log(data);

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
      
    }),
  ];

  return (
    <div className="px-5">
      {isLoading && <Spinner isLoading={isLoading} />}
      <Table data={data} columns={columns} />
    </div>
  );
};

export default AllAdmins;
