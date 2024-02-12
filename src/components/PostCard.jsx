import { useDispatch, useSelector } from "react-redux";
import useToggle from "../hooks/useToggle";
import { deletePost, likePost, unLikePost } from "../slice/postSlice";
import Timestamp from "./Timestamp"
import ConnectionProfile from "./ConnectionProfile";

function PostCard({ className, post }) {
  const [isToggled, toggle] = useToggle(false);
  const userId = useSelector(state => state.auth.userId);
  const { like, createdBy, createdAt, text, imageUrl, _id } = post;
  const dispatch = useDispatch();
  const liked = like.some(likedBy => likedBy.userId === userId);
  const isUserPost = post.createdBy._id === userId;

  function handlePostDelete() {
    console.log("delete/post");
    dispatch(deletePost(_id));
  }
  function handlePostLike() {
    console.log("like/post");
    dispatch(likePost(_id));
  }
  function handlePostUnlike() {
    console.log("unlike/post");
    dispatch(unLikePost(_id));
  }

  return (
    <div className={`bg-white py-4 md:p-4 md:rounded-md text-gray-700 shadow-md test:bg-dark-200 test:text-white ${className}`}>
      <div className="flex justify-between px-2">
        <div className="flex items-center">
          <ConnectionProfile w={'3rem'} src={createdBy.profileImage}/>
          <div className="flex flex-col ml-3 justify-between gap-y-1">
            <span className="text-sm ">{createdBy.firstName + " " + createdBy.lastName}</span>
            <Timestamp date={createdAt} className="text-xs text-gray-500 test:text-white" />
          </div>
        </div>
        {isUserPost && (
          <div id="postcard-dropdown-menu" className="relative ">
            <i onClick={toggle} className="fas fa-ellipsis-h " />
            <div className={`appear-animation flex gap-x-3 py-1 px-3 bg-gray-100 ring-1 ring-slate-300 rounded-md items-start gap-y-2 text-gray-900 flex-col absolute top-5 -left-1 ${!isToggled && "hidden"}`}>
              <div onClick={handlePostDelete} className="gap-x-3 flex items-center ">
                <i className="fas fa-trash "></i>
                <button>Delete</button>
              </div>
              <div className="gap-x-3 flex items-center ">
                <i className="fas fa-edit"></i>
                <button>Edit</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-8 test:text-slate-300 text-gray-700  text-[0.89rem]">
        {text && <p className="px-2">{text}</p>}
        {imageUrl && <img src={imageUrl} className="w-full object-contain object-center mt-4 md:rounded-lg " alt="" />}
        <div className="mt-4 flex justify-between items-center px-2">
          <div className="flex gap-x-6">
            <div>
              {liked ? <i onClick={handlePostUnlike} className="fas fa-heart text-red-500" /> : <i onClick={handlePostLike} className="far fa-heart text-red-500" />}
              <span className="test:text-white ml-1">{like.length}</span>
            </div>
            <div>
              <i className="far fa-comment" />
              <span className="test:text-white ml-1">7 Comments</span>
            </div>
          </div>
          <div>
            <i className="fas fa-share" />
            <span className="test:text-white ml-2">Share</span>
          </div>
        </div>
        <div className="flex gap-x-3 mt-4 items-center px-2">
          <img className="w-12 object-contain object-center rounded-full shadow-md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4HbqZyTk4fRBYWt-7H6ubyM0ex6A8WyVunKD2mqOAmA&s" alt="" />
          <input className="border border-gray-300 rounded-3xl px-5 w-full outline-none py-[0.55rem] test:bg-dark-300 test:text-white" placeholder="Write some content to post" type="text" />
        </div>
      </div>
    </div>
  );
}

export default PostCard;
