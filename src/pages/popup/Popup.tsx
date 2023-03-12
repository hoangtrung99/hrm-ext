import { useTimekeepingToday } from "@/views/Dashboard/hooks";
import { useAuthStore } from "@src/lib/store";
import { Dashboard, Login } from "@src/views";

export default function Popup(): JSX.Element {
  // check auth from storage
  // TODO and call api validate auth
  // useValidateAuth()

  // const { data: user, isLoading } = useQuery(["storage/user"], () =>
  //   getStorage("auth-user")
  // );

  const user = useAuthStore((state) => state?.user);
  const isAuthenticated = !!user;
  useTimekeepingToday();

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full bg-slate-900">
      {isAuthenticated ? <Dashboard /> : <Login />}
    </div>
  );
}
