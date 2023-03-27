console.log("background script loaded");
import { useAuthStore } from "@/lib/store";
import { handleRefreshToken } from "@/lib/utils";
import { addDays } from "date-fns";
import "../../lib/alarm";
import { timeKeeping, timekeepingToday } from "../../lib/alarm";

const refreshTokenIfNeed = async () => {
  const expiredAt = useAuthStore.getState().expires_at;

  if (expiredAt && addDays(new Date(), 1) > new Date(expiredAt)) {
    handleRefreshToken();
  }
};

chrome.runtime.onStartup.addListener(async () => {
  refreshTokenIfNeed();

  // onStartup browser if no first timekeeping
  // then timekeeping
  const today = await timekeepingToday();
  if (!today || !today.first) {
    timeKeeping(false);
  }
});
