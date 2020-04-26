const Product = require('../models/Product');

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

        console.log(image)

        if(!name || !price) return res.json({error: 'Preencha o nome e o preço'});

        const newProduct = {
            image,
            name,
            description,
            price,
            store_id: store.id
        }

        try {

            const product = await new Product(newProduct).save();
            return res.json(product);

        } catch (err) {
            return res.json({error: 'Houve um erro ao listar seus produtos, verifique sua conexão com a internet'})
        }

    },
    async update(req, res) {

        const store = req.headers.user;

        const { image, name, description, price, id } = req.body;

        if(!name || !price) return res.json({error: 'Preencha o nome e o preço'});

        try{
            await Product.updateOne({
                store_id: store.id,
                _id: id
            },{
                image,
                name,
                price
            })

            return res.json({status: 'Alterado com sucesso'})            
        } catch (err) {
            return res.json({error: 'Houve um erro ao listar seus produtos, verifique sua conexão com a internet'})
        }

    },
    async destroy(req, res) {

        const { id } = req.body;

        if(!id) return res.json({error: 'Houve um problema ao deletar seu produto, tente novamente'});

        try {
            await Product.deleteOne({_id: id})
            return res.json({status: 'Produto apagado com sucesso'});
        } catch (err) {
            return res.json({error: 'Houve um erro ao listar seus produtos, verifique sua conexão com a internet'})
        }     
    
    },

}