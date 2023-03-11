import { useAuthStore } from "@/lib/store";

const Settings: React.FC = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const logout = () => {
    clearAuth();
  };
  return (
    <div>
      <button className="btn btn-sm" onClick={logout}>
        Đăng xuất
      </button>
    </div>
  );
};

export { Settings };
