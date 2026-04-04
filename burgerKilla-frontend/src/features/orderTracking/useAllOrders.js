import { useQuery } from "@tanstack/react-query";
import { getActiveUserOrders } from "../../services/apiOrder";

export function useAllOrders() {
  const { data: totalOrders, status: totalOrdersStatus } = useQuery({
    queryKey: ["all-orders"],
    queryFn: getActiveUserOrders,
  });

  return { totalOrders, totalOrdersStatus };
}
