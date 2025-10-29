import { useMutation } from '@tanstack/react-query';
import { createRazorpayOrder as createRrazorpayOrderAPI } from '../../services/apiPayment';

export function useRazorpayOrder() {
  const {
    mutate: createRazorpayOrder,
    isSuccess: razorpayOrderCreated,
    isPending: razorpayOrderCreating,
    data: razorpayOrder,
  } = useMutation({
    mutationFn: ({ amount, receipt, currency, notes }) =>
      createRrazorpayOrderAPI({ amount, receipt, currency, notes }),
    onError: (err) => {
      console.error('Razorrpay Error: ', err);
    },
  });

  return {
    createRazorpayOrder,
    razorpayOrderCreating,
    razorpayOrderCreated,
    razorpayOrder,
  };
}
