import Sidebar from "@components/sidebar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <div>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
