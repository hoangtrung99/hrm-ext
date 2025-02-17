import { useManagedAccountsStore } from "@/lib/store/managed-accounts";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTableStore } from "../store/table-store";
import { useCheckIn } from "./useCheckIn";

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
      const results = await Promise.all(
        accountsToCheckIn.map((account) => checkInForAccount(account))
      );
      const successCount = results.filter(Boolean).length;
      const failCount = results.length - successCount;

      if (successCount > 0) {
        toast.success(`Đã chấm công thành công cho ${successCount} tài khoản`);
      }
      if (failCount > 0) {
        toast.error(`Chấm công thất bại cho ${failCount} tài khoản`);
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
