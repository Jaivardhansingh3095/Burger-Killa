const { nanoid } = require('nanoid');

const PaymentSession = require('../model/paymentSessionModel');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ CREATE PAYMENT SESSION

const createPaymentSession = catchAsync(async (req, res, next) => {
  const { amount, sessionId } = req.body;

  if (!amount || !sessionId) {
    return next(
      new AppError(
        'Please provide the session id and amount of the current order.',
        400,
      ),
    );
  }

  const paymentSession = await PaymentSession.create({
    sessionId,
    user: req.user._id,
    amount,
    expiredAt: Date.now() + 15 * 60 * 1000,
  });

  res.status(200).json({
    status: 'success',
    data: {
      paymentSession,
    },
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ GET PAYMENT SESSION

const getPaymentSession = catchAsync(async (req, res, next) => {
  const sessionId = req.params.sessionId;

  const currentPaymentSession = await PaymentSession.findOne({ sessionId });

  //If no session found with sessionId
  if (!currentPaymentSession) {
    return next(
      new AppError(
        'Session not found. Please create new payment session from checkout.',
        404,
      ),
    );
  }

  //If session status is not active, then return
  if (
    currentPaymentSession.status === 'expired' ||
    currentPaymentSession.status === 'completed' ||
    currentPaymentSession.status === 'cancelled' ||
    currentPaymentSession.status === 'invalidated'
  ) {
    return next(
      new AppError(
        'Session has been closed. Please initiate a new session',
        403,
      ),
    );
  }

  //If session expired date has passed, then return
  if (Date.now() > currentPaymentSession.expiredAt.getTime()) {
    currentPaymentSession.status = 'expired';
    currentPaymentSession.reason = 'timeout';
    await currentPaymentSession.save({ validateModifiedOnly: true });

    return next(
      new AppError(
        'Session has expired. Create a new session from checkout',
        403,
      ),
    );
  }

  // console.log({
  //   accessTime: currentPaymentSession.accessedAt.getTime() + 60 * 1000,
  //   current: Date.now(),
  // });
  //If session has been accessed earlier and consumed,
  // then check for 15 secs grace period for accidental tab close
  // if (currentPaymentSession.accessedAt && currentPaymentSession.isConsumed) {
  //   if (currentPaymentSession.accessedAt.getTime() + 120 * 1000 <= Date.now()) {
  //     currentPaymentSession.status = 'cancelled';
  //     currentPaymentSession.reason = 'reentry_attempt';
  //     await currentPaymentSession.save({ validateModifiedOnly: true });

  //     return next(
  //       new AppError(
  //         'Session has been terminated. Please initiate a new session',
  //         403,
  //       ),
  //     );
  //   }
  // }

  //If session has not consumed and access earlier, then
  currentPaymentSession.accessedAt = Date.now();
  currentPaymentSession.isConsumed = true;
  await currentPaymentSession.save({
    validateModifiedOnly: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      currentPaymentSession,
    },
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ UPDATE PAYMENT SESSION

const updatePaymentSession = catchAsync(async (req, res, next) => {
  const sessionId = req.params.sessionId;
  const { status, orderId } = req.body;

  if (!status || !orderId) {
    return next(
      new AppError('Please provide the status and other details', 400),
    );
  }

  if (status !== 'completed') {
    return next(new AppError('Permission not allowed!', 403));
  }

  const paymentSession = await PaymentSession.findOneAndUpdate(
    { sessionId },
    {
      status,
      order: orderId,
    },
    {
      new: true,
      validateModifiedOnly: true,
    },
  );

  res.status(200).json({
    status: 'success',
    data: {
      paymentSession,
    },
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ INVALIDATE PAYMENT SESSION

const invalidatePaymentSession = catchAsync(async (req, res, next) => {
  const sessionId = req.params.sessionId;
  const { status } = req.body;

  if (
    status !== 'expired' ||
    status !== 'invalidated' ||
    status !== 'cancelled'
  ) {
    return next(new AppError('Permission not allowed!', 403));
  }

  const currentPaymentSession = await PaymentSession.findOne({ sessionId });

  //If no session found with sessionId
  if (!currentPaymentSession) {
    return next(
      new AppError(
        'Session not found. Please create new payment session from checkout.',
        404,
      ),
    );
  }

  currentPaymentSession.status = status;
  currentPaymentSession.reason = 'tab_closed';
  await currentPaymentSession.save({ validateModifiedOnly: true });

  res.status(200).json({
    status: 'success',
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ GET ALL PAYMENT SESSIONS

const getALLPaymentSession = catchAsync(async (req, res, next) => {
  const allPaymentSessions = await PaymentSession.find();

  if (!allPaymentSessions?.length) {
    return next(new AppError('No payment session found', 404));
  }

  res.status(200).json({
    status: 'success',
    results: allPaymentSessions.length,
    data: {
      allPaymentSessions,
    },
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ DELETE PAYMENT SESSIONS

const deletePaymentSession = catchAsync(async (req, res, next) => {
  const session = await PaymentSession.findOneAndDelete({
    sessionId: req.params.sessionId,
  });

  if (!session) {
    return next(
      new AppError(
        `There is no product in payment session with this id:${req.params.sessionId}`,
        404,
      ),
    );
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createPaymentSession = createPaymentSession;
exports.getPaymentSession = getPaymentSession;
exports.invalidatePaymentSession = invalidatePaymentSession;
exports.updatePaymentSession = updatePaymentSession;
exports.getALLPaymentSession = getALLPaymentSession;
exports.deletePaymentSession = deletePaymentSession;
