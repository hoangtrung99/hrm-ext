import { timekeeping } from "./api";
import logger from "./logger";
import { getStorage, STORAGE_KEYS } from "./storage";

// Tạo tác vụ lập lịch chạy vào 8h58 giờ sáng hàng ngày
chrome.alarms.create("morningAlarm", {
  when: getTimestamp(8, 58),
  periodInMinutes: 1440, // 24 hours
});

// Tạo tác vụ lập lịch chạy vào 6 giờ chiều hàng ngày
chrome.alarms.create("eveningAlarm", {
  when: getTimestamp(19, 4),
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

const safeTimekeeping = async () => {
  const isAuto = await getStorage(STORAGE_KEYS.TIMEKEEPING);
  if (!isAuto) {
    logger("isn't auto timekeeping");
    return;
  }

  try {
    await timekeeping();
    // await fetch("/user/timekeeping", {

    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": "Bearer " + token
    //   }
    // })
    //   .then(response => {
    //     // Check if the request was successful
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json(); // Parse the response as JSON
    //   })
  } catch (error) {
    console.log(error);
    if (retryTimekeeping < 3) {
      retryTimekeeping++;
      safeTimekeeping();
    } else {
      retryTimekeeping = 0;
    }
  }
};

// Xử lý sự kiện khi tác vụ lập lịch được kích hoạt
chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === "morningAlarm") {
    // Thực hiện các hoạt động vào 8 giờ sáng
    logger("morningAlarm");
    safeTimekeeping();
  } else if (alarm.name === "eveningAlarm") {
    // Thực hiện các hoạt động vào 18 giờ chiều
    logger("eveningAlarm");
    safeTimekeeping();
  }
});
