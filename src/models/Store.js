const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    avatar: String,
    name: String,
    whatsapp: String,
    phone: String,
    email: String,
    password: String,
    firebaseTokenNotification: String,
    operation: {
        opening:  {
            type: String,
            default: '18:00',
        },
        closure: {
            type: String,
            default: '00:00',
        },
    },
    fees: {
        payment: {
            type: Number,
            default: 0,
        },
        delivery: {
            type: Number,
            default: 0,
        },
    },
    averageDeliveryTime: String,

});

module.exports = mongoose.model('Store', StoreSchema);