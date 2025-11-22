import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct as updateProductAPI } from '../../../../services/apiMenu';
import toast from 'react-hot-toast';

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { mutate: updateProduct, status: updateStatus } = useMutation({
    mutationFn: ({ payload, productId }) =>
      updateProductAPI({ payload, productId }),
    onSuccess: (updatedItem) => {
      queryClient.setQueryData(['menu'], (oldData) => {
        if (!oldData) return oldData;

        const { newItem, imgUrl, imgUrlSmall } = updatedItem;
        return oldData.map((product) =>
          product._id === newItem._id
            ? { ...newItem, imgUrl, imgUrlSmall }
            : product,
        );
      });

      //queryClient.invalidateQueries(['menu']);

      toast.success('Product updated successfully!', {
        position: 'top-right',
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error('Something went wrong!', { position: 'top-right' });
    },
  });

  return { updateProduct, updateStatus };
}
