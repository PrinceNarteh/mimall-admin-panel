import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "../sidebar";

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <Header />
      <main className="ml-72 font-ray overflow-y-auto min-h-screen relative pt-20 pb-10 px-5 bg-[#f4f3f5]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
