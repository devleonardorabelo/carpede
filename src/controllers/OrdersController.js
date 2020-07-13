const Order = require('../models/Order');
const { findConnections, sendMessage } = require('../websocket');
const { getCurrentTime, getFullDate } = require('../utils/treatDate');

module.exports = {

    async index(req, res) {

        const store = req.headers.user;

        const { page, status } = req.query;

        try {

            let orders;

            switch (status) {
                case 'waiting':
                    orders = await Order.find({store_id: store.id, status, date: getFullDate()}).limit(6).skip((page - 1) * 6).populate('products.item'); 
                    break;
                case 'done':
                    orders = await Order.find({store_id: store.id, status}).limit(6).skip((page - 1) * 6).populate('products.item');
                    break;
                case 'lost':
                    orders = await Order.find({store_id: store.id, date: { $lt: getFullDate() }, status: 'waiting' }).limit(6).skip((page - 1) * 6).populate('products.item');
            }
                
            return res.json(orders);

        } catch (err) {
            return res.json({error: 'Houve um erro ao listar seus produtos'})
        }

    },
    async store(req, res) {

        const { store_id ,customer, value, fees, paymentMethod, products, latitude, longitude } = req.body;


        let order_id = Math.random().toString(36).substring(7);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        let order = await Order.create({
            order_id,
            store_id,
            time: getCurrentTime(),
            date: getFullDate(),
            customer,
            fees,
            value,
            paymentMethod,
            products,
            location,
            status: 'waiting'
        })

        const sendSocketMessageTo = findConnections(store_id);

        sendMessage(sendSocketMessageTo, 'new-order', {
            order_id,
            time: getCurrentTime()
        })

        return res.json(order);
    
    },

    async update(req, res) {

        const { id, status, date: order_date } = req.body;

        try {
            
            if(order_date == getFullDate()) {
                await Order.updateOne({
                    _id: id
                },{
                    status,
                    deliveredAt: `${getFullDate()} ás ${getCurrentTime}`
                })    
            } else {
                await Order.updateOne({
                    _id: id
                },{
                    status: 'lost',
                    deliveredAt: `${getFullDate()} ás ${getCurrentTime}`
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