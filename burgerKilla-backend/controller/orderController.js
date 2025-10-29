const Order = require('../model/orderModel');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const { nanoid } = require('nanoid');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ CREATE ORDER

const createOrder = catchAsync(async (req, res, next) => {
  const {
    orderItems,
    deliveryAddress,
    paymentSession,
    totalAmount,
    discount,
    gst,
    deliveryFee,
    tip,
    notes,
    isPaid,
    orderSource,
    deliveryTime,
  } = req.body;

  if (
    !orderItems.length ||
    !Object.keys(deliveryAddress)?.length ||
    !paymentSession ||
    !totalAmount ||
    !deliveryTime
  ) {
    return next(
      new AppError(
        'Please provide all the necessary details like orderItems, paymentSession, totalAmount, paymentMethod, transactionId, etc. ',
        400,
      ),
    );
  }

  const order_id = nanoid(10);

  const order = await Order.create({
    customer_order_id: order_id,
    user: req.user._id,
    orderItems,
    paymentSession,
    deliveryAddress,
    totalAmount,
    discount,
    gst,
    deliveryFee,
    tip,
    notes,
    isPaid,
    orderSource,
    estimatedDeliveryTime: Date.now() + 30 * 60 * 1000,
  });

  res.status(201).json({
    status: 'success',
    data: {
      order,
    },
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ GET ALL ORDERS (FOR ADMIN / MANAGER)

const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  if (!orders?.length) {
    return next(new AppError(`No order found`, 404));
  }

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders,
    },
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ GET ALL ORDERS BASED ON USER

const getOrdersByUser = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id })
    .populate({
      path: 'paymentSession',
    })
    .populate({
      path: 'orderItems.item',
    })
    .populate({
      path: 'orderItems.addons',
    });

  if (!orders?.length) {
    return next(
      new AppError(
        `There are no orders with provided user id: ${req.user._id}`,
        404,
      ),
    );
  }

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders,
    },
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ Get ORDER by ID of USER

const getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId)
    .populate({
      path: 'orderItems.item',
    })
    .populate({
      path: 'orderItems.addons',
    })
    .populate({
      path: 'paymentSession',
    });

  if (!order) {
    return next(
      new AppError(
        `No order found with provided order id: ${req.params.orderId}`,
        404,
      ),
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ UPDATE ORDER STATUS

const updateOrderStatus = catchAsync(async (req, res, next) => {
  let { status } = req.body;
  status = status?.toLowerCase()?.trim();

  if (!status) {
    return next(new AppError('No status found with request', 400));
  }

  const order = await Order.findOne({ _id: req.params.orderId });

  if (!order) {
    return next(new AppError('No order found', 404));
  }

  if (!order.active) {
    return next(
      new AppError('Order has been closed. No update is allowed'),
      403,
    );
  }

  order.status = status;
  order.active =
    status === 'delivered' || status === 'cancelled' ? false : true;

  const updatedOrder = await order.save({ validateModifiedOnly: true });

  res.status(200).json({
    status: 'success',
    data: {
      updateOrderStatus,
    },
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ DELETE ORDER

const deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.orderId);

  if (!order) {
    return next(
      new AppError(`NO order found with order id: ${req.params.orderId}`, 404),
    );
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createOrder = createOrder;
exports.getAllOrders = getAllOrders;
exports.getOrdersByUser = getOrdersByUser;
exports.getOrder = getOrder;
exports.updateOrderStatus = updateOrderStatus;
exports.deleteOrder = deleteOrder;
