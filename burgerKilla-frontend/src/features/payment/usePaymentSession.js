import { useQuery } from '@tanstack/react-query';
import { getPaymentSession } from '../../services/apiSession';
import { useParams } from 'react-router';

export function usePaymentSession() {
  const { sessionId } = useParams();

  const { data: paymentSession, status: sessionStatus } = useQuery({
    queryKey: ['get-payment-session'],
    queryFn: () => getPaymentSession({ sessionId }),
    retry: false,
  });

  return { paymentSession, sessionStatus };
}
