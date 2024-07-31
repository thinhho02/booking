import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api",withCredentials: true });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("accessToken")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  }
  return req;
});


const queryClient = new QueryClient();

export {API, queryClient}