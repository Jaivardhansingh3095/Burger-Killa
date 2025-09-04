import { useQuery } from '@tanstack/react-query';
import { getAddOnList } from '../../services/apiMenu';

export function useAddOn() {
  const {
    data: addOnItems,
    error: addOnError,
    status: addOnStatus,
  } = useQuery({
    queryKey: ['menu', 'AddOn'],
    queryFn: getAddOnList,
  });

  return { addOnItems, addOnError, addOnStatus };
}
