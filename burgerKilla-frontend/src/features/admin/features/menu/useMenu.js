import { useQuery } from '@tanstack/react-query';
import { getMenu } from '../../../../services/apiMenu';

export function useMenu() {
  const { data: menu, status: menuStatus } = useQuery({
    queryKey: ['menu'],
    queryFn: getMenu,
  });

  return { menu, menuStatus };
}
