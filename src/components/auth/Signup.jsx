import React, { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { useDispatch } from "react-redux";
import { checkAuthentication } from "../../slice/authSlice";
import authImage from "../../assets/authImage.png"

import { useNavigate } from "react-router-dom";
function Signup() {
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
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/api/user/signup", formData);
      console.log(response.data);
      dispatch(checkAuthentication());
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center px-56 mt-8">
      <div className="flex flex-1 rounded-3xl shadow-md  overflow-hidden h-[550px]">
        <img className="w-[50%] object-cover object-center" src={authImage} alt="" />
        <div className="form-container w-[50%] bg-white flex items-center pt-8 flex-col">
          <h1 className="text-xl mb-12">Create an Account</h1>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="flex gap-x-3 mb-6">
              <div>
                <label className="block" htmlFor="firstName">
                  First Name
                </label>
                <input className="" type="text" name="firstName" id="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} />
              </div>
              <div>
                <label className="block" htmlFor="lastName">
                  Last Name
                </label>
                <input className="" type="text" name="lastName" id="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} />
              </div>
            </div>
            <div className="mb-6">
              <label className="block" htmlFor="email">
                Email
              </label>
              <input className="" type="text" name="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-6">
              <label className="block" htmlFor="password">
                Password
              </label>
              <input type="password" name="password" id="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="mb-8">
              <label className="block" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            </div>
            <input value={loading ? "Signing up..." : "Sign up"} className="w-full rounded py-2 outline-none border-none text-white bg-black mb-4" type="submit" />
          </form>
          <span className="text-sm">
            Already have an account?
            <Link to={"/signin"} className="text-blue-500 ml-4" href="">
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
