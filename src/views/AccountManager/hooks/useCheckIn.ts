import {
  ManagedAccount,
  useManagedAccountsStore,
} from "@/lib/store/managed-accounts";
import { encryptData } from "@/lib/utils/hash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { createAccountInstance } from "../axios-instance";

export const useCheckIn = () => {
  const { setActiveAccount } = useManagedAccountsStore();
  const queryClient = useQueryClient();

  const { mutate: checkInMutate } = useMutation(
    async ({
      hash,
      value,
      account,
    }: {
      hash: string;
      value: object;
      account: ManagedAccount;
    }) => {
      const axiosInstance = createAccountInstance(
        account.access_token,
        account.refresh_token
      );
      const response = await axiosInstance.post(
        "/user/timekeeping?hash=" + hash,
        {
          ...value,
        }
      );
      return response.data;
    },
    {
      onSuccess(data, { account }) {
        queryClient.invalidateQueries(["timekeeping-today", account.id]);
      },
    }
  );

  const checkInForAccount = async (account: ManagedAccount) => {
    try {
      const ip_v4 =
        queryClient.getQueryData(["current-ip"]) ||
        import.meta.env.VITE_FALLBACK_SOLASHI_IP;
      const value = {
        ip_v4,
        date_time: format(new Date(), "yyyy/MM/dd HH:mm:ss"),
        type: null,
      };
      const hash = await encryptData(value);
      setActiveAccount(account.id);
      await checkInMutate({
        hash,
        value,
        account,
      });
      //   toast.success(`Chấm công thành công cho ${account.user.email}!`);
      return true;
    } catch (error) {
      //   toast.error(`Chấm công thất bại cho ${account.user.email}!`);
      console.error(
        `Failed to check in for account ${account.user.email}:`,
        error
      );
      return false;
    }
  };

  return {
    checkInForAccount,
  };
};
