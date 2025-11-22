const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');

const User = require('../model/userModel');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const sendEmails = require('../util/sendEmail');

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ FORGET PASSWORD

const forgetPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  //If no user found with provided email
  if (!user) {
    return next(
      new AppError(`No account found with email: ${eq.body.email}`, 404),
    );
  }

  if (user.resetToken && user.resetTokenExpire > Date.now()) {
    return next(
      new AppError(
        `Reset token has been emailed. Please check your email box`,
        400,
      ),
    );
  }

  const resetToken = user.createResetToken();
  await user.save({ validateBeforeSave: false });

  console.log(resetToken);

  //${req.get('host')}

  const resetUrl = `${req.protocol}://localhost:5173/resetPassword/${resetToken}`;

  const message = `Forget your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}.
                  \nIf you haven't initiated password reset action, please ignore this email!`;

  try {
    await sendEmails({
      email: req.body.email,
      subject: 'Your password reset token (valid for 10 minutes)',
      message,
    });

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'Error while sending reset token. Please try again some time later.',
        500,
      ),
    );
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ RESET PASSWORD

const resetPassword = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const { token } = req.params;

  const user = await User.findOne({
    email,
    // resetTokenExpire: { $gt: Date.now() },
  }).select(
    '+password +resetToken +resetTokenExpire -orders -dob -gender -locations',
  );

  if (!user) {
    return next(new AppError('No account found', 404));
  }

  //If reset token expired
  if (user.resetTokenExpire < Date.now()) {
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'Token expired. Please try for new forget password token',
        400,
      ),
    );
  }

  const encryptedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  if (encryptedToken !== user.resetToken) {
    return next(
      new AppError(
        'Invalid token. Please create a new request from forget password',
        403,
      ),
    );
  }

  const matchPassword = await user.comparePassword(password, user.password);

  if (matchPassword) {
    return next(
      new AppError(
        'New password is same as old password. Please try with a different password',
        400,
      ),
    );
  }

  user.password = password;
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;
  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    status: 'success',
    message: 'Password Updated!',
  });
});

exports.signup = signup;
exports.login = login;
exports.protect = protect;
exports.restrictTo = restrictTo;
exports.forgetPassword = forgetPassword;
exports.resetPassword = resetPassword;

// const { authorization } = req.headers;
//   let token;
//   if (authorization && authorization.startsWith('Bearer')) {
//     token = authorization.split(' ')[1];
//   }

//Updating all documents with new fields
// await User.updateMany(
//   {},
//   { $set: { resetToken: '', resetTokenExpire: null } },
// );
