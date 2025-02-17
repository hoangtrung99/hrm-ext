import { useManagedAccountsStore } from "@/lib/store/managed-accounts";
import { TableRow } from "./TableRow";

export function AccountsTable() {
  const { accounts } = useManagedAccountsStore();

  return (
    <div className="overflow-x-auto">
      <div className="max-h-[400px] overflow-y-auto">
        <table className="table table-zebra w-full table-pin-rows">
          <thead>
            <tr>
              <th className="w-[40px]"></th>
              <th className="w-[350px]">Tên</th>
              <th className="w-[100px]">Check in</th>
              <th className="w-[100px]">Check out</th>
              <th className="w-[80px]"></th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <TableRow key={account.id} account={account} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
