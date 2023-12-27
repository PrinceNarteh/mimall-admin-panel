import Heading from "@components/shared/Heading";
import Modal from "@components/shared/Modal";
import { Permission, Role } from "@custom-types/index";
import { useGetQuery } from "@hooks/useGetQuery";
import { Icon } from "@iconify/react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@utils/queryKeys";
import { useState } from "react";
import toast from "react-hot-toast";
import Permissions from "./Permissions";
import useConfirm from "@hooks/useConfirm";
import useMutate from "@hooks/useMutate";
import Spinner from "@components/shared/Spinner";
import RoleForm from "@components/forms/RoleForm";

const RolesAndPermissions = () => {
  const queryClient = useQueryClient();
  const [role, setRole] = useState<Role | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { ConfirmationDialog, confirm, setIsOpen } = useConfirm();
  const [openPermissions, setOpenPermissions] = useState(false);
  const { data: roles, isLoading } = useGetQuery<Role[]>({
    queryKey: queryKeys.Roles.key,
    url: queryKeys.Roles.url,
  });
  const { data: permissions } = useGetQuery<Permission[]>({
    queryKey: queryKeys.Permissions.key,
    url: queryKeys.Permissions.url,
  });

  const handleEdit = (role: Role) => {
    setRole(role);
    setOpenModal(true);
  };

  const { mutate } = useMutate(queryKeys.Roles.key);
  const handleDelete = async (role: Role) => {
    const isConfirm = await confirm({
      title: `Are you sure?`,
      message: `Are you sure you want to delete "${role.name}"?`,
    });

    if (isConfirm) {
      const toastId = toast.loading("Deleting role...");

      mutate(
        {
          url: `/roles/${role._id}`,
          method: "DELETE",
        },
        {
          onSuccess(data) {
            queryClient.setQueryData<Role[]>(queryKeys.Roles.key, (oldData) =>
              (oldData ?? []).filter((item) => item._id !== data._id)
            );
            toast.dismiss(toastId);
            toast.success("Role delete successfully!");
            setIsOpen(false);
          },
          onError(error: any) {
            toast.dismiss(toastId);
            toast.error(error.response.data.message);
          },
        }
      );
    }
  };

  return (
    <div>
      <div className="ml-10 flex justify-between items-center mt-5">
        <Heading label="Role & Permissions" />
        <div className="mr-12 space-x-5">
          <button
            onClick={() => setOpenModal(true)}
            className="py-2 px-7 bg-primary text-white text-xs rounded"
          >
            Add Role
          </button>
          <button
            onClick={() => setOpenPermissions(true)}
            className="py-2 px-7 bg-primary text-white text-xs rounded"
          >
            Add Permission
          </button>
        </div>
      </div>
      <div className="pl-12 pr-12">
        <div className="bg-white mt-7 rounded-lg p-5">
          <div className="h-20 text-blue-900  p-2 flex justify-end items-center">
            <div className="h-9 w-72 bg-[#F4F6FB] flex ml-2 rounded-lg border border-gray-400">
              <Icon icon="circum:search" className="mt-[0.5rem] h-5 w-5 ml-3" />

              <input
                type="text"
                name="name"
                placeholder="Search "
                className="bg-[#F4F6FB] w-40 outline-none p-2 placeholder:text-gray-700 text-sm placeholder:font-normal placeholder:mb-3"
              />
            </div>
          </div>

          <div className="flex pl-3 pr-3 border-b-2 pb-2  text-slate-400 text-[14px] font-bold leading-tight">
            <div className="w-10">No.</div>
            <div className="w-40">Role</div>
            <div className="flex-[5]">Permissions</div>
            <div className="w-32">Actions</div>
          </div>

          {isLoading ? (
            <Spinner isLoading={isLoading} /> // Display the spinner
          ) : (
            <>
              {roles?.length === 0 ? (
                <div className="h-14 bg-neutral-300 border bg-opacity-10 w-full mt-4 mb-4 rounded-md border-l-8 border-l-primary flex items-center">
                  <Icon
                    icon="solar:danger-circle-broken"
                    className="ml-5 mr-1 text-primary h-5 w-5"
                  />
                  <div className=" text-neutral-500 font-semibold">
                    You don't have any roles. Why not
                    <button
                      onClick={() => setOpenModal(true)}
                      className="ml-1 text-primary"
                    >
                      Add a role?
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {roles?.map((role, index) => (
                    <div
                      key={index}
                      className="flex items-center pl-2 pr-2 pb-4 text-slate-400 text-[14px] font-bold leading-tight mt-3 border-b border-slate-100"
                    >
                      <div className="w-10">{index + 1}</div>
                      <div className="w-40 text-blue-900 text-[15px] font-bold leading-snug ">
                        {role?.name}
                      </div>
                      <div className="flex-[5] flex flex-wrap text-blue-900 text-[15px] font-bold leading-snug">
                        {role?.permissions.join(", ")}
                      </div>
                      <div className="flex cursor-pointer w-32 gap-5">
                        <Icon
                          onClick={() => handleEdit(role)}
                          icon="iconamoon:edit-light"
                          className="text-2xl text-primary"
                        />
                        <button onClick={() => handleDelete(role)}>
                          <Icon
                            icon="fluent:delete-28-regular"
                            className="text-xl text-red-500"
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>

      <Modal
        start
        openModal={openModal}
        disableOutsideClick
        closeModal={setOpenModal}
      >
        <RoleForm
          role={role}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </Modal>

      <Modal
        openModal={openPermissions}
        closeModal={setOpenPermissions}
        width="max-w-3xl"
      >
        <Permissions permissions={permissions} />
      </Modal>

      <ConfirmationDialog />
    </div>
  );
};

export default RolesAndPermissions;
