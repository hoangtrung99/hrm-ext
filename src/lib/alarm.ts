// Tạo tác vụ lập lịch chạy vào 8h58 giờ sáng hàng ngày
chrome.alarms.create("morningAlarm", {
  when: getTimestamp(8, 58),
});

// Tạo tác vụ lập lịch chạy vào 6 giờ chiều hàng ngày
chrome.alarms.create("eveningAlarm", {
  when: getTimestamp(18, 0),
});

// Hàm tính toán thời điểm chạy dựa trên giờ và phút chỉ định
function getTimestamp(hour: number, minute: number) {
  const now = new Date();
  const runAt = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
    0
  );
  let delay = runAt.getTime() - now.getTime();
  if (delay < 0) {
    delay += 24 * 60 * 60 * 1000; // Nếu đã qua thời gian chạy trong ngày, đặt để chạy vào ngày hôm sau
  }
  return Date.now() + delay;
}

// Xử lý sự kiện khi tác vụ lập lịch được kích hoạt
chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === "morningAlarm") {
    // Thực hiện các hoạt động vào 8 giờ sáng
  } else if (alarm.name === "eveningAlarm") {
    // Thực hiện các hoạt động vào 18 giờ chiều
  }
});
