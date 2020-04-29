const Store = require('../models/Store')

module.exports = {
    async index(req, res) {
        
        const store = req.headers.user;

        const { avatar, name, description, whatsapp, phone, tags } = await Store.findOne({_id: store.id});

        return res.json({ avatar, name, description, whatsapp, phone, tags })

    },
    async update(req, res) {

        const store = req.headers.user;

        const { avatar, name, description, whatsapp, phone, tags } = req.body;

        if(!name || !whatsapp) {
            return res.json({
                error: 'Todos os campos devem estar preenchidos'
            });
        }

        await Store.updateOne({ _id: store.id }, {
            avatar,
            name,
            description,
            whatsapp,
            phone,
            tags
        });

        return res.json({
            status: 'Perfil alterado com sucesso'
        });

    }
}