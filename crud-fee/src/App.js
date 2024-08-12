import React from "react";
import "./App.css";
import {
  createBrowserRouter, createRoutesFromElements, RouterProvider, Route
} from "react-router-dom";
import Login from "./components/login";
import ForgotPassword from "./components/forgot-password";
import Dashboard from "./components/dashboard";
import Account from "./components/create-account";
const router = createBrowserRouter(createRoutesFromElements(
  <>
  <Route path="/" element={<Login />}></Route>
  <Route path="/forgot-password" element={<ForgotPassword />}></Route>
  <Route path="/dashboard" element={<Dashboard />}>
    <Route path="/dashboard/:name" element={<Account/>}></Route>
  </Route>
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
