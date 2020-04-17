const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	
	const authorization = req.headers.authorization;

	(authorization)

	if(!authorization) return res.status(401).send({ error: 'No token provided' });
	
	const parts = authorization.split(' ');

	if(!parts.length === 2) return res.status(401).send({ error: 'Invalid Token' });

	const [ scheme, token ] = parts;

	if(!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token malformated' });

	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		
		if(err) return res.status(401).send({ error: 'Invalid Token' });

		req.headers.user = decoded;

		return next();
	});

}
