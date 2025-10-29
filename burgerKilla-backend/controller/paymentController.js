const PaymentSession = require('../model/paymentSessionModel');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const { razorpay } = require('../util/razorpayInstance');

const crypto = require('crypto');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//➡️ CREATE RAZORPAY ORDER

const createRrazorpayOrder = catchAsync(async (req, res, next) => {
  const { amount, receipt, currency, notes } = req.body;

  if (!amount || !receipt || !currency) {
    return next(
      new AppError(
        'Please provide all the necessary details like amount, receipt, currency',
        400,
      ),
    );
  }

  const order = await razorpay.orders.create({
    amount,
    receipt,
    currency,
    notes,
  });

  if (!order) {
    return next(new AppError('Error with creating new razorpay order', 500));
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
//➡️ VALIDATE RAZORPAY WEBHOOK PAYMENT SIGNATURE AND UPDATE SESSION

const validatePaymentSignature = catchAsync(async (req, res, next) => {
  const signature = req.headers['x-razorpay-signature'];
  // const razorpayEventId = req.headers['x-razorpay-event-id'];

  if (!signature) {
    return next(new AppError('Invalid signature', 400));
  }

  const digest = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (digest !== signature) {
    return next(new AppError('Transaction is not valid', 400));
  }

  const paymentObj = req.body.payload.payment.entity;

  const currentSession = await PaymentSession.findOneAndUpdate(
    {
      sessionId: paymentObj.notes.sessionId,
    },
    {
      paymentMethod: paymentObj.method,
      currency: paymentObj.currency,
      transaction: {
        payment_id: paymentObj.id,
        order_id: paymentObj.order_id,
        invoice_id: paymentObj.invoice_id,
        international: paymentObj.international,
        created_at: paymentObj.created_at,
        fee: paymentObj.fee,
        tax: paymentObj.tax,
        bank: paymentObj.bank,
        bank_transaction_id: paymentObj['acquirer_data']['bank_transaction_id'],
        captured: paymentObj.captured,
        x_razorpay_event_id: req.headers['x-razorpay-event-id'],
        error: {
          code: paymentObj['error_code'],
          description: paymentObj['error_description'],
          reason: paymentObj['error_reason'],
        },
      },
    },
    { validateModifiedOnly: true },
  );

  res.status(200).json({
    status: 'success',
  });
});

exports.createRrazorpayOrder = createRrazorpayOrder;
exports.validatePaymentSignature = validatePaymentSignature;
