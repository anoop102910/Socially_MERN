import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ className }) => {
  return (
    <>
      <div className={`sidebar m-2 rounded-md shadow-md w-64 pt-4 px-4 bg-white h-[87vh] max-[940px]:hidden ${className}`}>
        <ul className="flex flex-col gap-y-3">
          <Link to={'/'} className="w-full py-2 pl-3 hover:bg-gray-100 text-gray-600 rounded-md flex gap-x-3 items-center">
            <i className="fas fa-home" />
            <span>Home</span>
          </Link>
          <Link to={'/user'} className="w-full py-2 pl-3 hover:bg-gray-100 text-gray-600 rounded-md flex gap-x-3 items-center">
            <i class="fas fa-user-friends"></i>
            <span>Follow</span>
          </Link>
          <Link to={'/'} className="w-full py-2 pl-3 hover:bg-gray-100 text-gray-600 rounded-md flex gap-x-3 items-center">
            <i className="fas fa-envelope" />
            <span>Message</span>
          </Link>
          <Link to={'/'} className="w-full py-2 pl-3 hover:bg-gray-100 text-gray-600 rounded-md flex gap-x-3 items-center">
            <i className="fas fa-user" />
            <span>Profile</span>
          </Link>
          <Link to={'/'} className="w-full py-2 pl-3 hover:bg-gray-100 text-gray-600 rounded-md flex gap-x-3 items-center">
            <i className="far fa-save" />
            <span>Saved</span>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
