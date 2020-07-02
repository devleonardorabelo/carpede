const Order = require('../models/Order');
const { findConnections, sendMessage } = require('../websocket');

let date = new Date();
let timezone = -2;
let day = String(date.getDate()).padStart(2, '0');
let month = String(date.getMonth() + 1).padStart(2, '0');
let year = String(date.getFullYear());
let hour = String(date.getHours() - timezone).padStart(2, '0');
let minutes = String(date.getMinutes()).padStart(2, '0');
let time = `${hour}:${minutes}`;
let fullDate = `${day}/${month}/${year}`;

module.exports = {

    async index(req, res) {

        const store = req.headers.user;

        const { page, status } = req.query;

        try {

            let orders;

            switch (status) {
                case 'waiting':
                    orders = await Order.find({store_id: store.id, status, date: fullDate}).limit(6).skip((page - 1) * 6).populate('products.item'); 
                    break;
                case 'done':
                    orders = await Order.find({store_id: store.id, status}).limit(6).skip((page - 1) * 6).populate('products.item');
                    break;
                case 'lost':
                    orders = await Order.find({store_id: store.id, date: { $lt: fullDate }, status: 'waiting' }).limit(6).skip((page - 1) * 6).populate('products.item');
            }
                
            return res.json(orders);

        } catch (err) {
            return res.json({error: 'Houve um erro ao listar seus produtos'})
        }

    },
    async store(req, res) {

        const { store_id ,customer, value, paymentMethod, products, latitude, longitude } = req.body;

        let payment;

        if(paymentMethod.card.method != null) {
            payment = {
                card: {
                    method: paymentMethod.card.method
                }
            }
        } else {
            payment = {
                money: {
                    amount: paymentMethod.money.amount,
                    change: paymentMethod.money.change
                }
            }
        }

        let order_id = Math.random().toString(36).substring(7);


        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        let order = await Order.create({
            order_id,
            store_id,
            time,
            date: fullDate,
            customer,
            value,
            paymentMethod: payment,
            products,
            location,
            status: 'waiting'
        })

        const sendSocketMessageTo = findConnections(store_id);

        sendMessage(sendSocketMessageTo, 'new-order', {
            order_id,
            time
        })

        return res.json(order);
    
    },

    async update(req, res) {

        const { id, status, date: order_date } = req.body;

        try {
            
            if(order_date == date) {
                await Order.updateOne({
                    _id: id
                },{
                    status,
                    deliveredAt: `${fullDate} ás ${time}`
                })    
            } else {
                await Order.updateOne({
                    _id: id
                },{
                    status: 'lost',
                    deliveredAt: `${fullDate} ás ${time}`
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