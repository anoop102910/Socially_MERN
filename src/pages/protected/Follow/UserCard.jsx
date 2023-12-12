import React, { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../api";

function UserCard({ user }) {
  const [requestSent, setRequestSent] = useState(false);
  async function handleFollow() {
    try {
      const response = await api.post(`/api/follower/follow/${user._id}`);
      console.log(response);
      setRequestSent(true);
      toast.success('Request sent')
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
      <div className="flex items-center">
        <img className="w-12 object-contain object-center rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4HbqZyTk4fRBYWt-7H6ubyM0ex6A8WyVunKD2mqOAmA&s" alt="" />
        <span className="text-gray-600 test:text-slate-200 ml-6">{user.firstName + " " + user.lastName}</span>
      </div>
      <button
        onClick={!requestSent ? handleFollow : handleUnFollow}
        className={`text-[0.775rem] px-4 py-2 rounded-md ${requestSent ? "bg-green-600 " : "bg-blue-500 "}  text-white`}
      >
        {requestSent ? "Following" : "Follow"}
      </button>
    </div>
  );
}

export default UserCard;
