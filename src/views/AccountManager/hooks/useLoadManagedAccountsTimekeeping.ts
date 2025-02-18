import { useManagedAccountsStore } from "@/lib/store/managed-accounts";
import { useQueries } from "@tanstack/react-query";
import { createAccountInstance } from "../axios-instance";

type TimekeepingData = {
  first: string | null;
  last: string | null;
};

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
        return response.data;
      },
      onSuccess: (data: TimekeepingData) => {
        console.log("onSuccess", data);
        updateAccount(account.id, {
          timekeeping: data,
        });
      },
    })),
  });
};
