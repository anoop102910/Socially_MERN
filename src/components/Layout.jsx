import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="appear-animation">
      <Navbar className={"mb-2 fixed top-0 left-0 w-full"} />
      <Outlet />
    </div>
  );
}

export default Layout;
