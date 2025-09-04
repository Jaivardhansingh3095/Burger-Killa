import { useMutation } from '@tanstack/react-query';
import { updateAddress as updateAddressApi } from '../../services/apiUser';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateUserAddress } from '../authentication/userSlice';

export function useUpdateAddress() {
  const dispatch = useDispatch();

  const { mutate: updateAddress, isPending: isUpdating } = useMutation({
    mutationFn: ({ coordinates, address, isDefault, addressType, addressId }) =>
      updateAddressApi({
        coordinates,
        address,
        isDefault,
        addressType,
        addressId,
      }),
    onSuccess: (data) => {
      dispatch(updateUserAddress(data));
      toast.success('Address updated successfully!', {
        position: 'top-right',
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error('Error updating address! please try again.', {
        position: 'top-right',
      });
    },
  });

  return { updateAddress, isUpdating };
}
