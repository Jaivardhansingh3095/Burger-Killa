const catchAsync = require('../util/catchAsync');
const User = require('../model/userModel');
const AppError = require('../util/appError');
const ShortUniqueId = require('short-unique-id');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ CURRENT USER

const getMe = catchAsync(async (req, res, next) => {
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
  } = req.user;

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id,
        name,
        email,
        phoneNumber,
        role,
        locations,
        homeAddress,
        gender,
        dob,
      },
    },
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ UPDATE USER

const updateMe = catchAsync(async (req, res, next) => {
  const { name, gender = req.user.gender, dob = req.user.gender } = req.body;
  console.log(name, gender, dob);

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name,
      gender,
      dob,
    },
    {
      runValidators: true,
      new: true,
    },
  );

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ Add ADDRESS

const addAddress = catchAsync(async (req, res, next) => {
  const { coordinates, address, addressType, isDefault } = req.body.location;

  if (!coordinates || !address || !addressType)
    return next(
      new AppError(
        'Please provide all the address details: coordinates, address, addressType',
        400,
      ),
    );

  const userTest = req.user;

  const uid = new ShortUniqueId({ length: 6 });

  userTest.locations.push({
    coordinates,
    address,
    addressType,
    isDefault,
    addressId: uid.rnd(),
  });

  const user = await userTest.save({ validateModifiedOnly: true });

  res.status(200).json({
    status: 'success',
    data: {
      locations: user.locations,
    },
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ Update ADDRESS

const updateAddress = catchAsync(async (req, res, next) => {
  const { coordinates, address, addressType, isDefault, addressId } =
    req.body.location;

  if (!coordinates || !address || !addressType || !addressId)
    return next(
      new AppError(
        'Please provide all the address details: coordinates, address, addressType',
        400,
      ),
    );

  const userTest = req.user;

  userTest.locations.forEach((loc) => {
    if (loc.addressId === addressId) {
      loc.coordinates = coordinates;
      loc.address = { ...address };
      loc.addressType = addressType;
      loc.isDefault = isDefault;
    }
  });

  const user = await userTest.save({ validateModifiedOnly: true });

  res.status(200).json({
    status: 'success',
    data: {
      locations: user.locations,
    },
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ Delete ADDRESS

const deleteAddress = catchAsync(async (req, res, next) => {
  const { addressId } = req.body;

  if (!addressId) {
    return next(new AppError('Please provide the addressId', 400));
  }

  const testUser = req.user;

  const filterLocations = testUser.locations.filter(
    (loc) => loc.addressId !== addressId,
  );

  testUser.locations = filterLocations;

  const user = await testUser.save({ validateModifiedOnly: true });

  res.status(200).json({
    status: 'success',
    data: {
      locations: user.locations,
    },
  });
});

exports.getMe = getMe;
exports.updateMe = updateMe;
exports.addAddress = addAddress;
exports.updateAddress = updateAddress;
exports.deleteAddress = deleteAddress;
