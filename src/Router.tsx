import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import { DashBoard } from "@pages/dashboard";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
