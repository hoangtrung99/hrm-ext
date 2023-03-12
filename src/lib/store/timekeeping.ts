import { create } from "zustand";
import { persist } from "zustand/middleware";
import { chromeStorage, STORAGE_KEYS } from "../storage";

type TimekeepingValue = {
  isAutoTimekeeping: boolean;
  first: string | null;
  last: string | null;
  updateIsAutoTimekeeping: (isAutoTimekeeping: boolean) => void;
};

export const useTimekeepingStore = create<TimekeepingValue>()(
  persist(
    (set) => ({
      isAutoTimekeeping: false,
      first: null,
      last: null,
      updateIsAutoTimekeeping: (isAutoTimekeeping: boolean) =>
        set({ isAutoTimekeeping }),
    }),
    {
      name: STORAGE_KEYS.TIMEKEEPING,
      storage: chromeStorage,
    }
  )
);
