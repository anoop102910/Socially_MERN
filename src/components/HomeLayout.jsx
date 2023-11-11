import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import BottomNavbar from "../BottomNavbar";

function HomeLayout() {
  return (
    <>
      <div className="">
        <Sidebar className={"fixed top-[4.3rem] left-2 hidden md:block"} />
        <BottomNavbar/>
        <div className=" md:ml-[350px] mt-[4.9rem] appear-animation">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default HomeLayout;
