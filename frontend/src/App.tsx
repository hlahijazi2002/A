import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LogInPage from "./pages/LoginPage";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import CompanyManagement from "./pages/CompanyManagement";
import EmissionsAnalytics from "./pages/EmissionsAnalytics";
import UserManagement from "./pages/UserManagement";
import SubscriptionManagement from "./pages/SubscriptionManagement ";
import PartnerManagement from "./pages/PartnerManagement";
import AuditLogs from "./pages/AuditLogs";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import AddCompany from "./pages/AddCompany";
import CompanyProfile from "./pages/CompanyProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogInPage />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/companies" element={<CompanyManagement />} />
          <Route path="/addCompany" element={<AddCompany />} />
          <Route path="/companyProfile" element={<CompanyProfile />} />
          <Route path="/analytics" element={<EmissionsAnalytics />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/subscription" element={<SubscriptionManagement />} />
          <Route path="/partners" element={<PartnerManagement />} />
          <Route path="/logs" element={<AuditLogs />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
