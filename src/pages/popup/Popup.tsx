import { Dashboard, Login } from "@src/container";
import { getStorage } from "@src/lib";
import { useQuery } from "@tanstack/react-query";

export default function Popup(): JSX.Element {
  // check auth from storage
  // and call api validate auth

  const { data: user, isLoading } = useQuery(["storage/user"], () =>
    getStorage("user")
  );

  console.log(user);

  const isAuthenticated = !!user;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full bg-gray-800">
      {isAuthenticated ? <Dashboard /> : <Login />}
    </div>
  );
}
