import React, { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../slice/api";
import Avatar from "../../../components/Avatar";
import { Link } from "react-router-dom";

function UserCard({ user }) {
  const [requestSent, setRequestSent] = useState(false);
  async function handleFollow() {
    try {
      const response = await api.post(`/api/follower/follow/${user._id}`);
      console.log(response);
      setRequestSent(true);
      toast.success("User followed successfully");
    } catch (error) {
      console.log(error);
      toast.error("Some error occured");
    }
  }
  async function handleUnFollow() {
    try {
      const response = await api.post(`/api/follower/unfollow/${user._id}`);
      console.log(response);
      setRequestSent(false);
    } catch (error) {
      console.log(error);
      toast.error("Some error occured");
    }
  }
  return (
    <div className="flex items-center justify-between mb-4 ">
      <Link to={`/user/${user._id}`}>
        <div className="flex items-center">
          <Avatar w={"3rem"} src={user.profileImage} name={user.firstName + " " + user.lastName} />
          <span className="text-gray-600 test:text-slate-200 ml-6">
            {user.firstName + " " + user.lastName}
          </span>
        </div>
      </Link>

      <button
        onClick={!requestSent ? handleFollow : handleUnFollow}
        className={`text-[0.775rem] px-4 py-2 rounded-md ${
          requestSent ? "bg-green-600 " : "bg-blue-500 "
        }  text-white`}
      > 
        {requestSent ? "Following" : "Follow"}
      </button>
    </div>
  );
}

export default UserCard;
