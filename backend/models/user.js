const mongoose = require('mongoose');
const Product = require('./product.js')
const productSchema = require('./product.js');


const itemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const orderSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "canceled"],
        default: "pending"
    },
    totalAmount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Define the payment history schema
const paymentSchema = new mongoose.Schema({
    paymentId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        enum: ["credit_card", "paypal", "bank_transfer"],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new mongoose.Schema({
    accountType: {
        type: String,
        required: true,
        enum: ["user", "business"]
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    businessCard: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BusinessCard' }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BusinessCard' }],
    // favorites: [productSchema],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BusinessCard' }],
    orders: [orderSchema],
    paymentHistory: [paymentSchema],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
