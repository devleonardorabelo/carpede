const Category = require('../models/Category');
const Order = require('../models/Order');

module.exports = {

    async indexAll(req, res) {

        const store = req.headers.user;

        try {
            const categories = await Category.find({store_id: store.id})
            return res.json(categories);

        } catch (err) {
            return res.json({error: 'Houve um erro ao listar seus produtos, verifique sua conexão com a internet'})
        }

    },
    async index(req, res) {

        const store = req.headers.user;

        const { page } = req.query;

        try {
            const categories = await Category.find({store_id: store.id}).limit(6).skip((page - 1) * 6)
            return res.json(categories);

        } catch (err) {
            return res.json({error: 'Houve um erro ao listar seus produtos, verifique sua conexão com a internet'})
        }

    },
    async store(req, res) {

        const store = req.headers.user;

        const { name, image } = req.body;

        if(!name) return res.json({ error: { text: 'Mínimo de 5 caracteres', input: 'name' } });

        const newCategory = {
            image,
            name,
            store_id: store.id
        }

        try {
            await new Category(newCategory).save();
            return res.json({status: 'Categoria criada com sucesso'})

        } catch (err) {
            return res.json({error: 'Houve um erro ao listar suas categorias, tente novamente'})
        }

    },
    async update(req, res) {

        const store = req.headers.user;

        const { image, name, id } = req.body;

        if(!name) return res.json({ error: { text: 'Mínimo de 5 caracteres', input: 'name' } });

        try{
            await Category.updateOne({
                store_id: store.id,
                _id: id
            },{
                image,
                name,
            })

            return res.json({status: 'Alterado com sucesso'})            
        } catch (err) {
            return res.json({error: 'Houve um erro ao alterar sua categoria, tente novamente'})
        }

    },
    async destroy(req, res) {

        const { id } = req.body;

        if(!id) return res.json({error: 'Houve um problema ao deletar sua categoria, tente novamente'});

        try {
            await Category.deleteOne({_id: id})
            return res.json({status: 'Categoria apagada com sucesso'});
        } catch (err) {
            return res.json({error: 'Houve um erro ao alterar sua categoria, tente novamente'})
        }     
    
    },

}