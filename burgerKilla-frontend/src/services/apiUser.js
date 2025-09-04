const BACKEND_ADDRESS = import.meta.env.VITE_BACKEND_LINK;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function login({ email, password }) {
  const res = await fetch(`${BACKEND_ADDRESS}/user/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-type': 'application/json',
    },
  });

  //if (!res.ok) throw new Error('Incorrect email or password');

  const data = await res.json();

  if (data.status === 'fail' || data.status === 'error') {
    let err = new Error(data.message);
    err.status = data.status;
    err.statusCode = data.error.statusCode;
    err.stack = data.stack;
    throw err;
  }

  localStorage.setItem('jwt_token', data.token);

  return data.data.user;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function getCurrentUser() {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  //Fetch current user data based on saved token
  const res = await fetch(`${BACKEND_ADDRESS}/user/currentUser`, {
    method: 'GET',
    // credentials: 'include',
    // withCredentials: true,
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

  return data.data.user;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function updateUserAPI({ name, gender, dob }) {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  const res = await fetch(`${BACKEND_ADDRESS}/user/updateme`, {
    method: 'POST',
    body: JSON.stringify({ name, gender, dob }),
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

  return data.data.user;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function addAddress({
  coordinates,
  address,
  addressType,
  isDefault,
}) {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  const res = await fetch(`${BACKEND_ADDRESS}/user/addAddress`, {
    method: 'POST',
    body: JSON.stringify({
      location: { coordinates, address, addressType, isDefault },
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

  return data.data.locations;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function updateAddress({
  coordinates,
  address,
  addressType,
  isDefault,
  addressId,
}) {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  const res = await fetch(`${BACKEND_ADDRESS}/user/updateAddress`, {
    method: 'POST',
    body: JSON.stringify({
      location: { coordinates, address, addressType, isDefault, addressId },
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

  return data.data.locations;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function deleteAddress({ addressId }) {
  //If Token do not exist
  if (!localStorage.getItem('jwt_token'))
    throw new Error(
      'Your credentials expired. Please login with your credentials.',
    );

  const res = await fetch(`${BACKEND_ADDRESS}/user/deleteAddress`, {
    method: 'POST',
    body: JSON.stringify({
      addressId,
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

  return data.data.locations;
}
