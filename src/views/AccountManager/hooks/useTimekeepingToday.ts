import { ManagedAccount } from "@/lib/store/managed-accounts";
import { useQuery } from "@tanstack/react-query";
import { createAccountInstance } from "../axios-instance";

export const useTimekeepingToday = (account: ManagedAccount) => {
  return useQuery({
    queryKey: ["timekeeping-today", account.id],
    queryFn: async () => {
      const axiosInstance = createAccountInstance(
        account.access_token,
        account.refresh_token
      );
      const response = await axiosInstance.get(`/user/timekeeping/today`);
      return response.data;
    },
  });
};
