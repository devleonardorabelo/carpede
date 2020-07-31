const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: String,
    whatsapp: String,
    complement: String,
    number: Number,
    latitude: String,
    longitude: String,
    deviceToken: String,
});

module.exports = mongoose.model('Customer', CustomerSchema);