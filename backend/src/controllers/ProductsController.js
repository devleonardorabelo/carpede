const Product = require('../models/Product');
const Order = require('../models/Order');
const Category = require('../models/Category');

module.exports = {

    async index(req, res) {
''
        const store = req.headers.user;
        const { page, category } = req.query;
        
        try {
            let products;

            if(category) 
                products = await Product.find({store_id: store.id, "category._id": category}).limit(15).skip((page - 1) * 15).sort('name');
            else
                products = await Product.find({store_id: store.id}).limit(15).skip((page - 1) * 15).sort('name');
            
            const categories = await Category.find({store_id: store.id});
            
            return res.json({products, categories});

        } catch (err) {
            return res.json({error: 'Houve um erro ao listar seus produtos, verifique sua conexão com a internet'})
        }

    },
    async store(req, res) {

        const store = req.headers.user;

        const { name, description, price, category, image } = req.body;

        if(!name) return res.json({ error: { text: 'Mínimo de 5 caracteres', input: 'name' } });

        if(!description) return res.json({ error: { text: 'Descreva seu produto', input: 'description' } });

        if(!price) return res.json({ error: { text: 'Dê um preço para seu produto', input: 'price' } });

        if(!category) return res.json({ error: { text: 'Escolha uma categoria', input: 'category' } });

        const newProduct = {
            image,
            name,
            description,
            price,
            category,
            store_id: store.id
        }

        try {
            let product = await new Product(newProduct).save();
            return res.json({status: 'Produto criado com sucesso', product})

        } catch (err) {
            return res.json({error: 'Houve um erro ao listar seus produtos, tente novamente'})
        }

    },
    async update(req, res) {

        const store = req.headers.user;

        const { image, name, description, price, category, id } = req.body;

        if(!name) return res.json({ error: { text: 'Mínimo de 5 caracteres', input: 'name' } });

        if(!description) return res.json({ error: { text: 'Descreva seu produto', input: 'description' } });

        if(!price) return res.json({ error: { text: 'Dê um preço para seu produto', input: 'price' } });

        if(!category) return res.json({ error: { text: 'Escolha uma categoria', input: 'category' } });

        let treatPrice = price.replace(",", ".")

        try{
            await Product.updateOne({
                store_id: store.id,
                _id: id
            },{
                image,
                description,
                name,
                category,
                price: treatPrice
            })

            return res.json({
                status: 'Alterado com sucesso',
                product: {
                    store_id: store.id,
                    _id: id,
                    image,
                    description,
                    name,
                    category,
                    price: treatPrice
                }
            })            
        } catch (err) {
            return res.json({error: 'Houve um erro ao alterar seu produto, tente novamente'})
        }

    },
    async destroy(req, res) {

        const { id } = req.body;

        if(!id) return res.json({error: 'Houve um problema ao deletar seu produto, tente novamente'});

        try {
            await Product.deleteOne({_id: id})

            return res.json({
                status: 'Produto apagado com sucesso',
                product: {
                    _id: id
                }
            });
        } catch (err) {
            return res.json({error: 'Houve um erro ao alterar seu produto, tente novamente'})
        }     
    
    },

}