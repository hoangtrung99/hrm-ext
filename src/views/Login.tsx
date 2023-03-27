import { Footer } from "@/components/Footer";
import { addDaysFromSeconds } from "@/lib/utils";
import { axios } from "@src/lib/request";
import { useAuthStore } from "@src/lib/store";
import { Auth } from "@src/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const submit = async () => {
    const response = await axios.post("/user/login", {
      email,
      password,
    });

    return response.data;
  };

  const { mutate, isLoading } = useMutation<Auth>(submit, {
    onSuccess(data) {
      // setStorage(STORAGE_KEYS.AUTH_USER, data);
      const expires_at = addDaysFromSeconds(new Date(), data.expires_in);
      useAuthStore.setState({ ...data, expires_at });
      toast.success("Đăng nhập thành công!");
    },
    onError() {
      toast.error("Đăng nhập thất bại!");
    },
  });

  return (
    <div className="w-full h-full relative">
      <div className="prose lg:prose-xl pt-10 px-3 flex flex-col">
        <h1 className="prose-headings:h1">HRM</h1>

        <label htmlFor="email" className="label label-text py-1">
          Email
        </label>
        <input
          name="email"
          type="text"
          onChange={handleChange}
          placeholder="trungnh@solashi.com"
          className="input input-bordered w-full mb-4 text-white"
        />

        <label htmlFor="email" className="label label-text py-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="input input-bordered w-full text-white"
        />

        <button
          onClick={mutate as () => void}
          className={`btn btn-primary mt-6 ${isLoading ? "btn-disabled" : ""}`}
        >
          Đăng nhập
        </button>

        <h4>Make HRM great again!</h4>
      </div>

      <Footer />

      {isLoading && (
        <progress className="progress w-full rounded-none absolute bottom-0 right-0 progress-primary" />
      )}
    </div>
  );
};

export { Login };
