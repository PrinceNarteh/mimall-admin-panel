import Chip from "@components/shared/Chip";
import Heading from "@components/shared/Heading";
import Modal from "@components/shared/Modal";
import { Icon } from "@iconify/react";
import React, { useState } from "react";

const RolesAndPermissions = () => {
  const [openPermissions, setOpenPermissions] = useState(true);
  return (
    <div>
      <Heading label="Roles And Permissions" />
      <Modal
        openModal={openPermissions}
        closeModal={() => {}}
        width="max-w-3xl"
      >
        <div className="p-5">
          <h3 className="text-primary font-semibold text-4xl mb-10 border-b pb-2 border-b-">
            Permissions
          </h3>
          <div className="flex flex-wrap justify-center gap-5">
            <Chip
              label="Roles and Permissions"
              ActionButton={() => (
                <div className="flex gap-4">
                  <button>
                    <Icon icon="iconamoon:edit-light" className="text-xl" />
                  </button>
                  <button onClick={() => {}}>
                    <Icon icon="fluent:delete-28-regular" className="text-xl" />
                  </button>
                </div>
              )}
            />
            <Chip
              label="Roles and Permissions"
              ActionButton={() => (
                <div className="flex gap-4">
                  <button>
                    <Icon icon="iconamoon:edit-light" className="text-xl" />
                  </button>
                  <button onClick={() => {}}>
                    <Icon icon="fluent:delete-28-regular" className="text-xl" />
                  </button>
                </div>
              )}
            />
            <Chip
              label="Roles and Permissions"
              ActionButton={() => (
                <div className="flex gap-4">
                  <button>
                    <Icon icon="iconamoon:edit-light" className="text-xl" />
                  </button>
                  <button onClick={() => {}}>
                    <Icon icon="fluent:delete-28-regular" className="text-xl" />
                  </button>
                </div>
              )}
            />
            <Chip
              label="Roles and Permissions"
              ActionButton={() => (
                <div className="flex gap-4">
                  <button>
                    <Icon icon="iconamoon:edit-light" className="text-xl" />
                  </button>
                  <button onClick={() => {}}>
                    <Icon icon="fluent:delete-28-regular" className="text-xl" />
                  </button>
                </div>
              )}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RolesAndPermissions;
