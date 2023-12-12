import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAuthentication } from "../../slice/authSlice";
import { api } from "../../slice/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/api/user/signup", formData);
      console.log(response.data);
      const authHeader = response.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        localStorage.setItem("token", token);
      }
      dispatch(checkAuthentication());
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.message == "Network Error" || error.response.status == 500) {
        toast.error("Something went wrong");
        return;
      }
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
      "mt-4 md:mt-1 md:text-sm rounded-md p-2 max-[640px]:placeholder:text-white  bg-white md:bg-transparent md:border-b md:border-black md:focus:shadow-md  md:rounded-none max-[640px]:bg-opacity-30 w-full outline-none pl-2 text-base test:bg-dark-300 test:border-slate-400 focus:shadow-md focus:border-solid focus:border focus:border-white focus:rounded-md focus:border-ridge",
  };

  return (
    <div className="mx-auto text-black relative min-h-screen w-full flex justify-center items-center ">
      <div className="md:w-[1000px] md:h-[550px] md:mt-16 rounded-lg md:flex md:bg-white md:overflow-hidden">
        <img
          src="/social.webp"
          className="w-full md:z-10 h-screen object-cover object-center opacity-7 -z-20 absolute top-0 left-0 md:static md:w-1/2 md:h-full "
          alt=""
        />
        <form
          onSubmit={handleFormSubmit}
          className="w-full mx-auto bg-transparent p-8 text-white  md:w-[45%] md:text-black md:auth-form "
        >
          <h2 className="text-2xl font-semibold text-center mb-8 ">Create new Account</h2>

          <div className="flex gap-x-4">
            <div className="mb-4">
              <label htmlFor="firstName" className="auth-label">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onFocus={() => setError(null)}
                className={style.input}
                placeholder="First name"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="auth-label">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onFocus={() => setError(null)}
                className={style.input}
                placeholder="Last name"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="auth-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setError(null)}
              className={style.input}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="auth-label ">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setError(null)}
              className={style.input}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-10">
            <label htmlFor="confirmPassword" className="auth-label ">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onFocus={() => setError(null)}
              className={style.input}
              placeholder="Confirm your password"
              required
            />
          </div>
          {error && (
            <div className=" -mt-4 text-red-600 text-sm mb-4">
              <i class="fas fa-times text-xs border border-red-300 rounded-full px-2 py-[.3rem] mr-3"></i>
              <>{error}</>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500  text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline md:bg-black md:hover:bg-black"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <span className="text-sm block text-center mt-6">
            Already have an account?
            <Link to={"/signin"} className="text-blue-500 ml-4" href="">
              Sign in
            </Link>
          </span>
        </form>
        <div className="bg-dark-100/75 -z-10 w-full h-screen absolute top-0 left-0 md:hidden"></div>
      </div>
    </div>
  );
};

export default Signup;
