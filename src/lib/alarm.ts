import { format } from "date-fns";
import logger from "./logger";
import { createFetchRequest } from "./request";
import { getStorage, STORAGE_KEYS } from "./storage";
import { useAuthStore, useTimekeepingStore } from "./store";
import { encryptData } from "./utils/hash";

// Tạo tác vụ lập lịch chạy vào 8h58 giờ sáng hàng ngày
chrome.alarms.create("morningAlarm", {
  when: getTimestamp(8, 58),
  periodInMinutes: 1440, // 24 hours
});

// Tạo tác vụ lập lịch chạy vào 6 giờ chiều hàng ngày
chrome.alarms.create("eveningAlarm", {
  when: getTimestamp(18, 0),
  periodInMinutes: 1440, // 24 hours
});

// Hàm tính toán thời điểm chạy dựa trên giờ và phút chỉ định
function getTimestamp(hour: number, minute: number) {
  const now = new Date();
  const alarm = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
    0,
    0
  );
  if (alarm <= now) {
    alarm.setDate(alarm.getDate() + 1);
  }
  return alarm.getTime();
}

let retryTimekeeping = 0;

export const timeKeeping = async (needCheckAuto = true) => {
  const isAuto = Boolean(await getStorage(STORAGE_KEYS.TIMEKEEPING));

  if (needCheckAuto) {
    if (!isAuto) {
      logger("isn't auto timekeeping");
      return;
    }
  }

  safeTimekeeping();
};

// Xử lý sự kiện khi tác vụ lập lịch được kích hoạt
chrome.alarms.onAlarm.addListener(async function (alarm) {
  // check nếu là thứ 7 hoặc chủ nhật thì không thực hiện
  const today = new Date().getDay();
  if (today === 0 || today === 6) {
    return;
  }

  if (alarm.name === "morningAlarm") {
    // Thực hiện các hoạt động vào 8 giờ sáng
    logger("morningAlarm");
    const today = await timekeepingToday();
    const first = today?.first;

    if (!first) {
      timeKeeping();
    }
  } else if (alarm.name === "eveningAlarm") {
    // Thực hiện các hoạt động vào 18 giờ chiều
    logger("eveningAlarm");
    timeKeeping();
  }
});

export const timekeepingToday = async () => {
  try {
    const res = await createFetchRequest("/user/timekeeping/today", "GET");
    const data = await res.json();

    const storeFirst = useTimekeepingStore.getState().first;
    const storeLast = useTimekeepingStore.getState().last;
    if (data.first !== storeFirst || data.last !== storeLast) {
      // emit event from service worker
      chrome.runtime.sendMessage({
        type: "UPDATE_TIMEKEEPING",
        payload: { first: data.first, last: data.last },
      });
    }

    return data;
  } catch (error) {
    logger("Get timekeeping today failed");
    if ((error as Response).status === 401) {
      useAuthStore.getState().clearAuth();
    }
  }
};

const safeTimekeeping = async () => {
  try {
    const ip_v4 = import.meta.env.VITE_FALLBACK_SOLASHI_IP;
    const value = {
      ip_v4: ip_v4,
      date_time: format(new Date(), "yyyy/MM/dd HH:mm:ss"),
      type: null,
    };

    const hash = await encryptData(value);

    await createFetchRequest("/user/timekeeping?hash=" + hash, "POST", value);
    await timekeepingToday();
  } catch (error) {
    if ((error as Response).status === 401) {
      retryTimekeeping = 0;
      return;
    }

    if (retryTimekeeping < 3) {
      retryTimekeeping++;
      logger("Timekeeping failed, retrying...");
      safeTimekeeping();
    } else {
      retryTimekeeping = 0;
      logger("Timekeeping failed, retrying failed");
    }
  }
};
