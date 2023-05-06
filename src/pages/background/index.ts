console.log("background script loaded");
import { refreshTokenIfNeed } from "@/lib/utils";
import "../../lib/alarm";
import { timeKeeping, timekeepingToday } from "../../lib/alarm";

chrome.runtime.onStartup.addListener(async () => {
  refreshTokenIfNeed();
  // onStartup browser if no first timekeeping
  // then timekeeping
  const now = new Date().getDay();
  if (now === 0 || now === 6) {
    return;
  }

  const today = await timekeepingToday();
  if (!today || !today.first) {
    timeKeeping(false);
  }
});

chrome.tabs.onCreated.addListener(async () => {
  refreshTokenIfNeed();
});
