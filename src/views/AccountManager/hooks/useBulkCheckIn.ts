import { useManagedAccountsStore } from "@/lib/store/managed-accounts";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTableStore } from "../store/table-store";
import { useCheckIn } from "./useCheckIn";

type CheckInResult = {
  success: boolean;
  email: string;
};

export const useBulkCheckIn = () => {
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const { accounts } = useManagedAccountsStore();
  const { selectedAccounts } = useTableStore();
  const { checkInForAccount } = useCheckIn();

  const handleBulkCheckIn = async () => {
    if (isCheckingIn) return;

    setIsCheckingIn(true);
    const accountsToCheckIn =
      selectedAccounts.length > 0
        ? accounts.filter((acc) => selectedAccounts.includes(acc.id))
        : accounts;

    try {
      const results: CheckInResult[] = await Promise.all(
        accountsToCheckIn.map(async (account) => {
          const success = await checkInForAccount(account);
          return {
            success,
            email: account.user.email,
          };
        })
      );

      const successResults = results.filter((r) => r.success);
      const failResults = results.filter((r) => !r.success);

      if (successResults.length > 0) {
        const message = [
          `Chấm công thành công cho ${successResults.length} tài khoản:`,
          "",
          ...successResults.map((r) => r.email),
        ].join("\n");
        toast.success(message, { duration: 2500 });
      }

      if (failResults.length > 0) {
        const message = [
          `Chấm công thất bại cho ${failResults.length} tài khoản:`,
          "",
          ...failResults.map((r) => r.email),
        ].join("\n");
        toast.error(message, { duration: 2500 });
      }
    } catch (error) {
      console.error("Check in failed:", error);
      toast.error("Có lỗi xảy ra khi chấm công");
    } finally {
      setIsCheckingIn(false);
    }
  };

  return {
    isCheckingIn,
    handleBulkCheckIn,
  };
};
