const Store = require('../models/Store')

module.exports = {
    async index(req, res) {
        
        const store = req.headers.user;

        const { avatar, name, whatsapp, phone, operation, averageDeliveryTime } = await Store.findOne({_id: store.id});

        return res.json({ avatar, name, whatsapp, phone, operation, averageDeliveryTime })

    },
    async update(req, res) {

        const store = req.headers.user;

        const { avatar, name, whatsapp, phone, operation, averageDeliveryTime } = req.body;

        if(!name) return res.json({ error: { text: 'Mínimo de 5 caracteres', input: 'name' } });
        if(!whatsapp) return res.json({ error: { text: 'Ex: (01) 2 3456 7890', input: 'whatsapp' } });
        if(whatsapp.length < 11) return res.json({ error: { text: '(01) 2 3456 7890', input: 'whatsapp' } });
        if(!operation.opening) return res.json({ error: { text: 'Preencha', input: 'opening' } });
		if(!operation.closure) return res.json({ error: { text: 'Preencha', input: 'closure' } });
		if(operation.opening >= operation.closure) return res.json({ error: { text: 'Deve ser maior que a abertura', input: 'closure' } });
        if(operation.opening.length !== 5) return res.json({ error: { text: 'Incompleto', input: 'opening' } });
        if(operation.closure.length !== 5) return res.json({ error: { text: 'Incompleto', input: 'closure' } });
        if(!averageDeliveryTime) return res.json({ error: { text: 'Dê um valor', input: 'average' } });
        
        await Store.updateOne({ _id: store.id }, {
            avatar,
            name,
            whatsapp,
            phone,
            operation,
            averageDeliveryTime
        });

        return res.json({
            status: 'Perfil alterado com sucesso'
        });

    }
}