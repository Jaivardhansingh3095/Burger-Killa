import { useMutation } from '@tanstack/react-query';
import { invalidatePaymentSession } from '../../services/apiSession';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export function useInvalidateSession() {
  const navigate = useNavigate();
  const { mutate: invalidateSession, status: invalidateStatus } = useMutation({
    mutationFn: ({ sessionId, status }) =>
      invalidatePaymentSession({ sessionId, status }),
    onSuccess: () => {
      toast.error(
        'Session expired. You may complete the payment with new session',
      );
      navigate(-1, { replace: true });
    },
  });

  return { invalidateSession, invalidateStatus };
}
