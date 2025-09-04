import { useMutation } from '@tanstack/react-query';
import { deleteAddress as deleteAddressAPI } from '../../services/apiUser';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateUserAddress } from '../authentication/userSlice';

export function useDeleteAddress() {
  const dispatch = useDispatch();

  const { mutate: deleteAddress, isPending: isRemoving } = useMutation({
    mutationFn: ({ addressId }) => deleteAddressAPI({ addressId }),
    onSuccess: (data) => {
      dispatch(updateUserAddress(data));
      toast.success('Address removed successfully!', {
        position: 'top-right',
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error('Error while removing address! please try again.', {
        position: 'top-right',
      });
    },
  });

  return { deleteAddress, isRemoving };
}
