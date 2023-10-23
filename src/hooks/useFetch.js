import { useEffect, useState } from "react";
import { api } from "../api";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await api.get(url);
        setData(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error.message);
      }
    }
    fetchData();
  }, [url]);

  return [data, loading, error];
}

export default useFetch;
