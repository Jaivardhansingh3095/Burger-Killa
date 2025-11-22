import { BACKEND_ADDRESS } from '../utils/helpers';

export async function getCategories() {
  try {
    const res = await fetch(`${BACKEND_ADDRESS}/category`);

    if (!res.ok) throw new Error('Check your connection!');

    const data = await res.json();

    const { categories } = data.data;

    return categories;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function addCategory({ category }) {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  const res = await fetch(`${BACKEND_ADDRESS}/category`, {
    method: 'POST',
    body: JSON.stringify({ category }),
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

  return data.data.category;
}
