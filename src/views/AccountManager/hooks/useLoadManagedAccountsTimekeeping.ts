import { useManagedAccountsStore } from "@/lib/store/managed-accounts";
import { useQueries } from "@tanstack/react-query";
import { createAccountInstance } from "../axios-instance";

export const useLoadManagedAccountsTimekeeping = () => {
  const { accounts, updateAccount } = useManagedAccountsStore();

  return useQueries({
    queries: accounts.map((account) => ({
      queryKey: ["timekeeping-today", account.id],
      queryFn: async () => {
        const axiosInstance = createAccountInstance(
          account.access_token,
          account.refresh_token
        );
        const response = await axiosInstance.get("/user/timekeeping/today");
        const data = response.data;

        // Cập nhật timekeeping vào store
        updateAccount(account.id, {
          timekeeping: data,
        });

        return data;
      },
    })),
  });
};
