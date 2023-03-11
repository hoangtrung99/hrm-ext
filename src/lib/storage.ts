import logger from "./logger";
import { createJSONStorage, StateStorage } from "zustand/middleware";

export const STORAGE_KEYS = { AUTH_USER: "auth-user" };

export const getStorage = async <T = string>(
  key: string
): Promise<T | null> => {
  try {
    const value = await chrome.storage.local.get([key]);
    return value[key];
  } catch (error) {
    logger("Get storage error: ", error);
    return null;
  }
};

export const setStorage = async <T>(key: string, value: T): Promise<void> => {
  try {
    await chrome.storage.local.set({ [key]: value });
    logger("Set storage success: ", key);
  } catch (error) {
    logger("Set storage error: ", error);
  }
};

const chromeStorageState: StateStorage = {
  getItem: getStorage,
  setItem: setStorage,
  async removeItem(name): Promise<void> {
    try {
      await chrome.storage.local.remove(name);
    } catch (error) {
      logger("removeItem error: ", error);
    }
  },
};

export const chromeStorage = createJSONStorage(() => chromeStorageState);
