const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    avatar: String,
    name: String,
    description: String,
    whatsapp: String,
    phone: String,
    tags: String,
    email: String,
    password: String,
    firebaseTokenNotification: String,
});

module.exports = mongoose.model('Store', StoreSchema);