import getToken from "@/lib/getToken";
import Axios from "axios";

const authRequestInterceptor = (config: any) => {
  config.headers!.Accept = "application/json";
  const token = getToken();
  console.log(token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const axios = Axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (rsp) => rsp,
  (err) => {
    return Promise.reject(err);
  }
);
