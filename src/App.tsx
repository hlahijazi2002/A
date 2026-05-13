import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LogInPage from "./pages/LoginPage";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" replace />} />

        <Route path="/Login" element={<LogInPage />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/Login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
