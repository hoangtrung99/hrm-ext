import { axios } from "@/lib/request";
import { useManagedAccountsStore } from "@/lib/store/managed-accounts";
import { Auth } from "@/lib/types";
import { addHoursFromSeconds } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useAddAccount = () => {
  const submit = async (data: { email: string; password: string }) => {
    const response = await axios.post<Auth>("/user/login", data);
    return response.data;
  };

  const { mutate, isLoading } = useMutation<
    Auth,
    unknown,
    { email: string; password: string }
  >(submit, {
    onSuccess(data) {
      const expires_at = addHoursFromSeconds(new Date(), data.expires_in);
      const authData = { ...data, expires_at };
      useManagedAccountsStore.getState().addAccount(authData);
      toast.success("Thêm tài khoản thành công!");
    },
    onError() {
      toast.error("Thêm tài khoản thất bại!");
    },
  });

  return {
    addAccount: mutate,
    isLoading,
  };
};
