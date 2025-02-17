import { fetchIp } from "@/lib/utils/hash";
import { useQuery } from "@tanstack/react-query";

export const useCurrentIP = () => {
  return useQuery(["current-ip"], fetchIp, {
    staleTime: 1000 * 60 * 60 * 24,
  });
};
