import AdminForm from "@components/forms/AdminForm";
import Heading from "@components/shared/Heading";
import Spinner from "@components/shared/Spinner";
import { Admin } from "@custom-types/index";
import { useGetQuery } from "@hooks/useGetQuery";
import { queryKeys } from "@utils/queryKeys";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const { userId } = useParams();
  const { data, isLoading } = useGetQuery<Admin>({
    queryKey: queryKeys.User.key(userId as string),
    url: queryKeys.User.url(userId as string),
  });

  return (
    <div className="px-5">
      {isLoading && <Spinner isLoading={isLoading} />}
      <Heading label="Edit User" />
      <AdminForm admin={data} />
    </div>
  );
};

export default EditUser;
