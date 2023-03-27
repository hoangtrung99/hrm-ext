import Axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { toast } from "react-hot-toast";
import { getStorage, STORAGE_KEYS } from "./storage";
import { useAuthStore } from "./store";
import { Auth } from "./types";

const baseURL = "https://api-hrm.solashi.com/api/1.0";

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const authUserJSON = await getStorage<string>(STORAGE_KEYS.AUTH_USER);

  if (authUserJSON) {
    const authUser = JSON.parse(authUserJSON) as { state: Auth };
    const token = authUser.state.access_token;
    (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
  }

  return config;
}

export const axios = Axios.create({
  baseURL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // const message = error.response?.data?.message || error.message
    // Handle toast message
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
      alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
      toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
    }

    return Promise.reject(error.response);
  }
);

export const createFetchRequest = (
  url: string,
  method: "POST" | "GET" | "PUT",
  body?: Record<string, unknown>
) => {
  return fetch(`${baseURL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + useAuthStore.getState().access_token,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
};
