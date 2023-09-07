import { ClassValue, clsx } from "clsx";
import { addDays, compareAsc } from "date-fns";
import { twMerge } from "tailwind-merge";
import { getStorage, STORAGE_KEYS } from "..";
import logger from "../logger";
import { createFetchRequest } from "../request";
import { useAuthStore } from "../store";
import {
  Auth,
  OvertimeSalaryCoefficientsType,
  TimekeepingData,
} from "../types";
import { addDaysFromSeconds, generateDateOfMonth } from "./date";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getToken = async (): Promise<Auth | null> => {
  const authUserJSON = await getStorage<string>(STORAGE_KEYS.AUTH_USER);

  if (authUserJSON) {
    const authUser = JSON.parse(authUserJSON) as { state: Auth };
    return authUser.state;
  }

  return null;
};

export const handleRefreshToken = async () => {
  console.log("run handleRefreshToken");
  // const refreshToken = useAuthStore.getState().refresh_token;

  const authState = await getToken();
  const refreshToken = authState?.refresh_token;

  console.log("refreshToken", refreshToken);
  if (!refreshToken) return; // maybe need clearAuth

  try {
    const res = await createFetchRequest("/user/refresh-token", "POST", {
      refresh_token: refreshToken,
    });

    const data = await res.json();
    const expires_at = addDaysFromSeconds(new Date(), data.expires_in);
    useAuthStore.setState({ ...data, expires_at });
  } catch (error) {
    console.log(error);
    logger("Refresh token failed");
  }
};

export const refreshTokenIfNeed = async () => {
  const expiredAt = useAuthStore.getState().expires_at;
  if (!expiredAt) return;

  console.log("token expiredAt", expiredAt);

  if (compareAsc(addDays(new Date(), 2), new Date(expiredAt)) === 1) {
    handleRefreshToken();
  }
};

export const getTimekeepingOfMonth = (arr: TimekeepingData[]): number[] => {
  const dateOfMonth = generateDateOfMonth();

  return dateOfMonth.map((date) => {
    const item = arr.find((item) => item.date === date);
    if (!item) return 0;

    const totalMinute =
      Number(item.total_time_work ?? 0) +
      Number(
        item.overtime?.overtime_salary_coefficients
          ? item.overtime?.overtime_salary_coefficients.reduce(
              (total: number, item: OvertimeSalaryCoefficientsType) =>
                total + item.total_time_work,
              0
            )
          : 0
      );

    return Number((totalMinute / 60).toFixed(1));
  });
};

export function searchElementInIframes(
  documentContext: typeof document,
  elementId: string
): HTMLElement | null {
  const element = documentContext.getElementById(elementId) as HTMLElement;
  if (element) {
    return element;
  }

  const iframes = documentContext.querySelectorAll("iframe");
  for (const iframe of iframes) {
    const doc = iframe.contentDocument as Document;
    const result = searchElementInIframes(doc, elementId);
    if (result) {
      return result;
    }
  }

  return null;
}
