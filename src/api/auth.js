// src/api/auth.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const signupUser = async (data) => {
  return await API.post("/signup", data);
};

export const loginUser = async (data) => {
  return await API.post("/login", data);
};

