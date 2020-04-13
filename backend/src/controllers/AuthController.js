const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Store = require('../models/Store');

module.exports = {

    async signin(req, res) {

		const { email, password } = req.body;

		if(!email || email.length < 12) return res.json({ error: 'Email inválido' });
		
		if(!password || password.length < 8) return res.json({ error: 'Senha muito curta' });

		let store = await Store.findOne({email});

		if(!store) return res.json({error: 'Email não encontrado'});

		if(!await bcrypt.compare(password, store.password)) return res.json({error: 'Senha incorreta'});

		const payload = {
			id: store.name,
			id: store.id,
			email: store.email,
			whatsapp: store.whatsapp,
		}

		const token = jwt.sign(payload, process.env.SECRET, {
			expiresIn: 5000,
		});

		return res.send(token);

    },
    async signup(req, res) {

			const { name, whatsapp, email, password, confirm } = req.body;

			let store = await Store.findOne({
				$or: [
					{email},
					{whatsapp}
				]
			})

			let errors = [];

			if(store){

				if(store.email == email) errors.push('Este email já está em uso');
            	if(store.whatsapp == whatsapp) errors.push('Este whatsapp já está em uso');
				if(!name || name.length < 3) errors.push('Nome muito curto');
				if(!whatsapp || whatsapp.length < 10) errors.push('Whatsapp inválido');
				if(!email || email.length < 13) errors.push('Email incompleto ou inválido');
				if(!password || password.length < 8) errors.push('Senha muito curta');
				if(password !== confirm) errors.push('Senhas não batem');

			}

			if(errors.length > 0) return res.json(errors);

			let storeSchema = {
				email,
				whatsapp,
				name,
				password: await bcrypt.hash(password, 10),
			}

			const newStore = await new Store(storeSchema).save();

			const payload = {
				name: newStore.name,
				id: newStore.id,
				email: newStore.email,
				whatsapp: newStore.whatsapp,
			}

			const token = jwt.sign(payload, process.env.SECRET, {
				expiresIn: 5000,
			});

			return res.send(token);
        
    }

}