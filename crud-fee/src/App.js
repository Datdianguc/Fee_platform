import React from "react";
import "./App.css";
import {
  createBrowserRouter, createRoutesFromElements, RouterProvider, Route
} from "react-router-dom";
import Login from "./components/login";
import ForgotPassword from "./components/forgot-password";
import Dashboard from "./components/dashboard";
import DashboardCreate from "./components/dashboard-create";
import DashboardDetail from "./components/dashboard-detail";
const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/dashboard/create-fee" element={<DashboardCreate />} />
    <Route path="dashboard/detail" element={<DashboardDetail />} />
  </>
))

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
