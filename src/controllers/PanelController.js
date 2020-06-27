const Store = require('../models/Store');

module.exports = {
    async index(req, res) {

        const current = req.headers.user
       
        const { firebaseTokenNotification } = await Store.findOne({_id: current.id});

        return res.json(firebaseTokenNotification);

    },
    async update(req, res) {

        const current = req.headers.user
        const { token } = req.body;

        await Store.updateOne({
            _id: current.id
        },{
            firebaseTokenNotification: token
        })

        return res.json(token);
    }
}