import { useEffect, useState } from "react";
import { api } from "../slice/api";

const useUserProfile = (userId) => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/api/user/${userId}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
        console.log(error);
      }
    }
    fetchUserData();
  }, [userId]);

  return [user, isLoading, error];
};

export default useUserProfile;
