import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "../sidebar";

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
