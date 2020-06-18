const Order = require('../models/Order');
const { update } = require('./CategoriesController');

module.exports = {

    async index(req, res) {

        const store = req.headers.user;

        const { page, status } = req.query;

        try {
            const orders = await Order.find({store_id: store.id, status}).limit(6).skip((page - 1) * 6).populate('products.item')
            return res.json(orders);

        } catch (err) {
            return res.json({error: 'Houve um erro ao listar seus produtos'})
        }

    },
    async store(req, res) {

        const { order_id, store_id, time, customer, value, paymentMethod, products, latitude, longitude } = req.body;

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        let order = await Order.create({
            order_id,
            store_id,
            time,
            customer,
            value,
            paymentMethod,
            products,
            location,
        })

        return res.json(order);
    },

    async update(req, res) {

        const { id, status } = req.body;

        try {

            await Order.updateOne({
                _id: id
            },{
                status
            })

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