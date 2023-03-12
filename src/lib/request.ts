import Axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { getStorage, STORAGE_KEYS } from "./storage";
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
