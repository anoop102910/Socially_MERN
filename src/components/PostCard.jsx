import { useDispatch, useSelector } from "react-redux";
import React from "react";
import useToggle from "../hooks/useToggle";
import { addComment, deletePost, fetchComments, likePost, unLikePost } from "../slice/postSlice";
import Timestamp from "./Timestamp";
import Avatar from "./Avatar";
import { useState } from "react";
import CommentBox from "./CommentBox";
import Profile from "./Profile";

function PostCard({ className, post }) {
  const [isToggled, toggle] = useToggle(false);
  const [commentVal, setCommentVal] = useState("");
  const dispatch = useDispatch();

  const userId = useSelector(state => state.auth.userId);
  const { createdBy, createdAt, text, imageUrl, _id, liked, likeCount, commentCount } = post;
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
  function handleComment() {
    console.log("comment/post");
    dispatch(addComment({ text: commentVal, postId: post._id }));
    setCommentVal("");
  }
  function handleCommentBox() {
    dispatch(fetchComments(post._id));
  }

  return (
    <div
      className={` bg-white py-4 md:p-4 md:rounded-md text-gray-700 shadow-md test:bg-dark-200 test:text-white ${className}`}
    >
      <div className="flex justify-between px-2">
        <div className="flex items-center">
          {isUserPost ? (
            <Profile w={"3rem"} />
          ) : (
            <Avatar
              name={createdBy.firstName + " " + createdBy.lastName}
              w={"3rem"}
              src={createdBy.profileImage}
            />
          )}
          <div className="flex flex-col ml-3 justify-between gap-y-1">
            <span className="text-sm ">{createdBy.firstName + " " + createdBy.lastName}</span>
            <Timestamp date={createdAt} className="text-xs text-gray-500 test:text-white" />
          </div>
        </div>
        {isUserPost && (
          <div id="postcard-dropdown-menu" className="relative  ">
            <i onClick={toggle} className="fas fa-ellipsis-h cursor-pointer" />
            <div
              className={`animate-scale  transition-all flex gap-x-3 p-1 bg-white ring-1 ring-slate-300 rounded-md items-start gap-y-2 text-gray-900 flex-col absolute top-5 -left-1 ${
                !isToggled && "hidden "
              }`}
            >
              <div
                onClick={handlePostDelete}
                className="gap-x-3 flex items-center hover:bg-slate-200 px-2 py-1 rounded-md transition-all duration-200"
              >
                <i className="fas fa-trash text-slate-600"></i>
                <button>Delete</button>
              </div>
              <div className="gap-x-3 flex items-center px-2 py-1 hover:bg-slate-200 w-full rounded-md transition-all duration-200">
                <i className="fas fa-edit text-slate-600"></i>
                <button>Edit</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-8 test:text-slate-300 text-gray-700  text-[0.89rem]">
        {text && <p className="px-2">{text}</p>}
        {imageUrl && (
          <img
            src={imageUrl}
            className="w-full object-contain object-center mt-4 md:rounded-lg lazyload"
            alt=""
            loading="lazy"
          />
        )}
        <div className="mt-4 flex justify-between items-center px-2">
          <div className="flex gap-x-6">
            <div>
              {liked ? (
                <i
                  onClick={handlePostUnlike}
                  className="fas fa-heart text-red-500 active:scale-150 cursor-pointer transition-all "
                />
              ) : (
                <i
                  onClick={handlePostLike}
                  className="far fa-heart text-red-500 transition-all cursor-pointer active:scale-150"
                />
              )}
              <span className="test:text-white ml-1">{likeCount} Likes</span>
            </div>
            <div onClick={handleCommentBox} className="cursor-pointer hover:underline">
              <i className="far fa-comment" />
              <span className="test:text-white ml-1">{commentCount} Comments</span>
            </div>
          </div>
          <div>
            <i className="fas fa-share" />
            <span className="test:text-white ml-2">Share</span>
          </div>
        </div>
        <div className="flex gap-x-3 mt-4 items-center px-2">
          {
            <img
              className="w-12 object-contain object-center rounded-full shadow-md"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4HbqZyTk4fRBYWt-7H6ubyM0ex6A8WyVunKD2mqOAmA&s"
              alt=""
            />
          }
          <input
            value={commentVal}
            onChange={e => setCommentVal(e.target.value)}
            className="border placeholder:text-slate-500 border-gray-300 rounded-3xl px-5 w-full outline-none py-[0.55rem] test:bg-dark-300 test:text-white"
            placeholder="Write some content to post"
            type="text"
          />
          {commentVal.length != 0 && (
            <button
              onClick={handleComment}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 focus-within:bg-blue-800 text-white rounded-full text-sm"
            >
              Post
            </button>
          )}
        </div>
        {post.comments && post.comments?.length != 0 && (
          <>
            <CommentBox comments={post.comments} postId={post._id} />
            <span className="underline text-sm text-slate-600">Load More...</span>
          </>
        )}
      </div>
    </div>
  );
}

export default PostCard;
