import { BACKEND_ADDRESS } from '../utils/helpers';

export const createOrder = async ({
  orderItems,
  deliveryAddress,
  paymentSession,
  deliveryTime,
  totalAmount,
  discount,
  gst,
  deliveryFee,
  tip,
  notes,
  isPaid,
  orderSource,
}) => {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  const res = await fetch(`${BACKEND_ADDRESS}/order`, {
    method: 'POST',
    body: JSON.stringify({
      orderItems,
      deliveryAddress,
      paymentSession,
      totalAmount,
      discount,
      gst,
      deliveryFee,
      tip,
      notes,
      isPaid,
      orderSource,
      deliveryTime,
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

////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export const getOrder = async ({ orderId }) => {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  const res = await fetch(`${BACKEND_ADDRESS}/order/${orderId}`, {
    method: 'GET',
    headers: {
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

////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export const getAllUserOrders = async () => {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  const res = await fetch(`${BACKEND_ADDRESS}/order/`, {
    method: 'GET',
    headers: {
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

  return data.data.orders;
};
