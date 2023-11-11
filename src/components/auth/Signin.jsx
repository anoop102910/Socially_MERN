import React, { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { useDispatch } from "react-redux";
import { checkAuthentication } from "../../slice/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/api/user/signin", formData);
      const authHeader = response.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        localStorage.setItem("token", token);
      }
      dispatch(checkAuthentication());
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.message === "Network Error") return setError("Network Error");
      setError(error.response.data.error);
      console.log(error.response.data);
    }
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  let style = {
    input:
      "mt-4 rounded-md p-2 max-[640px]:placeholder:text-white  bg-white md:bg-transparent md:border-b md:border-black md:focus:shadow-md  md:rounded-none max-[640px]:bg-opacity-30 w-full outline-none pl-2 text-base dark:bg-dark-300 dark:border-slate-400 focus:shadow-md focus:border-solid focus:border focus:border-white focus:rounded-md focus:border-ridge",
  };

  return (
    <div className="mx-auto text-black relative min-h-screen w-full flex justify-center items-center appear-animation ">
      <div className="md:w-[1000px] md:min-h-[500px] md:mt-10 rounded-lg md:flex md:bg-white md:overflow-hidden">
        <form
          onSubmit={handleFormSubmit}
          className="w-full mx-auto bg-transparent p-8 text-white  md:w-[40%] md:text-black md:auth-form "
        >
          <h2 className="text-2xl font-semibold text-center mb-16 ">Signin to your account</h2>

          <div className="mb-6">
            <label htmlFor="email" className="auth-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              onFocus={() => setError(null)}
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={style.input}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-10">
            <label htmlFor="password" className="auth-label ">
              Password
            </label>
            <input
              type="password"
              id="password"
              onFocus={() => setError(null)}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={style.input}
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <div className="px-4 py-2 border border-red-400 rounded-md text-red-400 text-sm mb-4">
              <i class="fas fa-times border border-red-300 rounded-full px-3 py-[0.6rem] mr-5"></i>
              <>Incorrect Username or Password</>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500  text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline md:bg-black md:hover:bg-black"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
      
          <span className="text-sm block text-center mt-6">
            Don't have an account?
            <Link to={"/signup"} className="text-blue-500 ml-4" href="">
              Sign up
            </Link>
          </span>
        </form>
        <div className="bg-dark-100/75 -z-10 w-full h-screen absolute top-0 left-0 md:hidden"></div>
        <img
          src="/social.png"
          className="w-full md:z-10 h-screen object-cover object-center opacity-7 -z-20 absolute top-0 left-0 md:static md:w-1/2 md:h-full "
          alt=""
        />
      </div>
    </div>
  );
};

export default LoginForm;
