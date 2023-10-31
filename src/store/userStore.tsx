import { User } from "@custom-types/index";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
};

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user: User) => set(() => ({ user })),
      }),
      {
        name: "user",
      }
    )
  )
);

export default useUserStore;
