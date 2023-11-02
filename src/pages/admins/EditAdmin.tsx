import AdminForm from "@components/forms/AdminForm";
import Heading from "@components/shared/Heading";
import { Admin } from "@custom-types/index";
import { useGetQuery } from "@hooks/useGetQuery";
import { queryKeys } from "@utils/queryKeys";
import { useParams } from "react-router-dom";

const EditAdmin = () => {
  const { adminId } = useParams();
  const { data } = useGetQuery<Admin>({
    queryKey: queryKeys.GetAdmin.key(adminId as string),
    url: queryKeys.GetAdmin.url(adminId as string),
  });

  return (
    <div className="px-5">
      <Heading label="Add Administrators" />
      <AdminForm admin={data} />
    </div>
  );
};

export default EditAdmin;