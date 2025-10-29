const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customer_order_id: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    orderItems: [
      {
        _id: false,
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Menu',
          required: true,
        },
        addons: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu',
          },
        ],
        quantity: {
          type: Number,
          default: 1,
        },
        customizations: {
          type: Map,
          of: String, // { spice : "medium", cheese: "extra" }
        },
      },
    ],
    deliveryAddress: {
      _id: false,
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      address: {
        house: String,
        locality: String,
        landmark: String,
      },
      coordinates: [Number], // [Longitude, latitude]
      addressType: String,
      addressId: String,
    },
    paymentSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment_Session',
      required: true,
    },
    status: {
      type: String,
      enum: ['confirmed', 'preparing', 'delivering', 'delivered', 'cancelled'],
      default: 'confirmed',
    },
    active: {
      type: Boolean,
      default: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    gst: {
      type: Number,
      default: 0,
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    tip: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    estimatedDeliveryTime: {
      type: Date,
    },
    notes: {
      type: String,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    orderSouce: {
      type: String,
      enum: ['web', 'mobile', 'shop'],
      default: 'web',
    },
  },
  {
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true },
    collection: 'Order',
  },
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
