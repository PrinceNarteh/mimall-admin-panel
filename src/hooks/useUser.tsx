import useUserStore from "@src/store/userStore";

export const useUser = () => useUserStore((state) => state.user);
