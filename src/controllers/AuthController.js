const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Store = require('../models/Store');

module.exports = {

    async signin(req, res) {

		const mask = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

		const { email, password } = req.body;

		let emailTest = mask.test(String(email).toLowerCase());

		if(!email || emailTest === false ) return res.json({ error: { text: 'Este email é inválido', input: 'email' } });
		if(!password || password.length < 8) return res.json({ error: { text: 'Mínimo de 8 caracteres', input: 'password' } });

		let store = await Store.findOne({email});

		if(!store) return res.json({ error: { text: 'Essa conta não existe ainda', input: 'email' } }); 

		if(!await bcrypt.compare(password, store.password)) return res.json({ error: { text: 'Sua senha está incorreta', input: 'password' } });

		const payload = {
			name: store.name,
			id: store.id,
			email: store.email,
			whatsapp: store.whatsapp,
			store_id: store._id
		}

		const token = jwt.sign(payload, process.env.SECRET, {
			expiresIn: 31557600000,
		});

		return res.json({
            avatar: store.avatar,
            name: store.name,
            whatsapp: store.whatsapp,
			email: store.email,
			_id: store._id,
            token
		});

    },
    async signup(req, res) {

			const { avatar, name, whatsapp, email, password } = req.body;

			const mask = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

			let emailTest = mask.test(String(email).toLowerCase());

			let store = await Store.findOne({
				$or: [
					{email},
					{whatsapp}
				]
			})

			if(store){
				if(store.email == email) return res.json({ error: { text: 'Este email já está em uso', input: 'email' } });
	
				if(store.whatsapp == whatsapp) return res.json({ error: { text: 'Este Whatsapp já está em uso', input: 'whatsapp' } });
			}

			if(!name || name.length < 5) return res.json({ error: { text: 'Mínimo de 5 caracteres', input: 'name' } });
			if(!whatsapp || whatsapp.length < 10) return res.json({ error: { text: 'Ex: 01 2 3456 7890', input: 'whatsapp' } });
			if(!email || email.length < 13 || emailTest === false) return res.json({ error: { text: 'Verifique o email preenchido', input: 'email' } });
			if(!password || password.length < 8) return res.json({ error: { text: 'Senha muito curta, mínimo de 8 caracteres', input: 'password' } });
			

			let storeSchema = {
				avatar,
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
				expiresIn: 31557600000,
			});

			return res.json({
				token,
				_id: newStore._id
			});
        
    }

}