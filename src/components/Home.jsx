import React from "react";
import Sidebar from "./Sidebar";
import Post from "./Post/Post";

function Home() {
  return (
    <>
      <div className="w-full mt-20">
        <Sidebar className={"fixed top-16 left-2"} />
        <Post />
      </div>
    </>
  );
}

export default Home;
