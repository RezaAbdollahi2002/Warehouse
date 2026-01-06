// ProtectedLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import MainNavbar from "./components/Dashboard/MainNavbar";

export default function ProtectedLayout() {
  return (
    <>
      <MainNavbar />
      <Outlet />
    </>
  );
}
