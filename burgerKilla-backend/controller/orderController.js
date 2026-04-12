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
  const { status } = req.query;

  if (!status) {
    return next(
      new AppError(
        'order status can be - active or delivered or cancelled.',
        401,
      ),
    );
  }

  //Updating all documents with new fields
  //await Order.updateMany({}, { $set: { deliveredAt: null } });

  //filter the search condition
  const filter = {};
  if (status === 'active') {
    filter['active'] = true;
    filter['status'] = { $in: ['confirmed', 'preparing', 'delivering'] };
  } else if (status === 'delivered') {
    filter['active'] = false;
    filter['status'] = status;
  } else if (status === 'cancelled') {
    filter['active'] = false;
    filter['status'] = status;
  }
  console.log(filter);

  const orders = await Order.find({
    ...filter,
  })
    .sort({ createdAt: -1 })
    .populate({
      path: 'paymentSession',
    })
    .populate({
      path: 'orderItems.item',
    })
    .populate({
      path: 'orderItems.addons',
    })
    .populate({
      path: 'user',
    });

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
//➡️ GET ALL ORDERS BASED ON USER WITH TIME PERIOD LIMITER

const getOrdersByUser = catchAsync(async (req, res, next) => {
  // const { period } = req.query;
  // if (!period) period = 7;

  const orders = await Order.find({
    user: req.user._id,
    active: false,
  })
    .select(
      'customer_order_id user orderItems deliveryAddress status totalAmount discount gst deliveryFee tip createdAt isPaid',
    )
    .populate({
      path: 'orderItems.item',
      select: 'name foodType',
    })
    .populate({
      path: 'orderItems.addons',
      select: 'name foodType',
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
//➡️ GET ACTIVE ORDERS BASED ON PROVIDED USER ID

const getActiveOrderByUser = catchAsync(async (req, res, next) => {
  const activeOrders = await Order.find({
    user: req.user._id,
    active: true,
  })
    .select(
      'customer_order_id user orderItems deliveryAddress status totalAmount discount gst deliveryFee tip createdAt isPaid',
    )
    .populate({
      path: 'orderItems.item',
    })
    .populate({
      path: 'orderItems.addons',
    });
  // .populate({
  //   path: 'paymentSession',
  // });

  if (activeOrders.length === 0)
    return next(new AppError('No active order found', 400));

  res.status(200).json({
    status: 'success',
    results: activeOrders.length,
    data: {
      orders: activeOrders,
    },
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ Get ORDER FOR LOGGED USER based on OrderId

const getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId)
    .populate({
      path: 'orderItems.item',
    })
    .populate({
      path: 'orderItems.addons',
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

  const order = await Order.findOne({ customer_order_id: req.params.orderId });

  //Check if order exist
  if (!order) {
    return next(new AppError('No order found', 404));
  }

  //check if order is closed
  if (!order.active) {
    return next(
      new AppError(
        `Order ${order.customer_order_id}  has been closed. No update is allowed`,
      ),
      403,
    );
  }

  //Updating the Order status with correct status flow
  //confirmed -> preparing -> delivering -> delivered || cancelled
  if (status === 'confirmed') {
    //Confirmed status is applied at time of order creation.
    //No status change is required.
    return next(
      new AppError(
        `Cannot change status from '${order.status}' to '${status}'.`,
        409,
      ),
    );
  } else if (status === 'preparing') {
    //Flow is correct
    if (order.status === 'confirmed') order.status = status;

    //reversing the status flow not allowed
    if (order.status === 'delivering')
      return next(
        new AppError(
          `Cannot change status from '${order.status}' to '${status}'.`,
          409,
        ),
      );
  } else if (status === 'delivering') {
    if (order.status === 'confirmed' || order.status === 'preparing')
      order.status = status;
  } else {
    order.status = status;
  }

  order.active =
    status === 'delivered' || status === 'cancelled' ? false : true;
  if (status === 'delivered') order.deliveredAt = new Date().toISOString();

  const updatedOrder = await order.save({
    validateModifiedOnly: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      updatedOrder,
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
exports.getActiveOrderByUser = getActiveOrderByUser;
