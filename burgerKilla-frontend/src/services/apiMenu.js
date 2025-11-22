const BACKEND_ADDRESS = import.meta.env.VITE_BACKEND_LINK;

export async function getMenu() {
  try {
    const res = await fetch(`${BACKEND_ADDRESS}/menu`);

    if (!res.ok) throw new Error('Check your connection!');

    const data = await res.json();

    const menu = data.data.newMenu;

    return menu;
  } catch (err) {
    console.error(err);
    return err;
  }
}

//@params - category - type of menu category
//return menu data with particular category
export async function getMenuByCategory(category) {
  try {
    const res = await fetch(`${BACKEND_ADDRESS}/menu?categories=${category}`);

    if (!res.ok) throw new Error('Check your connection!');

    const data = await res.json();

    const menu = data.data.newMenu;

    return menu;
  } catch (err) {
    console.error(err);
    return err;
  }
}

//return data with addon items list
export async function getAddOnList() {
  try {
    const res = await fetch(`${BACKEND_ADDRESS}/menu/addon`);

    if (!res.ok) throw new Error('Check your connection!');

    const data = await res.json();

    return data?.data?.addOnList;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export const getTopProducts = async () => {
  try {
    const res = await fetch(`${BACKEND_ADDRESS}/menu/topSixProducts`);

    if (!res.ok) throw new Error('Check your connection!');

    const data = await res.json();

    const { products } = data.data;

    return products;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getCategories = async () => {
  try {
    const res = await fetch(`${BACKEND_ADDRESS}/menu/categories`);

    if (!res.ok) throw new Error('Check your connection!');

    const data = await res.json();

    const { categories } = data.data;

    return categories;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export async function addCategory({ category }) {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  const res = await fetch(`${BACKEND_ADDRESS}/menu/categories`, {
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

  return data.data.categories;
}

export async function addProduct({ payload }) {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  const res = await fetch(`${BACKEND_ADDRESS}/menu`, {
    method: 'POST',
    body: payload,
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

  return data.data.product;
}

export async function updateProduct({ payload, productId }) {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  const res = await fetch(`${BACKEND_ADDRESS}/menu/${productId}`, {
    method: 'PATCH',
    body: payload,
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

  return data.data.product;
}

export async function deleteProduct({ productId }) {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  const res = await fetch(`${BACKEND_ADDRESS}/menu/${productId}`, {
    method: 'DELETE',
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

  return data.data.product;
}
