import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AccountsTable } from "./components/AccountsTable";
import { AddAccountForm } from "./components/AddAccountForm";
import { useBulkCheckIn } from "./hooks/useBulkCheckIn";
import { useTableStore } from "./store/table-store";

export function AccountManager() {
  const { selectedAccounts } = useTableStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const { isCheckingIn, handleBulkCheckIn } = useBulkCheckIn();

  return (
    <div className="space-y-1">
      <div className="flex flex-col justify-between items-center">
        <p className="text-xl font-semibold my-2">Quản lý tài khoản</p>
        <div className="flex gap-2">
          <Button
            onClick={handleBulkCheckIn}
            disabled={isCheckingIn}
            className="btn-secondary"
            size="sm"
          >
            {isCheckingIn
              ? "Đang chấm công..."
              : `Check in ${
                  selectedAccounts.length > 0
                    ? `(${selectedAccounts.length})`
                    : "tất cả"
                }`}
          </Button>

          <Button onClick={() => setShowAddForm(true)} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Thêm tài khoản
          </Button>
        </div>
      </div>

      {showAddForm && <AddAccountForm onClose={() => setShowAddForm(false)} />}

      <AccountsTable />
    </div>
  );
}
