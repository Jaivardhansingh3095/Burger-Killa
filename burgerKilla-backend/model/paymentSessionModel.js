const mongoose = require('mongoose');

const paymentSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'completed', 'cancelled', 'invalidated'],
      default: 'active',
    },
    accessedAt: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    expiredAt: {
      type: Date,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'upi', 'cod', 'netbanking'],
      default: 'upi',
    },
    transaction: {
      _id: false,
      payment_id: String,
      order_id: String,
      created_at: Number,
      fee: Number,
      tax: Number,
      bank: String,
      bank_transaction_id: String,
      international: Boolean,
      invoice_id: String,
      captured: Boolean,
      x_razorpay_event_id: String,
      error: {
        code: String,
        description: String,
        reason: String,
      },
    },
    isConsumed: {
      type: Boolean,
      default: false,
    },
    reason: {
      type: String,
      enum: [
        'tab_closed',
        'reentry_attempt',
        'manual_override',
        'timeout',
        'tampering',
      ],
    },
  },
  {
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true },
    collection: 'Payment_Session',
  },
);

const PaymentSession = mongoose.model('Payment_Session', paymentSessionSchema);

module.exports = PaymentSession;
