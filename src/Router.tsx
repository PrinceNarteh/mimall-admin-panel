import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { DashBoard } from "./pages/dashboard";
import AllAdmins from "./pages/admins/AllAdmins";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/admins" element={<AllAdmins />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
