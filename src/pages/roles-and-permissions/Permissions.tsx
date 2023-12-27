import Chip from "@components/shared/Chip";
import InputField from "@components/shared/InputField";
import Modal from "@components/shared/Modal";
import { Permission } from "@custom-types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import useConfirm from "@hooks/useConfirm";
import useMutate from "@hooks/useMutate";
import { Icon } from "@iconify/react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@utils/queryKeys";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type FormValues = {
  name: string;
};

const Permissions = ({
  permissions,
}: {
  permissions: Permission[] | undefined;
}) => {
  const queryClient = useQueryClient();
  const { ConfirmationDialog, confirm, setIsOpen } = useConfirm();
  const [permission, setPermission] = useState<Permission | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
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
  };

  const { mutate } = useMutate(queryKeys.Permissions.key);
  const submit: SubmitHandler<FormValues> = (data) => {
    const toastId = toast.loading("Creating permission...");
    mutate(
      {
        url: permission
          ? queryKeys.Permission.url(permission._id)
          : queryKeys.Permissions.url,
        data,
        method: permission ? "PATCH" : "POST",
      },
      {
        onSuccess(data) {
          queryClient.setQueryData<Permission[]>(
            queryKeys.Permissions.key,
            (oldData) =>
              permission
                ? (oldData ?? []).map((item) =>
                    item._id === data._id ? data : item
                  )
                : [data, ...(oldData ?? [])]
          );
          toast.dismiss(toastId);
          toast.success(
            `Permission ${permission ? "updated" : "created"} successfully`
          );
          setOpenForm(false);
        },
        onError(error: any) {
          toast.dismiss(toastId);
          toast.error(error.response.data.message);
          setOpenForm(false);
        },
      }
    );
  };

  const handleDelete = async (permission: Permission) => {
    const isConfirmed = await confirm({
      title: "Are you sure?",
      message: `Are you sure you want to delete "${permission.name}"?`,
    });
    if (isConfirmed) {
      const toastId = toast.loading(`Deleting ${permission.name}...`);
      mutate(
        {
          method: "DELETE",
          url: queryKeys.Permission.url(permission._id),
        },
        {
          onSuccess() {
            queryClient.setQueryData<Permission[]>(
              queryKeys.Permissions.key,
              (oldData) =>
                (oldData ?? []).filter((item) => item._id !== permission._id)
            );
            toast.dismiss(toastId);
            toast.success("Permission has been deleted successfully");
          },
          onError(error: any) {
            toast.dismiss(toastId);
            toast.error(error.response.data.message);
          },
          onSettled() {
            setIsOpen(false);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (permission) {
      setValue("name", permission.name);
    }
  }, [permission, setValue]);

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
                <button onClick={() => handleDelete(permission)}>
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

      <ConfirmationDialog />
    </div>
  );
};

export default Permissions;
