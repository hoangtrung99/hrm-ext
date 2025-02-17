import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { useAddAccount } from "../hooks/useAddAccount";

interface AddAccountFormProps {
  onClose: () => void;
}

export function AddAccountForm({ onClose }: AddAccountFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { addAccount, isLoading } = useAddAccount();

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAccount(
      { email, password },
      {
        onSuccess() {
          setEmail("");
          setPassword("");
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="card bg-base-100 w-full max-w-md relative">
        <button
          type="button"
          className="btn btn-ghost btn-sm absolute right-2 top-2"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Thêm tài khoản</h3>
          <form onSubmit={handleAddAccount} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@solashi.com"
              />
            </div>
            <div>
              <label className="label">Mật khẩu</label>
              <input
                type="password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button type="button" variant="ghost" onClick={onClose}>
                Hủy
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang thêm..." : "Thêm"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
