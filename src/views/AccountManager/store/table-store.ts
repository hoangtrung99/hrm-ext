import { useManagedAccountsStore } from "@/lib/store/managed-accounts";
import { create } from "zustand";

interface TableState {
  selectedAccounts: string[];
  setSelectedAccounts: (accounts: string[]) => void;
  toggleSelectAccount: (id: string) => void;
  clearSelectedAccounts: () => void;
  handleRemoveAccount: (id: string) => void;
}

export const useTableStore = create<TableState>((set) => ({
  selectedAccounts: [],
  setSelectedAccounts: (accounts) => set({ selectedAccounts: accounts }),
  toggleSelectAccount: (id) =>
    set((state) => ({
      selectedAccounts: state.selectedAccounts.includes(id)
        ? state.selectedAccounts.filter((accId) => accId !== id)
        : [...state.selectedAccounts, id],
    })),
  clearSelectedAccounts: () => set({ selectedAccounts: [] }),
  handleRemoveAccount: (id: string) => {
    const { removeAccount } = useManagedAccountsStore.getState();
    removeAccount(id);
    set({ selectedAccounts: [] });
  },
}));
