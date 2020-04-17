const Product = require('../models/Product');

module.exports = {

    async index(req, res) {

        const store = req.headers.user;

        const { page = 1 } = req.query;

        const products = await Product.find({store_id: store.id}).limit(5).skip((page - 1) * 5)

        console.log(products)

        return res.json(products);

    },
    async store(req, res) {

        const store = req.headers.user;

        const { name, price } = req.body;

        if(!name || !price) return res.json({error: 'Preencha o nome e o preço'});

        const newProduct = {
            name,
            price,
            store_id: store.id
        }

        const product = await new Product(newProduct).save();

        return res.json(product)

    }

}