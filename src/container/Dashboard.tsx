import { useAuthStore } from "@src/lib/store";

const Dashboard: React.FC = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const logout = () => {
    clearAuth();
  };

  return (
    <div className="prose lg:prose-x">
      <h1>Dashboard</h1>

      <button className="btn btn-sm" onClick={logout}>
        Đăng xuất
      </button>
    </div>
  );
};

export { Dashboard };
