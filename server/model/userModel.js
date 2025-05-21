const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    },
    password: {
      type: String,
      required: [true, 'Account must have a password'],
      select: false,
      minLength: 8,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'manager', 'staff', 'admin'],
        message: 'Roles can be either: user, staff, manager, admin',
      },
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    address: {
      type: String,
    },
    // favorites: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //   },
    // ],
    // orders: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Orders',
    //   },
    // ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true, versionKey: false },
    collection: 'Users',
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  //Encrypt the password with hash 12 salts
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
