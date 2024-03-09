import React, { useEffect, useState } from "react";
import PostsContainer from "./PostsContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchMorePosts, fetchPosts } from "../../../slice/postSlice";
import { PostLoader } from "./PostLoader";
import PostForm from "../../../components/PostForm";
import { useInView } from "react-intersection-observer";
function Post() {
  const status = useSelector(state => state.post.status);
  const postCount = useSelector(state => state.post.posts.length);
  const [ref, inView] = useInView({});
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (inView && page > 1) {
      (async () => {
        await dispatch(fetchMorePosts(page));
        setPage(page+1);
      })();
    } else setPage(page+1);
  }, [inView]);

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, []);

  if (status == "loading") return <Loader />;

  return (
    <>
      <div className="max-w-[550px] ">
        <PostForm className={"mb-4"} />
        {status == "loading" ? (
          <Loader />
        ) : (
          <>
            <PostsContainer />
            {postCount > 8 && (
              <div ref={ref} className="w-full bg-trasnsparent flex justify-center items-center text-black h-[20vh] mb-10">
                  <img src="spinner.svg" alt="" />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

function Loader() {
  return (
    <div className="max-w-[550px] text-black">
      <PostLoader />
      <PostLoader />
      <PostLoader />
    </div>
  );
}
export default Post;
