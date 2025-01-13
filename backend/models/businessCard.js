const mongoose = require('mongoose');
const productSchema = require('./product.js');

const businessCardSchema = new mongoose.Schema({
    category: { 
        type: String, 
        required: true 
    },
    subcategory: { 
        type: String, 
        required: true 
    },
    products: [productSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('BusinessCard', businessCardSchema);
