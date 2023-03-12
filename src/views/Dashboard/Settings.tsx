import { useAuthStore } from "@/lib/store";
import { Facebook, Github, Slack } from "lucide-react";

const Settings: React.FC = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const logout = () => {
    clearAuth();
  };
  return (
    <div>
      <div>
        <p className="prose prose-base w-full">
          Mọi ý kiến đóng góp, yêu cầu chức năng, report lỗi, vui lòng liên hệ
          <div className="w-full flex items-center justify-center ">
            <Slack size={16} />
            <span className="ml-1 prose prose-lg text-bold">hoangtrung</span>
          </div>
          <a
            href="https://www.facebook.com/hoangtrung99"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center no-underline"
          >
            <Facebook size={18} />
            <span className="ml-1 prose prose-xl text-bold">
              Nguyễn Hoàng Trung
            </span>
          </a>
          <a
            href="https://github.com/hoangtrung99/hrm-ext"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center no-underline"
          >
            <Github size={18} />
            <span className="ml-1 prose prose-xl text-bold">hrm-ext</span>
          </a>
        </p>
      </div>
      <button className="btn btn-sm" onClick={logout}>
        Đăng xuất
      </button>
    </div>
  );
};

export { Settings };
