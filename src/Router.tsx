import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashBoard } from "./pages/dashboard";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}
