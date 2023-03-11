import Axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { getStorage, STORAGE_KEYS } from "./storage";
import { Auth } from "./types";

const baseURL = "https://api-hrm.solashi.com/api/1.0";

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const authUser = await getStorage<Auth>(STORAGE_KEYS.AUTH_USER);

  if (authUser) {
    const token = authUser.access_token;
    (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
  }

  return config;
}

export const request = Axios.create({
  baseURL,
});

request.interceptors.request.use(authRequestInterceptor);
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // const message = error.response?.data?.message || error.message
    // Handle toast message

    return Promise.reject(error.response);
  }
);
