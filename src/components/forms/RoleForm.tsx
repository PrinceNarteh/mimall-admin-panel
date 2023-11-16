import { Permission, Role } from "@custom-types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@utils/queryKeys";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import InputField from "../../components/shared/InputField";
import { useGetQuery } from "../../hooks/useGetQuery";
import useMutate from "../../hooks/useMutate";
import Spinner from "@components/shared/Spinner";
import Chip from "@components/shared/Chip";

const schema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Role name is required"),
  permissions: z.array(
    z.object({
      _id: z.string().optional(),
      name: z.string().min(1, "Role name is required"),
    })
  ),
});

type FormValues = z.infer<typeof schema>;

type RoleFormProps = {
  role: Role;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState: {
  name: string;
  permissions: Permission[];
} = {
  name: "",
  permissions: [],
};

export default function RoleForm({ role, setOpenModal }: RoleFormProps) {
  const queryClient = useQueryClient();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialState,
    resolver: zodResolver(schema),
  });
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const { data, isLoading } = useGetQuery<Permission[]>({
    queryKey: queryKeys.Permissions.key,
    url: "/permissions",
  });

  const handleChange = (incomingPermission: Permission) => {
    if (permissions.includes(incomingPermission)) {
      setPermissions(
        permissions.filter((permission) => permission !== incomingPermission)
      );
    } else {
      setPermissions([...permissions, incomingPermission]);
    }
  };

  const removePermission = (permissionName: string) =>
    setPermissions(
      permissions.filter((permission) => permission.name !== permissionName)
    );

  const { mutate } = useMutate(queryKeys.Roles.key);
  const submitHandler: SubmitHandler<FormValues> = async (data) => {
    const toastId = toast.loading(`${role ? "Creating" : "Updating"} role...`);

    mutate(
      {
        url: `/role/${role ? "update" : "create"}`,
        data,
        method: role ? "PATCH" : "POST",
      },
      {
        onSuccess: async (data) => {
          await queryClient.setQueryData<Role[]>(
            [queryKeys.Roles],
            (oldData) => {
              if (role) {
                return (oldData ?? []).map((item) => {
                  if (item._id === data.role_id) {
                    return data;
                  }
                  return item;
                });
              } else {
                return [data, ...(oldData ?? [])];
              }
            }
          );
          toast.dismiss(toastId);
          toast.success(`Role ${role ? "updated" : "created"} successfully`);
          setOpenModal(false);
        },
        onError: (error) => {
          toast.dismiss(toastId);
          toast.error("Error creating role");
        },
      }
    );
  };

  useEffect(() => {
    if (role) {
      setPermissions(role.permissions);
    }
  }, [role]);

  useEffect(() => {
    setValue("permissions", permissions);
  }, [permissions, setValue]);

  return (
    <div className="cursor-pointer p-5">
      <Spinner isLoading={isLoading} />

      <div className="text-blue-900 text-3xl font-bold mb-2">
        <h3>Add Role & Permission</h3>
      </div>

      <div className=" text-slate-400 text-[15px] font-normal mt-2 mb-6">
        Add permissions to create role below.
      </div>

      <div className=" bg-white rounded-lg pt-10">
        <div className="min-h-fit space-y-10 flex flex-col justify-center items-center p-">
          <form onSubmit={handleSubmit(submitHandler)} className="w-full">
            <div className="space-y-5">
              <div className="mb-5">
                <label className=" text-blue-900 text-md font-semibold leading-loose">
                  Role Name
                </label>
                <InputField
                  name="name"
                  register={register}
                  // errors={errors}
                  required
                />
              </div>
              <div className="flex gap-3 flex-wrap">
                {permissions.map((permission, index) => (
                  <Chip
                    key={index}
                    label={permission.name}
                    onClick={() => removePermission(permission.name)}
                  />
                ))}
              </div>
              <div>
                <label className="text-blue-900 text-md font-semibold leading-loose ">
                  System Module Permission:
                </label>
                {isLoading ? (
                  <div className="text-center text-xl flex">
                    <span>Loading</span>
                    <Icon
                      icon="eos-icons:three-dots-loading"
                      className="text-3xl"
                    />
                  </div>
                ) : (
                  <div className="grid grid-auto-fit-xs gap-5 mt-2">
                    {data?.map((module, index) => (
                      <label
                        key={index}
                        className="space-x-2 basis-48 flex-1 block text-md font-normal text-slate-400 cursor-pointer "
                      >
                        <input
                          type="checkbox"
                          id="permissions"
                          name="permissions"
                          className="accent-orange-700 "
                          onChange={() => handleChange(module)}
                          checked={permissions.includes(module)}
                        />
                        <span>{module.name}</span>
                      </label>
                    ))}
                  </div>
                )}
                {errors["permissions"] && (
                  <span className="text-red-500 text-[12px]">
                    {errors["permissions"].message}
                  </span>
                )}
              </div>
              <div className="flex justify-end">
                <button className="px-6 py-2 w-48 bg-gradient-to-r from-primary to-secondary rounded-lg shadow justify-center items-center gap-2.5 flex mt-6 text-white text-md font-bold leading-loose ">
                  Add role
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}