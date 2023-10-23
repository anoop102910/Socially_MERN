import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  console.log(isAuthenticated)

  return (
    <>
     { isAuthenticated ? <Outlet /> : <Navigate to={"/signin"} />}
    </>
  );
}

export default ProtectedRoute;
