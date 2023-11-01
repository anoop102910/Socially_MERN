import React, { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { useDispatch } from "react-redux";
import { checkAuthentication } from "../../slice/authSlice";
import { useNavigate } from "react-router-dom";
import authImage from "../../assets/authImage.png";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  return (
    <div className="w-full h-[100vh] flex items-center justify-center mt-6">
      <div className="signin-fomr flex rounded-3xl shadow-md h-[540px] w-[900px] overflow-hidden">
        <div className="form-container w-[50%] bg-white flex items-center pt-16  flex-col">
          <h1 className="text-xl mb-12 font-bold">Create an account</h1>
          <form className="auth-form" onSubmit={handleFormSubmit}>
            <div>
              <label className="block" htmlFor="email">
                Email
              </label>
              <input className="mb-10" onFocus={() => setError(null)} type="text" name="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div>
              <label className="block" htmlFor="password">
                Password
              </label>
              <input
                className="mb-12"
                onFocus={() => setError(null)}
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            {error && (
              <div className="px-4 py-2 border border-red-400 rounded-md text-red-400 text-sm mb-4">
                <i class="fas fa-times border border-red-300 rounded-full px-3 py-[0.6rem] mr-5"></i>
                <>Incorrect Username or Password</>
              </div>
            )}
            <input value={loading ? "Signing in..." : "Sign in"} className="w-full rounded py-2 outline-none border-none text-white bg-black mb-10  cursor-pointer" type="submit" />
          </form>

          <span className="text-sm">
            Don't have an account?
            <Link to={"/signup"} className="text-blue-500 ml-4" href="">
              Sign up
            </Link>
          </span>
        </div>
        <img className="w-[50%] object-cover object-center" src={authImage} alt="" />
      </div>
    </div>
  );
}

export default Signin;
