import { request } from "../request";

export const timekeeping = () => request.post("/user/timekeeping");
