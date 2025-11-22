const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User must provide their full name'],
      minLength: [5, 'User name must more than 5 characters'],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide a valid email'],
      lowercase: true,
      trim: true,
      match: [
        /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
        'Please provide a valid email',
      ],
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: [true, 'please provide a valid and unique phone number'],
      match: [
        /^[0-9]{10}$/,
        'Phone number should be of 10 digit with no special characters',
      ],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Account must have a password'],
      select: false,
      minLength: 8,
      trim: true,
    },
    passwordChangedAt: {
      type: Date,
      default: null,
    },
    resetToken: {
      type: String,
      select: false,
    },
    resetTokenExpire: {
      type: Date,
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'manager', 'staff', 'admin', 'delivery'],
        message: 'Roles can be either: user, staff, manager, admin',
      },
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    locations: [
      {
        _id: false,
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        address: {
          house: String,
          locality: String,
          landmark: String,
        },
        coordinates: [Number], //It is arranged as (Longitude, Latitude)
        addressType: {
          type: String,
          enum: {
            values: ['home', 'work', 'other'],
            message: 'address type can be either home, work or other',
          },
          default: 'other',
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
        addressId: String,
      },
    ],
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: 'Gender can be either be: male, female or other',
      },
      default: 'male',
    },
    dob: {
      type: Date,
      default: new Date('January 1, 2000 12:15:30'),
      validate: {
        validator: (value) => {
          const date1 = new Date('1900-01-01');
          const date2 = new Date('2015-01-01');
          const date = new Date(value);

          return (
            date.getTime() > date1.getTime() && date.getTime() < date2.getTime()
          );
        },
        message: (props) =>
          `${props.value} is not a valid date. Date should be between Jan 01 1900 to Jan 01 2015`,
      },
    },
    // favorites: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //   },
    // ],
    orders: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true, versionKey: false },
    collection: 'Users',
  },
);

////////////////////////////////////////////////////////////////////////////////////////////////
///////  MIDDLEWARES

//Encrypt password when password is being modified or created for first time
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  //Encrypt the password with hash 12 salts
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

//Updating passwordChangedAt if password is being modified and document is not newly created
userSchema.pre('save', function (next) {
  if (!this.isModified('password') && !this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; //adjusting the time

  next();
});

//Run for every find query and filter the user docs with active as false
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

/////////////////////////////////////////////////////////////////////
///// INSTANCE METHODS

userSchema.method(
  'comparePassword',
  async function (inputPassword, userPasssword) {
    return await bcrypt.compare(inputPassword, userPasssword);
  },
);

userSchema.method('passwordResetBeforeTokenIssue', function (JWTTimeStamp) {
  if (!this.passwordChangedAt) return;

  const passwordChangedTimeStamp = parseInt(
    this.passwordChangedAt.getTime() / 1000,
  );

  return JWTTimeStamp < passwordChangedTimeStamp;
});

userSchema.method('createResetToken', function () {
  //creating random string for reset token
  const resetToken = crypto.randomBytes(32).toString('hex');

  //excrypting reset token for protection and then we save it in DB
  this.resetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetTokenExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
