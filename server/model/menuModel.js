const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A menu item must have a name'],
      unique: true,
      trim: true,
      minLength: [5, 'Name should have more than 5 characters'],
    },
    description: {
      type: String,
      required: [true, 'A item must have its description'],
      minLength: [
        10,
        'Description should be described in more than 10 characters',
      ],
    },
    price: {
      type: Number,
      required: [true, 'price must be provided for an item'],
    },
    discount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < 55;
        },
        message: 'Discount should be less than 55% and in whole number',
      },
    },
    categories: {
      type: String,
      required: [true, 'An item must have a category: Veg and Non-veg'],
      enum: {
        values: ['veg', 'non-veg'],
        message: 'Categories are either: Veg, Non-veg',
      },
    },
    itemType: {
      type: String,
      required: [
        true,
        'A menu item must have a type like Burger, Beverage, Snack, Cheese dip',
      ],
      enum: {
        values: ['burger', 'beverage', 'snack', 'cheese dip'],
        message:
          'Item types are categorised as: Burger, Beverage, Snack, Cheese dip',
      },
    },
    image: {
      type: String,
      required: [true, 'Item must have an image for identification'],
    },
  },
  {
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true },
    collection: 'Menu',
  },
);

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
