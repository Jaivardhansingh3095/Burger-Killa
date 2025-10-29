import { BACKEND_ADDRESS } from '../utils/helpers';

export const createRazorpayOrder = async ({
  amount,
  receipt,
  currency,
  notes,
}) => {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  const res = await fetch(`${BACKEND_ADDRESS}/payment/razorpay/order`, {
    method: 'POST',
    body: JSON.stringify({
      receipt,
      amount,
      currency,
      notes,
    }),
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
    },
  });

  const data = await res.json();

  if (data.status === 'fail' || data.status === 'error') {
    let err = new Error(data.message);
    err.status = data.status;
    err.statusCode = data.error.statusCode;
    err.stack = data.stack;
    throw err;
  }

  return data.data.order;
};
