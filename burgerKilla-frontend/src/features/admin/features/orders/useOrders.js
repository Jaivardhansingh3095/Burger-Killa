import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getAllUserOrders } from "../../../../services/apiOrder";

export function useOrders() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "active";

  const {
    data: orders,
    status: ordersStatus,
    refetch: ordersRefetch,
  } = useQuery({
    queryKey: [`orders-${status}`],
    queryFn: () => getAllUserOrders({ status }),
    retry: 1,
    // staleTime: 1000 * 60 * 2,
    // initialData: [],
  });

  return { orders, ordersStatus, ordersRefetch };
}
