import EditAdmin from "@pages/admins/EditAdmin";
import AddDeliveryCompany from "@pages/delivery-companies/AddDeliveryCompany";
import AllDeliveryCompanies from "@pages/delivery-companies/AllDeliveryCompaniess";
import EditDeliveryCompany from "@pages/delivery-companies/EditDeliveryCompany";
import AddProduct from "@pages/products/AddProduct";
import AllProducts from "@pages/products/AllProducts";
import EditProduct from "@pages/products/EditProduct";
import RolesAndPermissions from "@pages/roles-and-permissions/RolesAndPermissions";
import AddShop from "@pages/shops/AddShop";
import AllShops from "@pages/shops/AllShops";
import EditShop from "@pages/shops/EditShop";
import AddUser from "@pages/users/AddUser";
import AllUsers from "@pages/users/AllUsers";
import EditUser from "@pages/users/EditUser";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import AddAdmin from "./pages/admins/AddAdmin";
import AllAdmins from "./pages/admins/AllAdmins";
import { DashBoard } from "./pages/dashboard";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Dashboard */}
          <Route path="/" element={<DashBoard />} />

          {/* Admins */}
          <Route path="/admins">
            <Route index element={<AllAdmins />} />
            <Route path="add-admin" element={<AddAdmin />} />
            <Route path=":adminId/edit" element={<EditAdmin />} />
          </Route>

          {/* Delivery Companies */}
          <Route path="/delivery-companies">
            <Route index element={<AllDeliveryCompanies />} />
            <Route
              path="add-delivery-company"
              element={<AddDeliveryCompany />}
            />
            <Route
              path=":deliveryCompanyId/edit"
              element={<EditDeliveryCompany />}
            />
          </Route>

          {/* Products */}
          <Route path="/products">
            <Route index element={<AllProducts />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path=":productId/edit" element={<EditProduct />} />
          </Route>

          {/* Roles and Permissions */}
          <Route
            path="/roles-and-permissions"
            element={<RolesAndPermissions />}
          />

          {/* Shops */}
          <Route path="/shops">
            <Route index element={<AllShops />} />
            <Route path="add-shop" element={<AddShop />} />
            <Route path=":shopId/edit" element={<EditShop />} />
          </Route>

          {/* Users */}
          <Route path="/users">
            <Route index element={<AllUsers />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path=":userId/edit" element={<EditUser />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
