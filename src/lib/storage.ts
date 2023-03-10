import logger from "./logger";

export const STORAGE_KEYS = { ACCESS_TOKEN: "accessToken", USER: "user" };

export const getStorage = async <T = string>(
  key: string
): Promise<T | undefined> => {
  try {
    const value = await chrome.storage.local.get([key]);
    return value[key];
  } catch (error) {
    logger("Get storage error: ", error);
    return undefined;
  }
};

export const setStorage = async <T>(key: string, value: T): Promise<void> => {
  try {
    await chrome.storage.local.set({ key: value });
    logger("Set storage success: ", key);
  } catch (error) {
    logger("Set storage error: ", error);
  }
};
