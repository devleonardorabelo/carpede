const Store = require('../models/Store');

module.exports = {
    async index(req, res) {

        const current = req.headers.user
       
        const store = await Store.findOne({_id: current.id});

        return res.json(store);

    }
}