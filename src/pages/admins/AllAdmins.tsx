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
