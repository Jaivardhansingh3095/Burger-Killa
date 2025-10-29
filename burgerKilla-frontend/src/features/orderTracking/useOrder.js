import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getOrder } from '../../services/apiOrder';

export function useOrder() {
  const { orderId } = useParams();

  const { data: orderData, status: orderStatus } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrder({ orderId }),
    retry: false,
  });

  return { orderData, orderStatus };
}
