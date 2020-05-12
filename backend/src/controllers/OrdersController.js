const Order = require('../models/Order');

module.exports = {

    async index(req, res) {

        const store = req.headers.user;

        const { page } = req.query;

        try {
            const orders = await Order.find({store_id: store.id}).limit(6).skip((page - 1) * 6).populate('products.item')
            return res.json(orders);

        } catch (err) {
            return res.json({error: 'Houve um erro ao listar seus produtos, verifique sua conexão com a internet'})
        }

    },
    async store(req, res) {

        //const store = req.headers.user;

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

}