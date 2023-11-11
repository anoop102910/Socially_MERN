import React from "react";
import { Link } from "react-router-dom";

const style = {
  sideBtn:"w-full py-3 pl-5 hover:bg-gray-100 test:hover:bg-dark-400  rounded-md flex gap-x-3 items-center"
}

const Sidebar = ({ className }) => {
  return (
    <>
      <div className={`sidebar text-gray-700  appear-animation m-2 rounded-md shadow-md w-64 pt-3 px-1 bg-white h-[87vh] max-[940px]:hidden test:bg-dark-300 test:text-white  ${className}`}>
        <ul className="flex flex-col gap-y-3">
          <Link to={'/'} className={style.sideBtn}>
            <i className="fas fa-home" />
            <span>Home</span>
          </Link>
          <Link to={'/user'} className={style.sideBtn}>
            <i className="fas fa-user-friends"></i>
            <span>Follow</span>
          </Link>
          <Link to={'/'} className={style.sideBtn}>
            <i className="fas fa-envelope" />
            <span>Message</span>
          </Link>
          <Link to={'/profile'} className={style.sideBtn}>
            <i className="fas fa-user" />
            <span>Profile</span>
          </Link>
          <Link to={'/'} className={style.sideBtn}>
            <i className="far fa-save" />
            <span>Saved</span>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
