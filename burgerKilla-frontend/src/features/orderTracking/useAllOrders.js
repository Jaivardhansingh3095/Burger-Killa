import { useQuery } from '@tanstack/react-query';
import { getAllUserOrders } from '../../services/apiOrder';

export function useAllOrders() {
  const { data: totalOrders, status: totalOrdersStatus } = useQuery({
    queryKey: ['all-orders'],
    queryFn: () => getAllUserOrders(),
  });

  return { totalOrders, totalOrdersStatus };
}
