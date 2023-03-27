import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getStorage, STORAGE_KEYS } from "..";
import logger from "../logger";
import { createFetchRequest } from "../request";
import { useAuthStore } from "../store";
import { Auth } from "../types";
import { addDaysFromSeconds } from "./date";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getToken = async (): Promise<string | null> => {
  const authUserJSON = await getStorage<string>(STORAGE_KEYS.AUTH_USER);

  if (authUserJSON) {
    const authUser = JSON.parse(authUserJSON) as { state: Auth };
    const token = authUser.state.access_token;
    return token as string;
  }

  return null;
};

export const handleRefreshToken = async () => {
  const refreshToken = useAuthStore.getState().refresh_token;
  if (!refreshToken) return; // maybe need clearAuth

  try {
    const res = await createFetchRequest("/auth/refresh", "POST", {
      refresh_token: refreshToken,
    });

    const data = await res.json();
    const expires_at = addDaysFromSeconds(new Date(), data.expires_in);
    useAuthStore.setState({ ...data, expires_at });
  } catch (error) {
    logger("Refresh token failed");
  }
};
