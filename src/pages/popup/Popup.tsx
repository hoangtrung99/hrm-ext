import { Dashboard, Login } from "@src/container";
import { useAuthStore } from "@src/lib/store";

export default function Popup(): JSX.Element {
  // check auth from storage
  // and call api validate auth

  // const { data: user, isLoading } = useQuery(["storage/user"], () =>
  //   getStorage("auth-user")
  // );

  const user = useAuthStore((state) => state?.user);
  const isAuthenticated = !!user;

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full bg-gray-800">
      {isAuthenticated ? <Dashboard /> : <Login />}
    </div>
  );
}
