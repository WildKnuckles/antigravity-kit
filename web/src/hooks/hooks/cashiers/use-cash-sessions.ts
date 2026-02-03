import { useQuery } from "@tanstack/react-query";
import { cashSessionsService } from "@/services/cash-sessions-service";
import { CashSessionFilters } from "@/types/cash-sessions";

export function useGetOpeningRequests(filters?: CashSessionFilters) {
  return useQuery({
    queryKey: ["opening-requests", filters],
    queryFn: () => cashSessionsService.getOpeningRequests(filters),
  });
}
