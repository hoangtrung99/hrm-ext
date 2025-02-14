import { axios } from "../request";
import { TimekeepingData } from "../types";
import { endMonth, startMonth } from "../utils";

export const timekeeping = (payload: { hash: string }) => {
  const { hash, ...rest } = payload;
  return axios.post("/user/timekeeping?hash=" + hash, {
    ...rest,
  });
};

export const timekeepingByMonth = () =>
  axios.get<{ data: TimekeepingData[] }>("/user/timekeeping", {
    params: {
      start_date: startMonth,
      end_date: endMonth,
    },
  });
