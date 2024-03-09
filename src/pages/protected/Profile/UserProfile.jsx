import React, { useEffect, useId, useRef, useState } from "react";
import PostCard from "../../../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import useToggle from "../../../hooks/useToggle";
import { useParams } from "react-router-dom";
import { fetchUserPosts } from "../../../slice/postSlice";
import useUserProfile from "../../../hooks/useUserProfie";
import Avatar from "../../../components/Avatar";
import ImageUploader from "../../../components/ImageUploader";
import Profile from "../../../components/Profile";
import { api } from "../../../slice/api";
import { toast } from "react-toastify";
import ProfileLoader from "./ProfileLoader";

export default function UserProfile1() {
  const myId = useSelector(state => state.auth.userId);
  const { id: userId } = useParams();
  const [hidden, toggle] = useToggle();
  const [upload, toggleUpload] = useToggle(false);
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.posts);
  const status = useSelector(state => state.post.status);
  const error = useSelector(state => state.post.error);
  const isUser = myId === userId;
  const bgoptions = ["red", "orange", "yellow", "green", "blue", "indigo", "purple", "pink"];
  const [bg, setBg] = useState(null);
  const [profile, setProfile] = useState(null);

  async function handleFollow() {
    try {
      const response = await api.post(`/api/follower/follow/${profile._id}`);
      console.log(response);
      toast.success("User followed successfully");
      setProfile(prev => ({ ...prev, isFollowed: true }));
    } catch (error) {
      console.log(error);
      toast.error("Some error occured");
    }
  }
  async function handleUnFollow() {
    try {
      const response = await api.post(`/api/follower/unfollow/${profile._id}`);
      setProfile(prev => ({ ...prev, isFollowed: false }));
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("Some error occured");
    }
  }

  useEffect(() => {
    if (!isUser) {
      (async () => {
        try {
          const response = await api.get(`/api/user/${userId}`);
          console.log(response.data);
          setProfile(response.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
    dispatch(fetchUserPosts(userId));
    setBg(bgoptions[Math.floor(Math.random() * bgoptions.length)]);
  }, [userId]);

  const [user] = useUserProfile(userId);
  if (status == "loading ")
    return (
      <div className="text-black text-3xl">
        <ProfileLoader />
      </div>
    );

  if (status == "error") return <div className="text-red-500 text-3xl">{error}</div>;

  return (
    <>
      <div>
        <div>
          {isUser && upload && <ImageUploader onClose={toggleUpload} />}
          <div id="user-profile" className="mr-10 mb-20 relative appear-animation">
            <div
              className={`w-full h-[45vh] bg-${bg}-600  rounded-md  flex items-center justify-center text-3xl font-bold `}
            >
              {isUser && "Upload Image"}
            </div>
            <div className="absolute top-56 left-3 ">
              {isUser && (
                <>
                  <i
                    onClick={toggle}
                    className="fas fa-cloud-upload-alt text-white text-2xl cursor-pointer absolute bottom-1 right-4"
                  ></i>
                  <div
                    className={`dropdown px-3 py-2 bg-white space-y-4 rounded-md tex-sm text-center absolute -bottom-3 -right-28  ${
                      !hidden && "hidden"
                    }`}
                  >
                    <div onClick={toggleUpload} className="flex w-max">
                      <i className="fas fa-upload text-gray-600 mr-3"></i>
                      <button className="text-sm text-gray-600 animate-scale">Upload Image</button>
                    </div>
                  </div>
                </>
              )}
              {isUser ? (
                <Profile w={"8rem"} className={"p-1 bg-blue-600 "} />
              ) : (
                <Avatar
                  w={"8rem"}
                  src={profile?.profileImage}
                  name={profile?.firstName + " " + profile?.lastName}
                />
              )}
            </div>
          </div>
        </div>
        {!isUser && profile && (
          <div className="flex items-center justify-center gap-10 -mt-16">
            <button
              onClick={profile.isFollowed ? handleUnFollow : handleFollow}
              className="px-4 py-2 rounded-md bg-green-500"
            >
              {profile.isFollowed ? "Unfollow" : "Follow"}
            </button>
            <div className="text-black">
              Followers : <span className="text-xl text-violet-500"> {profile.followersCount}</span>
            </div>
            <div className="text-black">
              Following : <span className="text-xl text-violet-500"> {profile.followingCount}</span>
            </div>
          </div>
        )}
        <div className="space-y-3 mt-16">
          {posts.length != 0 &&
            posts.map(post => {
              return (
                <>
                  <PostCard className={"max-w-[33rem]"} key={post._id} post={post} />
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}
