import { useQuery } from "@tanstack/react-query";
import { getActiveOrders } from "../../services/apiOrder";

export function useActiveOrders() {
  const { data: activeOrders, status: activeOrderStatus } = useQuery({
    queryKey: ["activeOrder"],
    queryFn: getActiveOrders,
  });

  return { activeOrders, activeOrderStatus };
}
