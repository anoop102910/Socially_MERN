import React, { useEffect } from "react";
import Avatar from "./Avatar";
import Timestamp from "./Timestamp";

function CommentBox({comments = [],  isLoading, error }) {
  if (isLoading) return <div className="text-xl font-bold text-slate-700">Loading...</div>;
  if (error) return <div className="text-xl font-bold text-red-400">{"Something went wrong"}</div>;

  return (
    <div>
      {comments.length != 0 &&
        comments.map(comment => {
          return (
              <div key={comment._id} class="flex w-[26rem] flex-col items-start px-2 py-5 animate-scale">
                <div class="flex gap-3">
                  <Avatar w={"3rem"} src={comment.createdBy?.profileImage} name={comment.createdBy.firstName + " " + comment.createdBy.lastName}/>
                  <div
                    id="comment-box"
                    class="ml-0 max-w-full rounded-b-md rounded-r-md bg-slate-200 px-3 py-2 hover:bg-slate-300 transition-all hover:rotate-3 hover:translate-x-4 hover:ring-1 hover:ring-slate-400 hover:translate-y-4"
                  >
                    <span id="username" class="text-sm font-bold">
                      {comment.createdBy.firstName} {" "} {comment.createdBy.lastName}
                    </span>
                    <span id="comment-text" class="ml-3 text-xs text-slate-500">
                      <Timestamp date={comment.createdAt} />
                    </span>
                    <p class="mt-1 text-sm text-slate-600">
                      {comment.text}
                    </p>
                  </div>
                </div>
              </div>
          );
        })}
    </div>
  );
}

export default CommentBox;
