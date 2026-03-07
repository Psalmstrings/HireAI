import axios from "axios";

const API = axios.create({
  baseURL: "http://hirenaija.runasp.net/api"
});

export const login = (data) => API.post("/auth/login", data);
export const runScreening = (data) => API.post("/screening", data);