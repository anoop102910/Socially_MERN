import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <>
      <div className="w-full mt-20">
        <Sidebar className={"fixed top-16 left-2"} />
        <div className=" ml-[350px] ">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default HomeLayout;
