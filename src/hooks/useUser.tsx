import useUserStore from "store/userStore";

export const useUser = () => useUserStore((state) => state.user);
