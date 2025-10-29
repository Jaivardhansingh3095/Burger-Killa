import { BACKEND_ADDRESS } from '../utils/helpers';

export const createPaymentSession = async ({ sessionId, amount }) => {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  const res = await fetch(`${BACKEND_ADDRESS}/pay/`, {
    method: 'POST',
    body: JSON.stringify({
      sessionId,
      amount,
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

  return data.data.paymentSession;
};

///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

export const getPaymentSession = async ({ sessionId }) => {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  const res = await fetch(`${BACKEND_ADDRESS}/pay/${sessionId}`, {
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

  return data.data.currentPaymentSession;
};

///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

export const closePaymentSession = async ({ sessionId, status, orderId }) => {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  const res = await fetch(`${BACKEND_ADDRESS}/pay/${sessionId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      status,
      orderId,
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

  return data.data.paymentSession;
};

///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

export const invalidatePaymentSession = async ({ sessionId, status }) => {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  const res = await fetch(`${BACKEND_ADDRESS}/pay/${sessionId}/invalidate`, {
    method: 'PATCH',
    body: JSON.stringify({
      status,
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

  return data.status;
};
