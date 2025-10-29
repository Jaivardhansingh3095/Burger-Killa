import { useQuery } from '@tanstack/react-query';
import { getTopProducts } from '../../services/apiMenu';

export function useTopProducts() {
  const { data: topProducts, status } = useQuery({
    queryKey: ['top-products'],
    queryFn: () => getTopProducts(),
    retry: false,
  });

  return { topProducts, status };
}
