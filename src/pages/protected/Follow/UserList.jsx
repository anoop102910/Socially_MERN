import React, { useEffect, useState } from "react";
import { api } from "../../../slice/api";
import UserCard from "./UserCard";
import UserLoader from "./UserLoader";
import { useInView } from "react-intersection-observer";

function UserList() {
  const [users, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function run() {
      setLoading(true);
      try {
        const userData = await api.get(`/api/user?q=not-following&page=${page}`);
        let userList = userData.data;
        setUser(userList);
        setPage(prev=>prev+1);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    run();
  }, []);

  useEffect(() => {
    async function run() {
      try {
        const userData = await api.get(`/api/user?q=not-following&page=${page}`);
        let userList = userData.data;
        setUser(prev=>[...prev, ...userList]);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    if(inView && page>1){
      run();
      setPage(prev => prev + 1);
    }
  }, [inView]);

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
              <UserCard key={user._id} user={user} />
            ))}
          </ul>
        )}
        {users?.length > 8 && (
           <div ref={ref} className="w-full bg-trasnsparent flex justify-center items-center text-black h-[20vh] mb-10">
           <img src="spinner.svg" alt="" />
       </div>
        )}
      </div>
    </>
  );
}

export default UserList;
