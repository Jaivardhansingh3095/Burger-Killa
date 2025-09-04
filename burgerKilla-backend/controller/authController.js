const User = require('../model/userModel');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

//@params obj - Original object
//@params fields - array of fields which needs to be excluded
//return new object with excluded fields
// const fitlerObj = (obj, fields) => {
//   const newObj = {};

//   for (const [key, value] of Object.entries(obj)) {
//     if (!fields.includes(key)) newObj[key] = value;
//   }

//   return newObj;
// };

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIREIN,
  });
}

const sendJWTToken = (user, res, statusCode) => {
  const {
    id,
    name,
    email,
    phoneNumber,
    role,
    locations,
    homeAddress,
    dob,
    gender,
  } = user;
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: process.env.NODE_ENV === 'production', // Prevent JavaScript access in production
    secure: process.env.NODE_ENV === 'production', // Only allow cookies over HTTPS in production
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Allow cookies in cross-origin requests for production
  };

  //if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt_token', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: {
        id,
        name,
        email,
        phoneNumber,
        role,
        locations,
        homeAddress,
        dob,
        gender,
      },
    },
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ USER SIGNUP

const signup = catchAsync(async (req, res, next) => {
  const { email, password, name, phoneNumber, gender, dob } = req.body;

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
    gender,
    dob,
  });

  sendJWTToken(newUser, res, 201);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ USER LOGIN

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide your email and password', 400));
  }

  //Find user with input email
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new AppError('Incorrect email and password!', 401));
  }

  //Match input password with encrypted user password
  const matchPassword = await user.comparePassword(password, user.password);

  if (!matchPassword) {
    return next(
      new AppError('Incorrect email or password. Please try again!', 401),
    );
  }

  sendJWTToken(user, res, 200);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ PROTECTED ROUTES

const protect = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }

  // const token = req?.cookies?.jwt;

  if (!token) {
    return next(
      new AppError(
        'You are not authorized to access this route. Please login again',
        401,
      ),
    );
  }

  //Promisifying the jwt.verify as this task can take time
  const verifiedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
  );

  //Check if user exists at this current moment or not while accessing the protected routes
  const currentUser = await User.findById(verifiedToken.id);

  if (!currentUser) {
    return next(
      new AppError(
        'User with current token no longer exists. Please login with your account',
        401,
      ),
    );
  }

  //Check if user changed the password while accessing this protected route
  if (currentUser.passwordResetBeforeTokenIssue(verifiedToken.iat)) {
    return next(
      new AppError(
        'Password has been reset. Please login with your account to continue',
        401,
      ),
    );
  }

  req.user = currentUser;
  next();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ RESTRICTED ROUTES

const restrictTo = (...roles) => {
  //roles = ["admin", ]
  return (req, res, next) => {
    console.log(req.user);
    //check if roles specified in the restrictTo parameters are available on current user
    //We get the current user from Protect middleware which is applied just before this middleware
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    next();
  };
};

exports.signup = signup;
exports.login = login;
exports.protect = protect;
exports.restrictTo = restrictTo;

// const { authorization } = req.headers;
//   let token;
//   if (authorization && authorization.startsWith('Bearer')) {
//     token = authorization.split(' ')[1];
//   }
