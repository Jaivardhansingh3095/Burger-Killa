import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../../../../services/apiMenu';
import toast from 'react-hot-toast';

export function useRemoveProduct() {
  const queryClient = useQueryClient();
  const { mutate: removeProduct, status: removeStatus } = useMutation({
    mutationFn: ({ productId }) => deleteProduct({ productId }),
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(['menu'], (oldData) => {
        if (!oldData) return oldData;
        console.log(oldData);
        return oldData.filter((product) => product._id !== data._id);
      });

      toast.success('Product removed', { position: 'top-right' });
    },
    onError: (err) => {
      console.error(err);
      toast.error('Something went wrong');
    },
  });

  return { removeProduct, removeStatus };
}
