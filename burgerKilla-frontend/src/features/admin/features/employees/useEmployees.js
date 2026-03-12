import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '../../../../services/apiUser';
import { useSearchParams } from 'react-router';

export function useEmployees() {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || '';

  const {
    data: employees,
    status: employeesStatus,
    refetch,
  } = useQuery({
    queryKey: ['allEmployees', { sortField }],
    queryFn: () => getEmployees({ sortField }),
  });

  return { employees, employeesStatus, refetch };
}
