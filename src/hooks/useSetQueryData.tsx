import { useQueryClient } from "@tanstack/react-query";

type SetOrUpdateQueryDataProps<T extends { _id: string }> = {
  queryKeys: string[];
  dataId: string | undefined;
  data: T;
};

export const useSetQueryData = () => {
  const queryClient = useQueryClient();

  const setOrUpdateQueryData = <T extends { _id: string }>({
    queryKeys,
    data,
    dataId,
  }: SetOrUpdateQueryDataProps<T>) => {
    queryClient.setQueryData<T[]>(queryKeys, (oldData) =>
      dataId
        ? (oldData ?? []).map((item) => (item._id === data._id ? data : item))
        : [data, ...(oldData ?? [])]
    );
  };

  return {
    setOrUpdateQueryData,
  };
};
