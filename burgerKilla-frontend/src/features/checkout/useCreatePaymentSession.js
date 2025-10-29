import { useMutation } from '@tanstack/react-query';
import { createPaymentSession } from '../../services/apiSession';

export const useCreatePaymentSession = () => {
  const {
    mutate: createSession,
    isPending: isCreating,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: ({ sessionId, amount }) =>
      createPaymentSession({ sessionId, amount }),
    onError: (err) => {
      console.error(err);
    },
  });

  return { createSession, isCreating, isError, isSuccess };
};
