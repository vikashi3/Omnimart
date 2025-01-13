const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    shop: { type: String, required: true },
    imageUrl: { type: String, required: true },
    productName: { type: String, required: true },
    actualPrice: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    quantity: {type: Number, default:1},
});

module.exports = productSchema;