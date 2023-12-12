import React, { useEffect, useRef, useState } from "react";
import { toast, useToast } from "react-toastify";
import PostCard from "../../../components/PostCard";
import { api } from "../../../api";
import { useSelector } from "react-redux";
import Profile from "../../../components/Profile";
import useToggle from "../../../hooks/useToggle";

function UserProfile() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = useSelector(state => state.auth.userId);
  const [hidden, toggle] = useToggle();
  const [upload, toggleUpload] = useToggle(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await api.get("/api/post/");
        console.log(response.data);
        const posts = response.data.filter(response => response.createdBy._id === userId);
        setPosts(posts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Something went wrong");
      }
    }
    fetchPosts();
  }, []);

  if (loading) return;

  return (
    <>
      <div>
        {upload && <ImageUploader onClose={toggleUpload} />}
        <div id="user-profile" className="mr-10 relative appear-animation">
          <img
            className="w-full h-[300px] rounded-md object-center object-cover "
            src={"background.png"}
            alt=""
          />
          <div className="absolute top-56 left-3 ">
            <i
              onClick={toggle}
              className="fas fa-cloud-upload-alt text-white text-2xl cursor-pointer absolute bottom-1 right-4"
            ></i>
            <div
              className={`dropdown px-3 py-2 bg-white space-y-4 rounded-md tex-sm text-center absolute -bottom-3 -right-28  ${
                !hidden && "hidden"
              }`}
            >
              <div onClick={toggleUpload} className="flex w-max">
                <i className="fas fa-upload text-gray-600 mr-3"></i>
                <button className="text-sm text-gray-600">Upload Image</button>
              </div>
            </div>
            <Profile w={"8rem"} className={"p-1 bg-blue-600 "} />
          </div>
        </div>
      </div>
    </>
  );
}

function UserPostContainer() {
  return (
    <div id="user-post">
      <ul>
        {posts?.map(post => (
          <PostCard className={"w-[550px] mt-20"} key={post._id} post={post} />
        ))}
      </ul>
    </div>
  );
}
function ImageUploader({ className, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading,setLoading] = useState(false);
  const username = useSelector(state => state.auth.username);
  const imageRef = useRef(null);

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
        setLoading(false);
      } catch (error) {
        setLoading(false)
        console.log(error.response);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div
      className={`appear-animation bg-white p-4 rounded-md shadow-md absolute top-[calc(100%-500px)] left-[calc(50%-300px)] w-[600px] z-10 h-auto ${className}`}
    >
      <div className="flex justify-between">
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            <img
              className="w-12 object-contain object-center rounded-full shadow-md"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4HbqZyTk4fRBYWt-7H6ubyM0ex6A8WyVunKD2mqOAmA&s"
              alt=""
            />
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
                className="hidden "
              />
            </div>
            <input
              accept="image/*"
              className="py-2 px-4 bg-blue-500 rounded-md text-white hover:bg-blue-600 transition mt-4 disabled:bg-gray-400"
              type="submit"
              value="Post"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
