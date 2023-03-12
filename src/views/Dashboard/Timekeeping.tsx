import { timekeeping } from "@/lib/api";
import { useTimekeepingStore } from "@/lib/store";
import { UTCtoGTM7 } from "@/lib/utils";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import debounce from "lodash.debounce";
import { Info } from "lucide-react";
import { useMemo } from "react";
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

  const debounceMutate = useMemo(() => debounce(mutate, 200), [mutate]);

  return (
    <div>
      <div className="form-control flex flex-row justify-start items-center">
        <label className="label justify-start items-center cursor-pointer">
          <input
            disabled
            type="checkbox"
            checked={isAuto}
            onChange={(e) => update(e.target.checked)}
            className="checkbox checkbox-primary mr-2"
          />
          <span className="prose-base">Tự động chấm công (coming soon)</span>
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

  if (!state.first) {
    return (
      <h4 className="mt-4 mb-0 prose-headings:h5">
        Hôm nay bạn chưa chấm công
      </h4>
    );
  }

  return (
    <div>
      <h4 className="mt-4 mb-0 prose-headings:h5">Hôm nay bạn đã chấm công</h4>
      <div className="flex flex-col">
        <span className="prose-base font-medium mt-1">Giờ vào: </span>
        <span className="prose-lg font-bold text-secondary">
          {format(UTCtoGTM7(new Date(state.first)), "HH:mm:ss")}
        </span>
        <span className="prose-base font-medium mt-1">Giờ ra:</span>
        <span className="prose-lg font-bold text-secondary">
          {format(UTCtoGTM7(new Date(state.last as string)), "HH:mm:ss")}
        </span>
      </div>
    </div>
  );
}
