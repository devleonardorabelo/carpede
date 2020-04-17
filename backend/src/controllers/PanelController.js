module.exports = {
    async index(req, res) {

        const store = req.headers.user
        return res.json(store)

    }
}