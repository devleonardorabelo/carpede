const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String,
    store_id: String,
});

module.exports = mongoose.model('Category', CategorySchema);