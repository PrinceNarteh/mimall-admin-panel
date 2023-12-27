import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "../sidebar";
import Protected from "@pages/auth/Protected";

const Layout = () => {
  return (
    <Protected>
      <Sidebar />
      <Header />
      <main className="ml-20 md:ml-72 font-ray overflow-y-auto min-h-screen relative pt-20 pb-10 px-5 bg-[#f4f3f5] duration-500">
        <Outlet />
      </main>
    </Protected>
  );
};

export default Layout;
