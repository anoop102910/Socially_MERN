import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

const style = {
  sideBtn:
    "w-full  py-3 pl-5 hover:bg-slate-100 active:bg-slate-200   rounded-md flex gap-x-3 items-center hover:scale-105 transition-all hover:translate-x-2",
};

const Sidebar = ({ className }) => {
  const { pathname } = useLocation();

  const userId = useSelector(state => state.auth.userId);
  return (
    <>
      <div
        className={`sidebar text-gray-700 appear-animation m-2 rounded-md shadow-md w-64 pt-3 px-1 bg-white h-[87vh] max-[940px]:hidden test:bg-dark-300 test:text-white  ${className}`}
      >
        <ul className="flex flex-col gap-y-3">
          <Link to={"/"} className={style.sideBtn}>
            <Icon style={{ fontSize: "1.5rem", color: "gray" }} icon="fluent:home-16-regular" />
            <span>Home</span>
          </Link>
          <Link to={`/user`} className={style.sideBtn}>
            <Icon
              style={{ fontSize: "1.5rem", color: "gray" }}
              icon="mingcute:user-follow-2-line"
            />
            <span>Follow</span>
          </Link>
          <Link to={"/"} className={style.sideBtn}>
            <Icon style={{ fontSize: "1.3rem", color: "gray" }} icon="tabler:message-circle" />
            <span>Message</span>
          </Link>
          <Link to={`/user/${userId}`} className={style.sideBtn}>
            <Icon style={{ fontSize: "1.6rem", color: "gray" }} icon="iconamoon:profile" />
            <span>Profile</span>
          </Link>
          <Link to={"/"} className={style.sideBtn}>
            <Icon style={{ fontSize: "1.5rem", color: "gray" }} icon="mingcute:bookmark-line" />
            <span>Saved</span>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
