export const DELIVERY_CHARGES_PER_KM = 10;
export const GST_CHARGES = 25;
export const BACKEND_ADDRESS = import.meta.env.VITE_BACKEND_LINK;
export const RAZORPAY_CHECKOUT_ADDRESS =
  'https://checkout.razorpay.com/v1/checkout.js';
export const ADMIN = 'admin';
export const MANAGER = 'manager';
export const STAFF = 'STAFF';

export const PERMITTED_ROLES = ['admin', 'manager'];

export const FOODTYPE = [
  {
    label: 'Veg',
    value: 'veg',
  },
  {
    label: 'Non-Veg',
    value: 'non-veg',
  },
];

export const GENDERTYPE = [
  { value: 'male', label: 'male' },
  { value: 'female', label: 'female' },
  { value: 'other', label: 'other' },
];

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phonePattern = /^(?:\+91|91|0)?[6-9]\d{9}$/;

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'INR' }).format(
    value,
  );

export const camelCaseName = (str) => {
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};

export const dateValidation = (value) => {
  const date1 = new Date('1900-01-01');
  const date2 = new Date('2015-01-01');
  const date = new Date(value);

  return date.getTime() > date1.getTime() && date.getTime() < date2.getTime();
};
