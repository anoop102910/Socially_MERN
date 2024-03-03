import React, { useEffect, useId, useRef, useState } from "react";
import PostCard from "../../../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import useToggle from "../../../hooks/useToggle";
import { useParams } from "react-router-dom";
import { fetchUserPosts } from "../../../slice/postSlice";
import useUserProfile from "../../../hooks/useUserProfie";
import Avatar from "../../../components/Avatar";
import ImageUploader from "../../../components/ImageUploader";

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

  useEffect(() => {
    dispatch(fetchUserPosts(userId));
    setBg(bgoptions[Math.floor(Math.random() * bgoptions.length)]);
  }, [userId]);

  const [user] = useUserProfile(userId);

  if (status == "loading") return <div className="text-black text-3xl">Loading...</div>;

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
              <Avatar
                name={user.firstName + " " + user.lastName}
                src={user.profileImage}
                w={"8rem"}
                className={"p-1 bg-blue-600 "}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
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
