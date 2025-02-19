import { timekeeping } from "@/lib/api";
import { useTimekeepingStore } from "@/lib/store";
import { UTCtoGTM7 } from "@/lib/utils";
import { encryptData } from "@/lib/utils/hash";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import debounce from "lodash.debounce";
import { Info } from "lucide-react";
import { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";

const Timekeeping: React.FC = () => {
  const { isAuto, update } = useTimekeepingStore((state) => ({
    isAuto: state.isAutoTimekeeping,
    update: state.updateIsAutoTimekeeping,
  }));

  const queryClient = useQueryClient();

  const { mutate } = useMutation(timekeeping, {
    onSuccess() {
      queryClient.invalidateQueries(["timekeeping-today"]);
      toast.success("Chấm công thành công!");
    },
    onError() {
      toast.error("Chấm công thất bại!");
    },
  });

  const debounceMutate = useMemo(
    () =>
      debounce(async () => {
        const ip_v4 =
          queryClient.getQueryData(["current-ip"]) ||
          import.meta.env.VITE_FALLBACK_SOLASHI_IP;

        const value = {
          ip_v4: ip_v4,
          date_time: format(new Date(), "yyyy/MM/dd HH:mm:ss"),
          type: null,
        };

        const hash = await encryptData(value);

        mutate({ hash, ...value });
      }, 200),
    [mutate]
  );

  return (
    <div>
      <div className="form-control flex flex-row justify-start items-center">
        <label className="label justify-start items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isAuto}
            onChange={(e) => update(e.target.checked)}
            className="checkbox checkbox-primary mr-2"
          />
          <span className="prose-base">Tự động chấm công (beta)</span>
        </label>

        <Tooltip.Provider delayDuration={0}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Info size={16} className="cursor-pointer" />
            </Tooltip.Trigger>

            <Tooltip.Portal>
              <Tooltip.Content
                side="left"
                className="w-[200px] bg-info-content rounded-sm p-1.5"
                sideOffset={5}
              >
                <p className="prose-xs text-bold text-white">
                  Chức năng tự động chấm công hoạt động dựa trên nguyên lý lập
                  lịch
                </p>
                <p className="prose-xs text-bold text-white">
                  Extension sẽ tự động chấm công vào 8:58 AM và 6:00 PM
                </p>
                <p className="prose-xs text-bold text-white">
                  Sẽ có chức năng tuỳ chỉnh lịch chấm công
                </p>
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>

      <button
        className="btn btn-active btn-secondary mt-2"
        onClick={debounceMutate as () => void}
      >
        Chấm công
      </button>

      <TimekeepingState />
    </div>
  );
};

export { Timekeeping };

function TimekeepingState() {
  const state = useTimekeepingStore();

  const isLoading = !state.first && !state.last;

  useEffect(() => {
    // handler event from service worker
    const handleMessage = (message: {
      payload: { first: string; last: string };
      type: string;
    }) => {
      if (message.type === "UPDATE_TIMEKEEPING") {
        const { first, last } = message.payload;
        useTimekeepingStore.setState({ first, last });
      }
    };

    // register listener
    chrome.runtime.onMessage.addListener(handleMessage);

    // remove listener when component unmount
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  if (!state.first) {
    return (
      <h4 className="mt-4 mb-0 prose-headings:h5">
        Hôm nay bạn chưa chấm công
      </h4>
    );
  }

  return isLoading ? (
    <span className="loading loading-infinity loading-xs"></span>
  ) : (
    <div>
      <h4 className="mt-4 mb-0 prose-headings:h5">Hôm nay bạn đã chấm công</h4>
      <div className="flex flex-col">
        <span className="prose-base font-medium mt-1">Giờ vào: </span>
        <span className="prose-lg font-bold text-secondary">
          {format(UTCtoGTM7(new Date(state.first)), "HH:mm:ss")}
        </span>
        <span className="prose-base font-medium mt-1">Giờ ra:</span>
        <span className="prose-lg font-bold text-secondary">
          {state.last &&
            format(UTCtoGTM7(new Date(state.last as string)), "HH:mm:ss")}
        </span>
      </div>
    </div>
  );
}
