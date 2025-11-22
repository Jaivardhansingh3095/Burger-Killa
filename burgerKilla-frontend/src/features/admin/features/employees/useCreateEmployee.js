import { useMutation } from '@tanstack/react-query';
import { createEmployee as createEmployeeAPI } from '../../../../services/apiUser';
import toast from 'react-hot-toast';

export function useCreateEmployee() {
  const { mutate: createEmployee, status: creatingStatus } = useMutation({
    mutationFn: createEmployeeAPI,
    onSuccess: () => {},
    onError: (err) => {
      console.error(err);
      toast.error('Something went wrong!', {
        position: 'top-right',
      });
    },
  });

  return { createEmployee, creatingStatus };
}
