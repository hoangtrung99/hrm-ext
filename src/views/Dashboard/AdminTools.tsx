import { timekeepingByMonth } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { getTimekeepingOfMonth } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";

const AdminTools: React.FC = () => {
  const { access_token, refresh_token } = useAuthStore();
  const [dataHandling, setDataHanding] = useState(false);

  const { data, isLoading } = useQuery(
    ["timekeeping-month"],
    timekeepingByMonth
  );

  const copyAccessToken = () => {
    navigator.clipboard.writeText(access_token || "");
    toast.success("Copy thành công!");
  };

  const copyRefreshToken = () => {
    navigator.clipboard.writeText(refresh_token || "");
    toast.success("Copy thành công!");
  };

  const copyTimeKeeping = () => {
    if (!data) return;
    console.log(data);
    console.log(1111, getTimekeepingOfMonth(data.data.data));
  };

  return (
    <div>
      <h2>Tools</h2>

      <div className="indicator">
        <span className="indicator-item badge badge-secondary">New</span>
        <button
          className="btn btn-primary btn-sm mb-2 w-[250px]"
          onClick={copyTimeKeeping}
        >
          {(isLoading || dataHandling) && (
            <span className="loading loading-infinity loading-xs"></span>
          )}
          Copy timekeeping
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
