import React, { useEffect, useState } from "react";
import PostsContainer from "./PostsContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../slice/postSlice";
import { PostLoader } from "./PostLoader";
import { checkAuthentication } from "../../../slice/authSlice";
import PostForm from "../../../components/PostForm";
import { useInView } from "react-intersection-observer";
function Post() {
  const status = useSelector(state => state.post.status);
  const [ref, inView] = useInView({});
  // const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  /* useEffect(() => {
    if (inView) {
      dispatch(fetchPosts(page));
      setPage(prev => prev + 1);
    }
  }, [inView]); */

  useEffect(() => {
      dispatch(fetchPosts(1));
      dispatch(checkAuthentication());
  }, []);

  if (status == "loading") return <Loader />;

  return (
    <>
      <div className="max-w-[550px] ">
        <PostForm className={"mb-4"} />
        <PostsContainer />
       {/*  <div ref={ref} className="w-full bg-green-50 text-black h-[20vh] mb-10">
          Loadinging more
        </div> */}
      </div>
    </>
  );
}

function Loader() {
  return (
    <div className="max-w-[550px] text-black">
      <div className="bg-white test:bg-dark-300 p-4 rounded-md mb-4 shadow-md">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-300 test:bg-dark-400 rounded-full shadow-md loader"></div>
            <div className="flex flex-col ml-3 justify-between gap-y-1">
              <div className="w-24 h-4 bg-gray-300 test:bg-dark-400 loader"></div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full border rounded-md mt-4 h-28  loader"></div>
          <div className="relative">
            <div className="rounded-lg mt-4 -z-20 loader"></div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="py-2 px-4 loader"></div>
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
