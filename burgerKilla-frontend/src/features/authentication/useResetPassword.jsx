import { useMutation } from '@tanstack/react-query';
import { MdPassword } from 'react-icons/md';
import { resetPassword as resetPasswordAPI } from '../../services/apiUser';
import toast from 'react-hot-toast';

export function useResetPassword() {
  const {
    mutate: resetPassword,
    isPending: isResetting,
    isSuccess,
  } = useMutation({
    mutationFn: ({ email, password, token }) =>
      resetPasswordAPI({ email, password, token }),
    onSuccess: (data) => {
      toast.success(data.message, {
        position: 'top-right',
      });
    },
    onError: (err) => {
      console.error(err);

      toast.error(err.message, {
        position: 'top-right',
      });
    },
  });

  return { resetPassword, isResetting, isSuccess };
}
