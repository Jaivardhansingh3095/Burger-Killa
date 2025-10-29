import { useMutation } from '@tanstack/react-query';
import { forgetPassword as forgetPasswordAPI } from '../../services/apiUser';
import toast from 'react-hot-toast';

export function useForgetPassword() {
  const { mutate: forgetPassword, isPending } = useMutation({
    mutationFn: ({ email }) => forgetPasswordAPI({ email }),
    onSuccess: () => {
      toast.success(
        'Request sent. Please check your email for password recovery link.',
        {
          position: 'top-right',
        },
      );
    },
    onError: (err) => {
      console.error(err);
      toast.error('Error while sending email', {
        position: 'top-right',
      });
    },
  });

  return { forgetPassword, isPending };
}
