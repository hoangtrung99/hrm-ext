import { addDays, addHours, format } from "date-fns";

export const dayMapping = {
  0: "Chủ nhật",
  1: "Thứ hai",
  2: "Thứ ba",
  3: "Thứ tư",
  4: "Thứ năm",
  5: "Thứ sáu",
  6: "Thứ bảy",
};

export const UTCtoGTM7 = (date: Date) => {
  return addHours(date, 7);
};

export const addDaysFromSeconds = (date: Date, seconds: number) => {
  return format(addDays(date, seconds / (24 * 60 * 60)), "yyyy-MM-dd HH:mm:ss");
};
