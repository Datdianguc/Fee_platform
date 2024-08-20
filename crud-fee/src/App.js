import React from "react";
import "./App.css";
import {
  createBrowserRouter, createRoutesFromElements, RouterProvider, Route
} from "react-router-dom";
import Login from "./components/login";
import ForgotPassword from "./components/forgot-password";
import Dashboard from "./components/dashboard";
import Detail from "./components/detail";
import DashboardCreate from "./components/dashboard-create";
const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<Login />}></Route>
    <Route path="/forgot-password" element={<ForgotPassword />}></Route>
    <Route path="/dashboard" element={<Dashboard />}></Route>
    <Route path="/dashboard/create-fee" element={<DashboardCreate />} />
    <Route path="dashboard/detail" element={<Detail />} ></Route>
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
