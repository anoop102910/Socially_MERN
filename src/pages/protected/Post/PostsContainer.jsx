import { useDispatch, useSelector } from "react-redux";
import PostCard from "../../../components/PostCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const page = 1;
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
