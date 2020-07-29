const Subscriber = require('../models/Subscriber');

module.exports = {
  async store(req, res) {
    const { email } = req.body;
    await new Subscriber({email}).save();
    return res.json({ status: 'Salvo com sucesso' });
  }
}