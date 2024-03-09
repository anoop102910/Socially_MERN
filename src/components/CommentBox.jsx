import React, { useEffect } from "react";
import Avatar from "./Avatar";
import Timestamp from "./Timestamp";
import useToggle from "../hooks/useToggle";
import { deleteComment } from "../slice/postSlice";
import { useDispatch, useSelector } from "react-redux";

function CommentBox({ comments = [], isLoading, error }) {
  if (isLoading) return <div className="text-xl font-bold text-slate-700">Loading...</div>;
  if (error) return <div className="text-xl font-bold text-red-400">{"Something went wrong"}</div>;

  return (
    <div>
      {comments.length != 0 &&
        comments.map(comment => {
          return <Comment key={comment._id} comment={comment} />;
        })}
    </div>
  );
}

function Comment({ comment }) {
  const isUserPost = comment.userId===useSelector(state=>state.auth.userId);
  const [isToggled, toggle] = useToggle(false);
  const dispatch = useDispatch();
  const handleDeleteComment = () => {
    dispatch(deleteComment(comment._id));
  };

  return (
    <div key={comment._id} class="flex w-[26rem] flex-col items-start px-2 py-5 animate-scale">
      <div></div>
      <div class="flex gap-3">
        <Avatar
          w={"3rem"}
          src={comment.createdBy?.profileImage}
          name={comment.createdBy.firstName + " " + comment.createdBy.lastName}
        />
        <div
          id="comment-box"
          class="ml-0 max-w-full rounded-b-md rounded-r-md bg-slate-200 px-3 py-2 hover:bg-slate-300 transition-all  hover:ring-1 hover:ring-slate-400 "
        >
          <span id="username" class="text-sm font-bold">
            {comment.createdBy.firstName} {comment.createdBy.lastName}
          </span>
          <span id="comment-text" class="ml-3 text-xs text-slate-500">
            <Timestamp date={comment.createdAt} />
          </span>
          <p class="mt-1 text-sm text-slate-600">{comment.text}</p>
        </div>
        {isUserPost && (
          <div id="postcard-dropdown-menu" className="relative  ">
            <i onClick={toggle} className="fas fa-ellipsis-h cursor-pointer" />
            <div
              className={`animate-scale text-xs transition-all flex gap-x-3 p-1 bg-white ring-1 ring-slate-300 rounded-md items-start gap-y-2 text-gray-900 flex-col absolute top-5 -left-1 ${
                !isToggled && "hidden "
              }`}
            >
              <div
                onClick={handleDeleteComment}
                className="gap-x-3  flex items-center hover:bg-slate-200 px-2 py-1 rounded-md transition-all duration-200"
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
    </div>
  );
}

export default CommentBox;
