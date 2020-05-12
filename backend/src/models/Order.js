const mongoose = require('mongoose');
const Products = require('./Product');
const Store = require('./Store');
const PointSchema = require('./utils/PointSchema');

const OrdersSchema = new mongoose.Schema({
    order_id: String,
    store_id: {
        type: String,
        ref: Store
    },
    time: String,
    status: String,
    customer: {
        name: String,
        whatsapp: String,
        address: String,
    },
    value: Number,
    paymentMethod: {
        card: {
            method: String
        },
        money: {
            amount: Number,
            change: Number,
        }
    },
    products: [{
        item: {
            type: String,
            ref: Products
        },
        amount: {
            type: Number
        },
    }],
    location: {
        type: PointSchema,
        createIndexes: '2dsphere'
    },
});

module.exports = mongoose.model('Orders', OrdersSchema);