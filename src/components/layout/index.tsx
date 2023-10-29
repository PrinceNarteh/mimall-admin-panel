import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "../sidebar";

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <div className="ml-72 w-full bg-red-500">
        <Header />
        <div className="pt-20 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
