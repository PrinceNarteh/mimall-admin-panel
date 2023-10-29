import { useGetQuery } from "@src/hooks/useGetQuery";
import { queryKeys } from "@src/utils/queryKeys";
import Table from "@src/components/shared/Table";
import { User } from "@src/types";
import { createColumnHelper } from "@tanstack/react-table";
import Spinner from "@src/components/shared/Spinner";

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
      cell: () => <span>1</span>,
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
  ];

  return (
    <div>
      {isLoading && <Spinner isLoading={isLoading} />}
      <Table data={data} columns={columns} />
    </div>
  );
};

export default AllAdmins;
