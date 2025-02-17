import { useManagedAccountsStore } from "@/lib/store/managed-accounts";
import { TableRow } from "./TableRow";

export function AccountsTable() {
  const { accounts } = useManagedAccountsStore();

  return (
    <div className="overflow-x-auto border border-base-300 rounded-lg">
      <div className="h-[250px] overflow-y-auto my-2">
        <table className="table table-zebra w-full my-0 table-xs table-pin-rows">
          <thead className="sticky top-0 bg-base-300 z-10">
            <tr>
              <th className="w-[32px]"></th>
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
