import { useMutation } from '@tanstack/react-query';
import { updateUserAPI } from '../../services/apiUser';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../authentication/userSlice';

export function useUpdateUser() {
  const dispatch = useDispatch();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({ name, gender, dob }) => updateUserAPI({ name, gender, dob }),
    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: ['user'],
      // });
      // queryClient.setQueryData(['user'], data);
      dispatch(updateUserProfile(data));
      toast.success('Profile Updated Successfully!', {
        position: 'top-right',
      });
    },
    onError: (err) => {
      console.error(err.message, err.statusCode, err.stack);
      toast.error('Error Updating Profile!', {
        position: 'top-right',
      });
    },
  });

  return { updateUser, isUpdating };
}
