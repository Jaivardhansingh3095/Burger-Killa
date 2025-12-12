import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '../../../../services/apiUser';

export function useEmployees() {
  const { data: employees, status: employeesStatus } = useQuery({
    queryKey: ['allEmployees'],
    queryFn: getEmployees,
  });

  return { employees, employeesStatus };
}
