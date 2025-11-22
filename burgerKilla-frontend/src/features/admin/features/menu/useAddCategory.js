import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCategory as addCategoryAPI } from '../../../../services/apiCategory';

import toast from 'react-hot-toast';

export function useAddCategory() {
  const queryClient = useQueryClient();
  const { mutate: addCategory, status: categoryStatus } = useMutation({
    mutationFn: ({ category }) => addCategoryAPI({ category }),
    onSuccess: (data) => {
      queryClient.setQueryData(['categories'], (oldData) => {
        if (!oldData) return oldData;
        return [...oldData, data];
      });

      toast.success('Category added!', {
        position: 'top-right',
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error('Something went wrong. Check if category already existed.', {
        position: 'top-right',
      });
    },
  });

  return { addCategory, categoryStatus };
}
