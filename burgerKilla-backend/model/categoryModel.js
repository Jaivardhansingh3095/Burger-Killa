const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      Unique: true,
      required: [true, 'Category name is required'],
    },
  },
  {
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true },
    collection: 'Category',
  },
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
