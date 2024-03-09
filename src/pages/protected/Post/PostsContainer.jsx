import { useDispatch, useSelector } from "react-redux";
import PostCard from "../../../components/PostCard";

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
