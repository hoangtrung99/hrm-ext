import { create } from "zustand";
import { persist } from "zustand/middleware";
import { chromeStorage, STORAGE_KEYS } from "../storage";
import { Auth } from "../types";

type AuthStore = {
  clearAuth: () => void;
} & Partial<Auth>;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) =>
      ({
        clearAuth() {
          set({
            user: undefined,
            access_token: undefined,
            refresh_token: undefined,
            expires_in: undefined,
            token_type: undefined,
          });
        },
      } as AuthStore),
    {
      name: STORAGE_KEYS.AUTH_USER,
      storage: chromeStorage,
    }
  )
);
