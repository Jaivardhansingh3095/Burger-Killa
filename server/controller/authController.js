const User = require('../model/userModel');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const jwt = require('jsonwebtoken');

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIREIN,
  });
}

const sendJWTToken = (user, res, statusCode) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ USER SIGNUP

const signup = catchAsync(async (req, res, next) => {
  const { email, password, name, phoneNumber } = req.body;

  if (!email || !password || !name || !phoneNumber) {
    return next(
      new AppError(
        'Please provide all your credentials: name, email, phoneNumber and password',
        400,
      ),
    );
  }

  const newUser = await User.create({
    name,
    email,
    phoneNumber,
    password,
  });

  sendJWTToken(newUser, res, 201);
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide your email and password', 400));
  }

  const user = await User.findOne({ email })
    .where('active')
    .equals(false)
    .select('+password');
});

exports.signup = signup;
