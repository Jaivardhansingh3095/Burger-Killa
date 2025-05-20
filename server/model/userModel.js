const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
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
      type: Number,
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
    address: {
      type: String,
    },
    favorites: [
      {
        type: mongoose.Schema.ObjectId,
      },
    ],
    orders: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Orders',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true, versionKey: false },
    collection: 'Users',
  },
);

const User = mongoose.model('Users', userSchema);

module.exports = User;
