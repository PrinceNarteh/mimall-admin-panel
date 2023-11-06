import AdminForm from "@components/forms/AdminForm";
import Heading from "@components/shared/Heading";
import Spinner from "@components/shared/Spinner";
import { Admin } from "@custom-types/index";
import { useGetQuery } from "@hooks/useGetQuery";
import { queryKeys } from "@utils/queryKeys";
import { useParams } from "react-router-dom";

const EditShop = () => {
  const { adminId } = useParams();
  const { data, isLoading } = useGetQuery<Admin>({
    queryKey: queryKeys.Admin.key(adminId as string),
    url: queryKeys.Admin.url(adminId as string),
  });

  return (
    <div className="px-5">
      {isLoading && <Spinner isLoading={isLoading} />}
      <Heading label="Add Administrators" />
      <AdminForm admin={data} />
    </div>
  );
};

export default EditShop;
