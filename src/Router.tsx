import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { DashBoard } from "./pages/dashboard";
import AllAdmins from "./pages/admins/AllAdmins";
import AddAdmin from "./pages/admins/AddAdmin";
import EditAdmin from "@pages/admins/EditAdmin";
import AllDeliveryCompanies from "@pages/delivery-companies/AllDeliveryCompaniess";
import AddDeliveryCompany from "@pages/delivery-companies/AddDeliveryCompany";
import EditDeliveryCompany from "@pages/delivery-companies/EditDeliveryCompany";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/admins">
            <Route index element={<AllAdmins />} />
            <Route path="add-admin" element={<AddAdmin />} />
            <Route path=":adminId/edit" element={<EditAdmin />} />
          </Route>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
