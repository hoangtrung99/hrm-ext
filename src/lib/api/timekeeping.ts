import { axios } from "../request";
import { TimekeepingData } from "../types";
import { endMonth, startMonth } from "../utils";

export const timekeeping = () => axios.post("/user/timekeeping");

export const timekeepingByMonth = () =>
  axios.get<{ data: TimekeepingData[] }>("/user/timekeeping", {
    params: {
      start_date: startMonth,
      end_date: endMonth,
    },
  });
