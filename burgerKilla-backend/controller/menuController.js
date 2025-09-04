const catchAsync = require('../util/catchAsync');
const Menu = require('../model/menuModel');
const AppError = require('../util/appError');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs/promises');
const { readFile } = require('fs');

//Retrieving file from public folder and converting it to base64
// const toBase64 = async function (filepath) {
//   try {
//     console.log(filepath);
//     const result = await fs.readFile(filepath, 'base64');

//     return result;
//   } catch (err) {
//     console.error(err);
//   }
// };

/*
//Storing the image at its destination with custom file names
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/products');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${req.body.name}-${Date.now()}.${ext}`);
  },
});
*/

//NOTE: we cannot use the above storage method for image as we need to resize the image before storing it in DB
//THe above method store the image in the destination folder.
//Instead we use another method "memory storage" which will return image "buffer"(buffer contains the full image) in req.file

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('File is not image type. Please upload only images.', 400),
      false,
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadProductImage = upload.single('productImage');

const resizeUploadImage = (req, res, next) => {
  if (!req.file) return next();

  const namingConvention = `${req.body.name.toLowerCase().split(' ').join('-')}`;

  req.file.filename = `${namingConvention}.png`;
  req.file.filenameSmall = `${namingConvention}-small.png`;

  sharp(req.file.buffer)
    .resize(1024, 1024, {
      fit: 'contain',
      position: 'center',
    })
    .toFormat('png')
    .png({ quality: 90 })
    .toFile(`public/img/products/${req.file.filename}`);

  sharp(req.file.buffer)
    .resize(300, 300, {
      fit: 'contain',
      position: 'center',
    })
    .toFormat('png')
    .png({ quality: 50 })
    .toFile(`public/img/products/${req.file.filenameSmall}`);

  next();
};

const getProductImage = catchAsync(async (req, res, next) => {
  //Reading file from public folder and excoding to base64
  const result = await fs.readFile(
    `public/img/products/${req.params.imgName}`,
    'base64',
  );

  res.status(200).json({
    status: 'success',
    data: {
      result,
    },
  });
});

const getMenu = catchAsync(async (req, res, next) => {
  //Filtering query
  const queryObj = { ...req.query };
  const excludeQuery = ['sort', 'limit', 'page', 'field'];
  excludeQuery.forEach((el) => delete queryObj[el]);

  // let queryStr = JSON.stringify(queryObj);
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = Menu.find(queryObj)
    .sort({
      foodType: -1,
    })
    .lean();

  //Sorting query
  if (req.query.sort) {
    query = query.sort(req.query.sort);
  }

  const menu = await query;

  //This method converts image to base64 encoded string and update the menu object
  //NOTE - base64 string bloat the res data and put network overhead
  // const newMenu = await Promise.all(
  //   menu.map(async (product) => {
  //     const smallImgBase64 = await fs.readFile(
  //       `public/img/products/${product.productImageSmall}`,
  //       'base64',
  //     );
  //     return { ...product, smallImgBase64 };
  //   }),
  // );

  //Instead we can send image URL in the menu object
  const newMenu = menu.map((product) => ({
    ...product,
    imgUrlSmall: `${req.protocol}://${req.get('host')}/public/img/products/${product.productImageSmall}`,
    imgUrl: `${req.protocol}://${req.get('host')}/public/img/products/${product.productImage}`,
  }));

  // console.log(
  //   `${req.protocol}://${req.get('host')}/public/img/products/${menu[0].productImageSmall}`,
  // );

  res.status(200).json({
    status: 'success',
    results: newMenu.length,
    data: {
      newMenu,
    },
  });
});

const addProduct = catchAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);

  const newItem = await Menu.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    discount: req.body?.discount || 0,
    categories: req.body.categories,
    foodType: req.body.foodType,
    productImage: req?.file?.filename,
    productImageSmall: req?.file?.filenameSmall,
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
  const filterObj = {
    ...req.body,
    productImage: req?.file?.filename,
    productImageSmall: req?.file?.filenameSmall,
  };

  const newItem = await Menu.findByIdAndUpdate(req.params.id, filterObj, {
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

const getAddOn = catchAsync(async (req, res, next) => {
  const addOnList = await Menu.aggregate([
    {
      $match: {
        categories: {
          $in: ['munchie', 'milkshake', 'refreshment'],
        },
      },
    },
    {
      $project: {
        name: 1,
        price: 1,
        discount: 1,
        foodType: 1,
        categories: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: addOnList.length,
    data: {
      addOnList,
    },
  });
});

exports.getMenu = getMenu;
exports.addProduct = addProduct;
exports.getProduct = getProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.uploadProductImage = uploadProductImage;
exports.resizeUploadImage = resizeUploadImage;
exports.getProductImage = getProductImage;
exports.getAddOn = getAddOn;
