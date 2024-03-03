import React from "react";
import { useSelector } from "react-redux";

function Profile({ w, className }) {
  const profileImage = useSelector(state => state.auth.profileImage);
  return (
    <div>
    {profileImage ? (
      <img className={`w-[${w}] h-[${w}]  object-cover  object-center rounded-full `} src={profileImage} alt="" />
    ) : (
      <img className={`w-[${w}] h-[${w}]   object-cover object-center rounded-full `} src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${name}&size=48&backgroundColor=b6e3f4,c0aede,d1d4f9`} alt="" />
    )}
  </div>
  );
}

export default Profile;
