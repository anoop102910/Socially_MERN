import React, { useEffect } from "react";
import PostsContainer from "./PostsContainer";
import PostForm from "./PostForm";
import { PulseLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../slice/postSlice";
import { PostLoader } from "./PostLoader";
import { checkAuthentication } from "../../slice/authSlice";

function Post() {
  const status = useSelector(state => state.post.status);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(checkAuthentication());
    dispatch(fetchPosts());
  }, []);

  if (status == "loading") return <Loader />;

  return (
    <>
      <div className="w-[550px] ">
        <PostForm className={"mb-4"} />
        <PostsContainer />
      </div>
    </>
  );
}

function Loader() {
  return (
    <div className="w-[550px] ">
      <div class="bg-white p-4 rounded-md mb-4 shadow-md">
        <div class="flex justify-between">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gray-300 rounded-full shadow-md loader"></div>
            <div class="flex flex-col ml-3 justify-between gap-y-1">
              <div class="w-24 h-4 bg-gray-300 loader"></div>
            </div>
          </div>
        </div>
        <div>
          <div class="w-full border rounded-md mt-4 h-28  loader"></div>
          <div class="relative">
            <div class="rounded-lg mt-4 -z-20 loader"></div>
          </div>
          <div class="flex justify-between items-center mt-4">
            <div class="py-2 px-4 bg-blue-500 rounded-md text-white hover:bg-blue-600 transition mt-4 loader"></div>
          </div>
        </div>
      </div>
      <PostLoader />
      <PostLoader />
      <PostLoader />
    </div>
  );
}
export default Post;
