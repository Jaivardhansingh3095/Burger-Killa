import { useQuery } from "@tanstack/react-query";
import { getCompletedOrders } from "../../services/apiOrder";

export function useCompletedOrders() {
  const { data: completedOrders, status: completedOrdersStatus } = useQuery({
    queryKey: ["completedOrders"],
    queryFn: getCompletedOrders,
  });

  return { completedOrders, completedOrdersStatus };
}
