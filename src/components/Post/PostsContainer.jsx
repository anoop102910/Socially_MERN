import React, { useEffect, useLayoutEffect } from "react";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../slice/postSlice";

function PostsContainer({ className }) {
  const posts = useSelector(state => state.post.posts);
  return (
    <div className={`w-[550px] ${className}`}>
      {posts.map(post => (
        <PostCard key={post._id} post={post} className={"mb-4"} />
      ))}
    </div>
  );
}

export default PostsContainer;
