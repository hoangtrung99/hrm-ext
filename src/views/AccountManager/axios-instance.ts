import { addDaysFromSeconds } from "@/lib/utils";
import Axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-hot-toast";
import { useManagedAccountsStore } from "../../lib/store/managed-accounts";

const BASE_URL = "https://api.biwi.vn/api/1.0";

export const handleRefreshToken = async (refreshToken: string) => {
  const response = await Axios.post(`${BASE_URL}/user/refresh-token`, {
    refresh_token: refreshToken,
  });
  return response.data;
};

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const createAccountInstance = (
  accessToken: string,
  refreshToken: string
): AxiosInstance => {
  const instance = Axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomInternalAxiosRequestConfig;
      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const data = await handleRefreshToken(refreshToken);
          const { access_token, refresh_token, expires_in } = data;
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
          }
          // Cập nhật token mới vào store
          const accounts = useManagedAccountsStore.getState().accounts;
          const account = accounts.find(
            (acc) => acc.refresh_token === refreshToken
          );
          const expires_at = addDaysFromSeconds(new Date(), expires_in);
          if (account) {
            useManagedAccountsStore.getState().updateAccount(account.id, {
              access_token,
              refresh_token,
              expires_at,
            });
          }
          return instance(originalRequest);
        } catch (error) {
          toast.error("Phiên đăng nhập đã hết hạn");
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
