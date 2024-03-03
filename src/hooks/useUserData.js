import { useEffect, useState } from "react";
import { api } from "../slice/api";

const useUserData = (query, limit = 5, page = 1) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/api/user?name=${query}&limit=${limit}&page=${page}`);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
        console.log(error);
      }
    }
    fetchUserData();
  }, [query]);

  return [users, isLoading, error];
};

export default useUserData;
