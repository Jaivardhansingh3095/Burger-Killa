import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct as addProductAPI } from '../../../../services/apiMenu';
import toast from 'react-hot-toast';

export function useAddProduct() {
  const queryClient = useQueryClient();
  const { mutate: addProduct, status: addingStatus } = useMutation({
    mutationFn: ({ payload }) => addProductAPI({ payload }),
    onSuccess: () => {
      //   queryClient.setQueryData(['menu'], (oldData) => {
      //     if (!oldData) return oldData;

      //     return oldData.push({
      //       ...data.newItem,
      //       imgUrl: data.imgUrl,
      //       imgUrlSmall: data.imgUrlSmall,
      //     });
      //   });
      queryClient.invalidateQueries(['menu']);
      toast.success('Product added!', {
        position: 'top-right',
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error('Something went wrong!', {
        position: 'top-right',
      });
    },
  });

  return { addProduct, addingStatus };
}
