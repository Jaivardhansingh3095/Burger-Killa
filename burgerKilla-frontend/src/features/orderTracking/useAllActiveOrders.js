import { useQuery } from "@tanstack/react-query";
import { getActiveOrders } from "../../services/apiOrder";

export function useAllActiveOrders() {
  const { data: totalOrders, status: totalOrdersStatus } = useQuery({
    queryKey: ["all-active-orders"],
    queryFn: getActiveOrders,
  });

  return { totalOrders, totalOrdersStatus };
}
