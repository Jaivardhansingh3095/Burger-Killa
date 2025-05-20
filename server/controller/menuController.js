const catchAsync = require('../util/catchAsync');
const Menu = require('../model/menuModel');
const AppError = require('../util/appError');

const getMenu = catchAsync(async (req, res, next) => {
  //Filtering query
  const queryObj = { ...req.query };
  const excludeQuery = ['sort', 'limit', 'page', 'field'];
  excludeQuery.forEach((el) => delete queryObj[el]);

  // let queryStr = JSON.stringify(queryObj);
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = Menu.find(queryObj);

  //Sorting query
  if (req.query.sort) {
    query = query.sort(req.query.sort);
  }

  const menu = await query;

  res.status(200).json({
    status: 'success',
    results: menu.length,
    data: {
      menu,
    },
  });
});

const addProduct = catchAsync(async (req, res, next) => {
  const newItem = await Menu.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    discount: req.body?.discount || 0,
    categories: req.body.categories,
    itemType: req.body.itemType,
    image: req.body.image,
  });

  res.status(201).json({
    status: 'success',
    data: {
      newItem,
    },
  });
});

const getProduct = catchAsync(async (req, res, next) => {
  const item = await Menu.findById(req.params.id);

  if (!item) {
    return next(
      new AppError(
        `There is no product in menu with this id:${req.params.id}`,
        404,
      ),
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      item,
    },
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const newItem = await Menu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!newItem) {
    return next(
      new AppError(
        `There is no product in menu with this id:${req.params.id}`,
        404,
      ),
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      newItem,
    },
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const item = await Menu.findByIdAndDelete(req.param.id);

  if (!item) {
    return next(
      new AppError(
        `There is no product in menu with this id:${req.params.id}`,
        404,
      ),
    );
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMenu = getMenu;
exports.addProduct = addProduct;
exports.getProduct = getProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
