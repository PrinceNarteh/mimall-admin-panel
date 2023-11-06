import Chip from "@components/shared/Chip";
import InputField from "@components/shared/InputField";
import Modal from "@components/shared/Modal";
import { Permission } from "@custom-types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import useMutate from "@hooks/useMutate";
import { Icon } from "@iconify/react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@utils/queryKeys";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const Permissions = ({
  permissions,
}: {
  permissions: Permission[] | undefined;
}) => {
  const queryClient = useQueryClient();
  const [permission, setPermission] = useState<Permission | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: permission ? permission.name : "",
    },
    resolver: zodResolver(
      z.object({
        name: z.string({ required_error: "Permission name is required" }),
      })
    ),
  });

  const handleEdit = (permission: Permission) => {
    setPermission(permission);
    setOpenForm(true);
    console.log({ permission, openForm });
  };

  const { mutate } = useMutate(queryKeys.Permissions.key);
  const submit = (data) => {
    const toastId = toast.loading("Creating permission...");
    mutate(
      {
        url: queryKeys.Permissions.url,
        data,
      },
      {
        onSuccess() {},
      }
    );
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-10 border-b pb-2 border-b-primary">
        <h3 className="text-primary font-semibold text-4xl ">Permissions</h3>
        <button
          onClick={() => setOpenForm(true)}
          className="px-3 py-1.5 flex items-center gap-1 rounded-md text-primary hover:text-white hover:bg-primary duration-300 border border-primary text-xs"
        >
          <Icon icon="ic:outline-add" />
          Add Permission
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        {permissions?.map((permission, index) => (
          <Chip
            key={index}
            label={permission.name}
            ActionButton={() => (
              <div className="flex gap-4">
                <button onClick={() => handleEdit(permission)}>
                  <Icon icon="iconamoon:edit-light" className="text-xl" />
                </button>
                <button onClick={() => {}}>
                  <Icon icon="fluent:delete-28-regular" className="text-xl" />
                </button>
              </div>
            )}
          />
        ))}
      </div>

      <Modal openModal={openForm} closeModal={() => setOpenForm(false)}>
        <div className="flex justify-between items-center mb-5 border-b pb-2 border-b-primary">
          <h3 className="text-primary font-semibold text-4xl ">
            Add Permission
          </h3>
        </div>

        <form onSubmit={handleSubmit(submit)}>
          <InputField
            errors={errors}
            name="name"
            register={register}
            label="Permission Name"
            required
          />
          <div className="flex justify-end mt-2">
            <button className="bg-primary px-5 py-2 text-white">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Permissions;