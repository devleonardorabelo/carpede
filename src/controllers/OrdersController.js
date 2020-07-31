const admin = require('firebase-admin');
const serviceAccount = require('../config/carpede-main-firebase-adminsdk-9ix5i-1d44537760.json');
const Order = require('../models/Order');
const Store = require('../models/Store');
const Customer = require('../models/Customer');
const { getCurrentTime, getFullDate } = require('../utils/treatDate');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://carpede-main.firebaseio.com",
});


module.exports = {

    async index(req, res) {

        const store = req.headers.user;

        const { page, status } = req.query;

        try {

            let orders;

            switch (status) {
                case 'waiting':
                    orders = await Order.find({store_id: store.id, status, date: getFullDate()}).limit(20).skip((page - 1) * 20).populate('products.item'); 
                    break;
                case 'done':
                    orders = await Order.find({store_id: store.id, status}).limit(20).skip((page - 1) * 20).populate('products.item');
                    break;
                case 'lost':
                    orders = await Order.find({store_id: store.id, date: { $lt: getFullDate() }, status: 'waiting' }).limit(20).skip((page - 1) * 20).populate('products.item');
            }
                
            return res.json(orders);

        } catch (err) {
            return res.json({error: 'Houve um erro ao listar seus produtos'})
        }

    },
    async notify(req, res) {

        const { title, body, store_id, to, whatsapp } = req.body;

        let registrationToken;

        switch (to) {
            case 'store':
                const store = await Store.findOne({ _id: store_id });
                registrationToken = store.firebaseTokenNotification;
            case 'customer':
                const customer = await Customer.findOne({ whatsapp });
                registrationToken = customer.deviceToken;
        }
        
        const payload = {
            notification: {
                title,
                body,
            }
        };

        const options = {
            priority: "high",
            timeToLive: 60 * 60,
        }

        await admin.messaging().sendToDevice(registrationToken, payload, options);

        return res.json(200);

    },

    async update(req, res) {

        const { id, status, date: order_date } = req.body;

        try {
            
            if(order_date == getFullDate()) {
                await Order.updateOne({
                    _id: id
                },{
                    status,
                    deliveredAt: `${getFullDate()} ás ${getCurrentTime()}`
                })    
            } else {
                await Order.updateOne({
                    _id: id
                },{
                    status: 'lost',
                    deliveredAt: `${getFullDate()} ás ${getCurrentTime()}`
                })
            }

            return res.json({
                status: 'Alterado com sucesso',
                order: {
                    _id: id,
                    status
                }
            })  
        } catch(err) {
            return res.json({error: 'Houve um erro ao atualizar esta ordem, tente novamente'})
        }

    },

    async destroy(req, res) {

        const { id } = req.body;

        try {
            await Order.deleteOne({ _id: id})
            return res.json({
                 status: 'Ordem apagada com sucesso',
                 order: {
                     _id: id
                 }
            })
        } catch(err) {
            return res.json({error: 'Houve um erro ao apagar esta ordem, tente novamente'})
        }

    }

}