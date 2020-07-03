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
    date: String,
    time: String,
    status: String,
    deliveredAt: String,
    customer: {
        name: String,
        whatsapp: String,
        address: String, 
        complement: String,
        number: String,
    },
    fees: {
        delivery: Number,
        payment: Number
    },
    value: Number,
    paymentMethod: {
        card: {
            method: String
        },
        money: {
            amount: Number,
        }
    },
    products: [{
        product: {
            type: Object,
            ref: Products
        },
        quantity: {
            type: Number
        },
    }],
    location: {
        type: PointSchema,
        createIndexes: '2dsphere'
    },
});

module.exports = mongoose.model('Orders', OrdersSchema);
