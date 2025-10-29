const Razorpay = require('razorpay');

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_SECRET_KEY = process.env.RAZORPAY_SECRET_KEY;

const RAZORPAY_CREATE_ORDER_API = 'https://api.razorpay.com/v1/orders';

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_SECRET_KEY,
});

exports.razorpay = razorpay;
exports.RAZORPAY_CREATE_ORDER_API = RAZORPAY_CREATE_ORDER_API;
