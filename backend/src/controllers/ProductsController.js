const Product = require('../models/Product');
const Order = require('../models/Order');

module.exports = {

    async index(req, res) {

        const store = req.headers.user;

        const { page } = req.query;

        try {
            const products = await Product.find({store_id: store.id}).limit(6).skip((page - 1) * 6)
            return res.json(products);

        } catch (err) {
            return res.json({error: 'Houve um erro ao listar seus produtos, verifique sua conexão com a internet'})
        }

    },
    async store(req, res) {

        const store = req.headers.user;

        const { name, description, price, image } = req.body;

        if(!name) return res.json({ error: { text: 'Mínimo de 5 caracteres', input: 'name' } });

        if(!description) return res.json({ error: { text: 'Descreva seu produto', input: 'description' } });

        if(!price) return res.json({ error: { text: 'Dê um preço para seu produto', input: 'price' } });

        const newProduct = {
            image,
            name,
            description,
            price,
            store_id: store.id
        }

        try {
            await new Product(newProduct).save();
            return res.json({status: 'Produto criado com sucesso'})

        } catch (err) {
            return res.json({error: 'Houve um erro ao listar seus produtos, tente novamente'})
        }

    },
    async update(req, res) {

        const store = req.headers.user;

        const { image, name, description, price, id } = req.body;

        if(!name) return res.json({ error: { text: 'Mínimo de 5 caracteres', input: 'name' } });

        if(!description) return res.json({ error: { text: 'Descreva seu produto', input: 'description' } });

        if(!price) return res.json({ error: { text: 'Dê um preço para seu produto', input: 'price' } });

        let treatPrice = price.replace(",", ".")

        try{
            await Product.updateOne({
                store_id: store.id,
                _id: id
            },{
                image,
                description,
                name,
                price: treatPrice
            })

            return res.json({status: 'Alterado com sucesso'})            
        } catch (err) {
            return res.json({error: 'Houve um erro ao alterar seu produto, tente novamente'})
        }

    },
    async destroy(req, res) {

        const { id } = req.body;

        if(!id) return res.json({error: 'Houve um problema ao deletar seu produto, tente novamente'});

        try {

            //await Order.deleteMany({ "products.item": id  })

            //await Product.deleteOne({_id: id})

            return res.json({status: 'Produto apagado com sucesso'});
        } catch (err) {
            return res.json({error: 'Houve um erro ao alterar seu produto, tente novamente'})
        }     
    
    },

}