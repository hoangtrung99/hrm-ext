import { addDays, addHours, endOfMonth, format, startOfMonth } from "date-fns";

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

export const startMonth = format(startOfMonth(new Date()), "yyyy/MM/dd");
export const endMonth = format(endOfMonth(new Date()), "yyyy/MM/dd");

// generate all date of current month by format yyyy/MM/dd
export const generateDateOfMonth = () => {
  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());
  const arr = [];
  for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(format(dt, "yyyy-MM-dd"));
  }
  return arr;
};
