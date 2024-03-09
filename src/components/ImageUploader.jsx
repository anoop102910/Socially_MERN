import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../slice/api";
import { checkAuthentication } from "../slice/authSlice";
import Profile from "./Profile";

export default function ImageUploader({ className, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const username = useSelector(state => state.auth.username);
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearForm = () => {
    imageRef.current.value = null;
    setSelectedImage(null);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    if (selectedImage) {
      try {
        console.log(selectedImage);
        const response = await api.post(
          "api/user/profile",
          { image: selectedImage },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(response.data);
        clearForm();
        setLoading(false);
        toast.success("Image uploaded successfully");
        navigate("/")
      } catch (error) {
        setLoading(false);
        console.log(error.message);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div
      className={`animate-scale  bg-white p-4 rounded-md shadow-md absolute top-[calc(100%-500px)] left-[calc(50%-300px)] w-[600px] z-10 h-auto ${className}`}
    >
      <div className="flex justify-between">
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            <Profile w={"3rem"} />
            <div className="flex flex-col ml-3 justify-between gap-y-1">
              <span className="text-sm text-gray-600">{username}</span>
            </div>
          </div>
          <i
            onClick={onClose}
            className="fas fa-times block text-3xl cursor-pointer font-bold text-red-500"
          ></i>
        </div>
      </div>
      <div>
        <form className="max-h-[300px] overflow-y-auto " onSubmit={e => handleSubmit(e)}>
          {selectedImage ? (
            <div className="relative ">
              <img
                onClick={() => {
                  setSelectedImage(null);
                  imageRef.current.value = null;
                }}
                className="cursor-pointer absolute top-1 right-1 "
                width="36"
                height="36"
                src="https://img.icons8.com/parakeet/48/multiply.png"
                alt="multiply"
              />
              <img className="rounded-lg mt-4 -z-20" src={URL.createObjectURL(selectedImage)} />
            </div>
          ) : (
            <div className="w-full h-[200px] border-2 border-dotted border-gray-400 rounded-md mt-5 flex justify-center items-center text-gray-400 ">
              Upload Your Profile
            </div>
          )}
          <div className="flex justify-between items-center mt-4">
            <div>
              <label className="cursor-pointer" htmlFor="image">
                <img
                  width="40"
                  height="40"
                  src="https://img.icons8.com/color/48/add-image.png"
                  alt="add-image"
                />
              </label>
              <input
                ref={imageRef}
                onChange={e => setSelectedImage(e.target.files[0])}
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="hidden "
              />
            </div>
            <input
              accept="image/*"
              className="py-2 px-4 bg-blue-500 rounded-md text-white hover:bg-blue-600 transition mt-4 disabled:bg-slate-500"
              type="submit"
              value={loading ? "Posting..." : "Post"}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
