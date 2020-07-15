const mongoose = require('mongoose');
const Category = require('./Category');

const ProductsSchema = new mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    description: String,
    category: {
        type: Object,
        ref: Category
    },
    store_id: String,
    sold: Number,
    onSale: Boolean,
    onSaleValue: Number
});

module.exports = mongoose.model('Products', ProductsSchema);