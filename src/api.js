import axios from "axios";


const api = axios.create({ baseURL: "https://socially-api-u2p6.onrender.com", withCredentials: true ,responseType:"json"});

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