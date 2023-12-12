import React, { useEffect, useState } from "react";
import { api } from "../../../api"
import UserCard from "./UserCard";
import UserLoader from "./UserLoader";

function UserList() {
  const [users, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function run() {
      setLoading(true);
      try {
        const userData = await api.get("/api/user");
        let userList = userData.data;
        const connectionsData = await api.get("/api/follower");
        const connections = connectionsData.data;
        userList = userList.filter(user => !connections.some(connection => connection.connection._id == user._id));
        setUser(userList);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    run();
  }, []);

  if (loading) return <UserLoader />;

  return (
    <>
      <div className="bg-white test:bg-dark-200 rounded-md p-4 mt-3 shadow-md w-[550px] text-gray-700">
        <h2 className="">Friends</h2>
        <hr className="my-3" />
        {users?.length === 0 ? (
          <h2>No user available</h2>
        ) : (
          <ul>
            {users?.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default UserList;
