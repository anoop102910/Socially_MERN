import { logout } from "../slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile";
import { Link } from "react-router-dom";

function Navbar({ className }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const username = useSelector(state => state.auth.username);

  const handleLogout = () => {
    dispatch(logout())
  };

  return (
    <nav className={`bg-blue-500 test:bg-blue-700 p-2 z-30 ${className}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"}>
          <h1 className="text-2xl text-white font-bold py-1 font-[Pacifico]">Socially</h1>
        </Link>
        {isAuthenticated ? (
          <div className="flex items-center gap-x-8">
            <div className="flex items-center gap-x-3">
              <Profile w={"2.8rem"} />
              <span className="text-white">{username}</span>
            </div>
            <button onClick={handleLogout} className="bg-white text-blue-500 hover:bg-blue-100 hover:text-blue-600 px-4 py-2 rounded text-sm">
              Logout
            </button>
          </div>
        ) : (
          <Link to={"/signin"}>
            <button className="bubble bg-white text-blue-500 px-4 py-2 rounded text-sm">Sign In</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
