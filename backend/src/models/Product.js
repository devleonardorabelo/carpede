const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    image: String,
    name: String,
    price: String,
    description: String,
    store_id: String,
});

module.exports = mongoose.model('Products', ProductsSchema);