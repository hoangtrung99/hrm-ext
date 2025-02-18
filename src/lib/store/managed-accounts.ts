import { create } from "zustand";
import { persist } from "zustand/middleware";
import { chromeStorage, STORAGE_KEYS } from "../storage";
import { Auth } from "../types";

export type ManagedAccount = Auth & {
  id: string;
  isActive: boolean;
  lastCheckin?: string;
  timekeeping?: {
    first: string | null;
    last: string | null;
  };
};

type ManagedAccountsStore = {
  accounts: ManagedAccount[];
  addAccount: (auth: Auth) => void;
  removeAccount: (id: string) => void;
  setActiveAccount: (id: string) => void;
  updateAccount: (id: string, data: Partial<ManagedAccount>) => void;
  clearAccounts: () => void;
};

export const useManagedAccountsStore = create<ManagedAccountsStore>()(
  persist(
    (set, get) =>
      ({
        accounts: [],
        addAccount(auth: Auth) {
          const accounts = get().accounts;
          const id = `${auth.user.id}-${Date.now()}`;
          const newAccount = { ...auth, id, isActive: true };
          set({
            accounts: [...accounts, newAccount],
          });
        },
        removeAccount(id: string) {
          const accounts = get().accounts.filter((acc) => acc.id !== id);
          set({ accounts });
        },
        setActiveAccount(id: string) {
          const accounts = get().accounts.map((acc) => ({
            ...acc,
            isActive: acc.id === id,
          }));
          set({ accounts });
        },
        updateAccount(id: string, data: Partial<ManagedAccount>) {
          const accounts = get().accounts.map((acc) =>
            acc.id === id ? { ...acc, ...data } : acc
          );

          set({ accounts });
        },
        clearAccounts() {
          set({ accounts: [] });
        },
      } as ManagedAccountsStore),
    {
      name: STORAGE_KEYS.MANAGED_ACCOUNTS,
      storage: chromeStorage,
    }
  )
);
