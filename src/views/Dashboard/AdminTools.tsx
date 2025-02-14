import { useAuthStore } from "@/lib/store";
import { toast } from "react-hot-toast";

const AdminTools: React.FC = () => {
  const { access_token, refresh_token } = useAuthStore();

  const copyAccessToken = () => {
    navigator.clipboard.writeText(access_token || "");
    toast.success("Copy thành công!");
  };

  const copyRefreshToken = () => {
    navigator.clipboard.writeText(refresh_token || "");
    toast.success("Copy thành công!");
  };

  return (
    <div>
      <h2>Tools</h2>

      <div className="indicator">
        <span className="indicator-item badge badge-secondary">
          Coming soon
        </span>
        <button
          className="btn btn-primary btn-sm mb-2 w-[250px] btn-disabled"
          disabled
        >
          {/* {(isLoading || dataHandling) && (
            <span className="loading loading-infinity loading-xs"></span>
          )} */}
          Đăng nhập nhiều tài khoản
        </button>
      </div>

      <button
        className="btn btn-outline btn-primary btn-sm mb-2 w-[250px]"
        onClick={copyAccessToken}
      >
        Copy access token
      </button>
      <button
        className="btn btn-outline btn-neutral btn-sm w-[250px]"
        onClick={copyRefreshToken}
      >
        Copy refresh token
      </button>
    </div>
  );
};

export { AdminTools };
