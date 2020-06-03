const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    description: String,
    category: String,
    store_id: String,
});

module.exports = mongoose.model('Products', ProductsSchema);