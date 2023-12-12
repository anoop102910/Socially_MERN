import React, { useState } from "react";
import Timestamp from "./Timestamp";
import useToggle from "../../../hooks/useToggle";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost, unLikePost } from "../../slice/postSlice";

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
    <div className={`bg-white p-4 rounded-md shadow-md ${className}`}>
      <div className="flex justify-between">
        <div className="flex items-center">
          <img className="w-12 object-contain object-center rounded-full shadow-md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4HbqZyTk4fRBYWt-7H6ubyM0ex6A8WyVunKD2mqOAmA&s" alt="" />
          <div className="flex flex-col ml-3 justify-between gap-y-1">
            <span className="text-sm text-gray-600">{createdBy.firstName + " " + createdBy.lastName}</span>
            <Timestamp date={createdAt} className="text-xs text-gray-500" />
          </div>
        </div>
        {isUserPost && (
          <div id="postcard-dropdown-menu" className="relative">
            <i onClick={toggle} className="fas fa-ellipsis-h text-gray-600" />
            <div className={`flex gap-x-3 py-1 px-3 bg-gray-300 rounded-md items-start gap-y-2 text-gray-900 flex-col absolute top-5 -left-1 ${!isToggled && "hidden"}`}>
              <div onClick={handlePostDelete} className="gap-x-3 flex items-center ">
                <i className="fas fa-trash"></i>
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
      <div className="mt-8 text-gray-700 text-[0.89rem]">
        {text && <p className="">{text}</p>}
        {imageUrl && <img src={imageUrl} className="w-full object-contain object-center mt-4 rounded-lg " alt="" />}
        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-x-6">
            <div>
              {liked ? <i onClick={handlePostUnlike} className="fas fa-heart text-red-500" /> : <i onClick={handlePostLike} className="far fa-heart text-red-500" />}
              <span className="text-gray-700 ml-1">{like.length}</span>
            </div>
            <div>
              <i className="far fa-comment" />
              <span className="text-gray-700 ml-1">7 Comments</span>
            </div>
          </div>
          <div>
            <i className="fas fa-share" />
            <span className="text-gray-700 ml-2">Share</span>
          </div>
        </div>
        <div className="flex gap-x-3 mt-4 items-center">
          <img className="w-12 object-contain object-center rounded-full shadow-md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4HbqZyTk4fRBYWt-7H6ubyM0ex6A8WyVunKD2mqOAmA&s" alt="" />
          <input className="border border-gray-300 rounded-3xl px-5 w-full outline-none py-[0.55rem]" placeholder="Write some content to post" type="text" />
        </div>
      </div>
    </div>
  );
}

export default PostCard;
