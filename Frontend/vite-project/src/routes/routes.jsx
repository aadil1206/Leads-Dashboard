import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Leads from "../pages/Leads/Leads";
import SalesActivity from "../pages/SalesActivity/SalesActivity";
import Settings from "../pages/Settings/Settings";
import Products from "../pages/Products/Products";
import FollowUps from "../pages/Followups/FollowUp";
import Notifications from "../pages/Notifications/Notification";
import Layout from "../pages/layouts/Layout";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" />} />


      {/* Main layout route */}

      <Route element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="leads" element={<Leads />} />
        <Route path="follow-ups" element={<FollowUps />} />
        <Route path="sales-activity" element={<SalesActivity />} />
        <Route path="products" element={<Products />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </>
  )
);
