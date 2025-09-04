import { useMutation } from '@tanstack/react-query';
import { addAddress as addAddressApi } from '../../services/apiUser';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addUserAddress } from '../authentication/userSlice';

export function useAddAddress() {
  const dispatch = useDispatch();

  const { mutate: addAddress, isPending: isAdding } = useMutation({
    mutationFn: ({ coordinates, address, isDefault, addressType }) =>
      addAddressApi({ coordinates, address, isDefault, addressType }),
    onSuccess: (data) => {
      dispatch(addUserAddress(data));
      toast.success('Address added successfully!', {
        position: 'top-right',
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error('Error adding address! please try again.', {
        position: 'top-right',
      });
    },
  });

  return { addAddress, isAdding };
}
