const Category = require('../model/categoryModel');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');

///////////////////////////////////////////////////////////////////////////////
const getCategories = catchAsync(async (req, res, next) => {
  const allCategories = await Category.find();

  const categories = [];
  allCategories.forEach((category) => {
    categories.push(category.name);
  });

  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      categories,
    },
  });
});

//////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
const addCategories = catchAsync(async (req, res, next) => {
  if (!req.body.category) {
    return next(new AppError('Please provide category name.', 400));
  }

  const category = await Category.create({
    name: req.body.category.trim().toLowerCase(),
  });

  res.status(200).json({
    status: 'success',
    data: {
      category: category.name,
    },
  });
});

exports.getCategories = getCategories;
exports.addCategories = addCategories;
