import axios from "axios";


const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, withCredentials: true ,responseType:"json"});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  export  {api};