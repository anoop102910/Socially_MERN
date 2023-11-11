import React, { useEffect, useLayoutEffect } from "react";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";

function PostsContainer({ className }) {
  const posts = useSelector(state => state.post.posts);
  return (
    <div className={`${className}`}>
      {posts.map(post => (
        <PostCard key={post._id} post={post} className={"mb-4"} />
      ))}
    </div>
  );
}

export default PostsContainer;
