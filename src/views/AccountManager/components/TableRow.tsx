import { Button } from "@/components/ui/button";
import { ManagedAccount } from "@/lib/store/managed-accounts";
import { UTCtoGTM7 } from "@/lib/utils";
import { format } from "date-fns";
import { useTimekeepingToday } from "../hooks/useTimekeepingToday";
import { useTableStore } from "../store/table-store";

interface TableRowProps {
  account: ManagedAccount;
}

export function TableRow({ account }: TableRowProps) {
  const { selectedAccounts, toggleSelectAccount, handleRemoveAccount } =
    useTableStore();
  const { data: timekeeping, isLoading } = useTimekeepingToday(account);

  const formatTime = (timeString: string | undefined) => {
    if (!timeString) return "-";
    return format(UTCtoGTM7(new Date(timeString)), "HH:mm:ss");
  };

  const getTime = (type: "first" | "last") => {
    if (account.timekeeping?.[type]) {
      return formatTime(account.timekeeping[type]);
    }
    return formatTime(timekeeping?.[type]);
  };

  if (isLoading && !account.timekeeping?.first && !account.timekeeping?.last) {
    return (
      <tr className="animate-pulse">
        <td>
          <div className="w-4 h-4 bg-base-300 rounded" />
        </td>
        <td>
          <div className="h-4 bg-base-300 rounded w-[300px]" />
        </td>
        <td>
          <div className="h-4 bg-base-300 rounded w-[80px]" />
        </td>
        <td>
          <div className="h-4 bg-base-300 rounded w-[80px]" />
        </td>
        <td>
          <div className="h-8 bg-base-300 rounded w-[60px]" />
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          className="checkbox checkbox-sm"
          checked={selectedAccounts.includes(account.id)}
          onChange={() => toggleSelectAccount(account.id)}
        />
      </td>
      <td className="font-bold text-white truncate max-w-[350px] whitespace-nowrap">
        {account.user.employee.personal_information.full_name}
      </td>
      <td className="font-bold text-secondary whitespace-nowrap">
        {getTime("first")}
      </td>
      <td className="font-bold text-secondary whitespace-nowrap">
        {getTime("last")}
      </td>
      <td>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleRemoveAccount(account.id)}
        >
          Xóa
        </Button>
      </td>
    </tr>
  );
}
