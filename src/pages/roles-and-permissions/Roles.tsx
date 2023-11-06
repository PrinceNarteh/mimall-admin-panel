import Heading from "@components/shared/Heading";
import Modal from "@components/shared/Modal";
import { useGetQuery } from "@hooks/useGetQuery";
import { queryKeys } from "@utils/queryKeys";
import React, { useState } from "react";
import Permissions from "./Permissions";
import { Permission } from "@custom-types/index";

const RolesAndPermissions = () => {
  const [openPermissions, setOpenPermissions] = useState(true);
  const { data: permissions } = useGetQuery<Permission[]>({
    queryKey: queryKeys.Permissions.key,
    url: queryKeys.Permissions.url,
  });

  console.log(permissions);

  return (
    <div>
      <Heading label="Roles And Permissions" />
      <Modal
        openModal={openPermissions}
        closeModal={() => {}}
        width="max-w-3xl"
      >
        <Permissions permissions={permissions} />
      </Modal>
    </div>
  );
};

export default RolesAndPermissions;
