import { Role } from "@custom-types/index";
import { queryKeys } from "@utils/queryKeys";
import { useEffect } from "react";
import { useGetQuery } from "./useGetQuery";

export const useSetRole = ({
  setValue,
  entity,
}: {
  entity: string;
  setValue: any;
}) => {
  const { data: roles } = useGetQuery<Role[]>({
    queryKey: queryKeys.Roles.key,
    url: queryKeys.Roles.url,
  });

  useEffect(() => {
    if (roles) {
      const role = roles.find((role) =>
        role.name.toLowerCase().startsWith(entity.toLowerCase())
      );
      console.log(role);
      if (role) {
        setValue("role", role._id);
      }
    }
  }, [roles, setValue]);

  return <div>useSetRole</div>;
};
