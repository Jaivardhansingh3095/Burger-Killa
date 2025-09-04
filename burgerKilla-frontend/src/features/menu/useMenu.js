import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getMenuByCategory } from '../../services/apiMenu';

function useMenu() {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('categories') || 'burger';

  const {
    status,
    data: products,
    error,
  } = useQuery({
    queryKey: ['menu', currentCategory],
    queryFn: () => getMenuByCategory(currentCategory),
    retry: false,
  });

  return { status, products, error };
}

export default useMenu;
