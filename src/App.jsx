import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthLayout from "./pages/auth/AuthLayout";
import Layout from "./pages/protected/Layout";
import AppLayout from "./AppLayout";
import ProtectedLayout from "./pages/protected/ProtectedLayout";
import Post from "./pages/protected/Post/Post";
import UserList from "./pages/protected/Follow/UserList";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import UserProfile1 from "./pages/protected/Profile/UserProfile";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<ProtectedLayout />}>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Post />} />
              <Route path="/user" element={<UserList />} />
              <Route path="/user/:id" element={<UserProfile1 />} />
            </Route>
          </Route>
          <Route path="/" element={<AuthLayout />}>
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        limit={1}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
