import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://shpontak.tplinkdns.com/5002/",
  headers: {
    "Content-Type": "application/json",
  },
});
