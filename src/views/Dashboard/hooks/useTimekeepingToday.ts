import { request } from "@/lib/request";
import { useAuthStore, useTimekeepingStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";

type TimeKeepingResult = {
  first: string | null;
  last: string | null;
};

export const useTimekeepingToday = () => {
  useQuery<TimeKeepingResult>(
    ["timekeeping-today"],
    async () => {
      const res = await request.get<TimeKeepingResult>(
        "/user/timekeeping/today"
      );
      return res.data;
    },
    {
      onSuccess(data) {
        useTimekeepingStore.setState(data);
      },
      enabled: !!useAuthStore.getState()?.access_token,
    }
  );
};
