import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { DashBoard } from "./pages/dashboard";
import AllAdmins from "./pages/admins/AllAdmins";
import AddAdmin from "./pages/admins/AddAdmin";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/admins">
            <Route index element={<AllAdmins />} />
            <Route path="add-admin" element={<AddAdmin />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
