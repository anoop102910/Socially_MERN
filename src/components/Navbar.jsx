import { logout } from "../slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { useState } from "react";
import Avatar from "./Avatar";
import useUserData from "../hooks/useUserData";
import {Icon} from "@iconify/react"

function Navbar({ className }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const username = useSelector(state => state.auth.username);

  const [query, setQuery] = useState("");
  const [users, isLoading, setLoading] = useUserData(query);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={`bg-blue-500 test:bg-blue-700 p-2 z-30 ${className}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"}>
          <h1 className="text-2xl text-white font-bold py-1 font-[Pacifico]">Socially</h1>
        </Link>

        <div className="relative">
          {isAuthenticated && (
            <form class="min-w-[36rem] ml-16 mx-auto max-sm:hidden">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                 <Icon className="text-slate-600 font-bold " icon="il:search" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full p-3 ps-12 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500  focus-within:outline-none"
                  placeholder="Search for Friends, Group or pages"
                  required
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </div>
            </form>
          )}

          {query.length != 0 && users && users.length != 0 ? (
            <div className="absolute animate-scale opacity-100  p-1 w-80 top-12 rounded-md bg-slate-100 border-2 border-blue-300 ">
              {users.map(user => {
                return (
                  <>
                    <Link onClick={() => setQuery("")} to={`/user/${user._id}`}>
                      <div className="flex items-center justify-between hover:bg-white hover:scale-105 hover:translate-x-1 rounded-md px-4 py-2 transition-all duration-200 cursor-pointer ">
                        <div className="flex items-center">
                          <Avatar
                            w={"3rem"}
                            src={user.profileImage}
                            name={user.firstName + " " + user.lastName}
                          />
                          <span className="text-gray-600 text-sm test:text-slate-200 ml-6">
                            {user.firstName + " " + user.lastName}
                          </span>
                        </div>
                      </div>
                      <hr />
                    </Link>
                  </>
                );
              })}
            </div>
          ) : null}
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-x-8">
            <div className="flex items-center gap-x-3">
              <Profile w={"2.8rem"} />
              <span className="text-white">{username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-500 hover:bg-blue-100 hover:text-blue-600 px-4 py-2 rounded text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to={"/signin"}>
            <button className="bubble bg-white text-blue-500 px-4 py-2 rounded text-sm">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
