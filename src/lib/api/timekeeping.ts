import { axios } from "../request";
import { TimekeepingData } from "../types";

export const timekeeping = () => axios.post("/user/timekeeping");

export const timekeepingByMonth = () =>
  axios.get<{ data: TimekeepingData[] }>("/user/timekeeping", {
    // params: {
    //   start_date: startMonth,
    //   end_date: endMonth,
    // },
    params: {
      start_date: "2023/08/01",
      end_date: "2023/08/31",
    },
  });
