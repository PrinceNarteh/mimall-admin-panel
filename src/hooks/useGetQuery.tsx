import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "./useUser";

const baseURL = process.env.REACT_APP_BASE_URL;
type Props = {
  url: string;
  queryKey: string[];
  method?: "GET" | "POST";
  data?: { [key: string]: string };
  options?: {
    headers: { [key: string]: string };
    params: { [key: string]: string };
  };
  enable?: boolean;
};

export const useGetQuery = ({
  queryKey = [],
  method = "GET",
  data,
  url,
  options = {
    headers: {},
    params: {},
  },
  enable = true,
}: Props) => {
  const user = useUser();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await axios(`${baseURL}${url}`, {
        data,
        method,
        headers: {
          Authorization: `Bearer ${user?.auth_token}`,
          // roleid: user?.role._id,
          ...options.headers,
        },
        params: {
          ...options.params,
        },
      });
      return res.data;
    },
    enabled: enable,
  });
};
