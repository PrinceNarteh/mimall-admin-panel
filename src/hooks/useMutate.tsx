import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "./useUser";

const baseURL = process.env.REACT_APP_BASE_URL;
type Props = {
  url: string;
  data: object;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  multipart?: boolean;
  options?: {
    headers: { [key: string]: string };
    params: { [key: string]: string };
  };
};

const useMutate = (mutationKey = []) => {
  const user = useUser();

  return useMutation({
    mutationKey: [...mutationKey],
    mutationFn: async ({
      url,
      data = {},
      method = "POST",
      multipart = false,
      options = {
        headers: {},
        params: {},
      },
    }: Props) => {
      const res = await axios({
        url: `${baseURL}${url}`,
        method,
        data,
        headers: {
          Authorization: `Bearer ${user?.auth_token}`,
          // roleid: user?.role._id,
          "Content-Type": multipart
            ? "multipart/form-data"
            : "application/json",
        },
        params: options.params,
      });
      return res.data;
    },
  });
};

export default useMutate;
