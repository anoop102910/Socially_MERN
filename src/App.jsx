import { Navigate, Route, Routes, UNSAFE_DataRouterStateContext } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeLayout from "./components/HomeLayout";
import UserList from "./components/Follow/UserList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling.
import UserProfile from "./components/Profile/UserProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<HomeLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<UserList />} />
              <Route path="/profile" element={<UserProfile />} />
            </Route>
          </Route>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-center" autoClose={1000} limit={1} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover theme="light" />
    </>
  );
}

export default App;
