import Layout from "@components/layout";
import AllAdmins from "@pages/admins/AllAdmins";
import Login from "@pages/auth/Login";
import DashBoard from "@pages/dashboard";
import AllDeliveryCompanies from "@pages/delivery-companies/AllDeliveryCompanies";
import AllProducts from "@pages/products/AllProducts";
import RolesAndPermissions from "@pages/roles-and-permissions/Roles";
import AllShops from "@pages/shops/AllShops";
import AllUsers from "@pages/users/AllUsers";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          {/* Dashboard */}
          <Route path="/" element={<DashBoard />} />

          {/* Admins */}
          <Route path="/admins" element={<AllAdmins />} />

          {/* Delivery Companies */}
          <Route
            path="/delivery-companies"
            element={<AllDeliveryCompanies />}
          />

          {/* Products */}
          <Route path="/products" element={<AllProducts />} />

          {/* Roles and Permissions */}
          <Route
            path="/roles-and-permissions"
            element={<RolesAndPermissions />}
          />

          {/* Shops */}
          <Route path="/shops" element={<AllShops />} />

          {/* Users */}
          <Route path="/users" element={<AllUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
