// src/api/auth.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // session cookie ke liye
});

export const signupUser = async (data) => {
  return await API.post("/signup", data);
};

export const loginUser = async (data) => {
  return await API.post("/login", data);
};

export const getDashboard = async () => {
  return await API.get("/dashboard");
};
