const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Store = require('../models/Store');

module.exports = {

    async signin(req, res) {

		const mask = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

		const { email, password } = req.body;

		if(!email && !password) {
			return res.json({
				error: 'Preencha os campos corretamente'
			})
		}
		
		let emailTest = mask.test(String(email).toLowerCase())

		if(emailTest === false){

			return res.json({
				error: 'Email inválido'
			})
		}
		
		if(password.length < 8) {
			return res.json({
				error: 'Senha muito curta'
			})
		};

		let store = await Store.findOne({email});

		if(!store) {
			return res.json({
				error: 'Esse email não possui uma conta'
			})
		}

		if(!await bcrypt.compare(password, store.password)) {
			return res.json({
				error: 'Senha incorreta'
			})
		}

		const payload = {
			name: store.name,
			id: store.id,
			email: store.email,
			whatsapp: store.whatsapp,
		}

		const token = jwt.sign(payload, process.env.SECRET, {
			expiresIn: 5000,
		});

		return res.json(token);

    },
    async signup(req, res) {

			const { name, whatsapp, email, password } = req.body;

			let store = await Store.findOne({
				$or: [
					{email},
					{whatsapp}
				]
			})

			if(store){
				if(store.email == email) return res.json({error: 'Este email já está em uso'});
				if(store.whatsapp == whatsapp) return res.json({error: 'Este whatsapp já está em uso'});
			}

			if(!name || name.length < 3) return res.json({error: 'Nome Inválido ou muito curto'});
			if(!whatsapp || whatsapp.length < 10) return res.json({error: 'Whatsapp inválido'});
			if(!email || email.length < 13) return res.json({error: 'Email incompleto ou inválido'});
			if(!password || password.length < 8) return res.json({error: 'Senha muito curta'});
			

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

			return res.json(token);
        
    }

}