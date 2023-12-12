import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../slice/postSlice";
import Profile from "./Profile";

function PostForm({ className }) {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const username = useSelector(state => state.auth.username);
  const imageRef = useRef(null);
  const dispatch = useDispatch();

  const clearForm = () => {
    setText("");
    imageRef.current.value = null;
    setSelectedImage(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (text.length !== 0 || selectedImage) dispatch(createPost({ text, image: selectedImage }));
    clearForm();
  };

  return (
    <div className={`bg-white test:text-slate-200 text-gray-700 test:bg-dark-200 p-4 rounded-md shadow-md  ${className}`}>
      <div className="flex justify-between">
        <div className="flex items-center">
          <Profile w={'2rem'}/>
          <div className="flex flex-col ml-3 justify-between gap-y-1">
            <span className="text-sm ">{username}</span>
          </div>
        </div>
      </div>
      <div>
        <form className="max-h-[300px] overflow-y-auto " onSubmit={e => handleSubmit(e)}>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Write some text" className="w-full border test:border-slate-400 rounded-md mt-4 h-28 p-2 outline-none text-gray-700 test:bg-dark-300 test:text-slate-200"></textarea>
          {selectedImage && (
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
          )}
          <div className="flex justify-between items-center mt-4">
            <div>
              <label className="cursor-pointer" htmlFor="image">
                <img width="40" height="40" src="https://img.icons8.com/color/48/add-image.png" alt="add-image" />
              </label>
              <input ref={imageRef} onChange={e => setSelectedImage(e.target.files[0])} id="image" name="image" type="file" className="hidden " />
            </div>
            <input accept="image/*" className="py-2 px-4 bg-blue-500 rounded-md text-white hover:bg-blue-600 transition mt-4 test:bg-blue-600 test:hover:bg-blue-700 " type="submit" value="Post" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
