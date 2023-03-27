import { axios } from "../request";

export const timekeeping = () => axios.post("/user/timekeeping");
