import Axios, {
  AxiosHeaders,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { getStorage, STORAGE_KEYS } from "./storage";

const baseURL = "https://api-hrm.solashi.com/api/1.0";

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const _token = (await getStorage(STORAGE_KEYS.ACCESS_TOKEN)) ?? "";

  if (_token) {
    const token = JSON.parse(_token);
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
