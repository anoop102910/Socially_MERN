import axios from "axios";

export const api = axios.create({ baseURL: "https://socially-api-u2p6.onrender.com", withCredentials: true });