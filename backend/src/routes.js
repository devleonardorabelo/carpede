const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const multer = require ('multer');
const AuthController = require('./controllers/AuthController');
const PanelController = require('./controllers/PanelController');
const ProfileController = require('./controllers/ProfileController');
const ProductsController = require('./controllers/ProductsController');

const CheckAuth = require('./middlewares/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // error first callback
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {

        // error first callback
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage });

//AUTH
routes.post('/check', (req, res) => {

    const { storeToken } = req.body;
    
    jwt.verify(storeToken, process.env.SECRET, (err, decoded) => {
		
		if(err) return res.json({ logged: false });

		return res.json({logged: true});
	});

})
routes.post('/signin', AuthController.signin);
routes.post('/signup', AuthController.signup);
routes.get('/panel', CheckAuth, PanelController.index);
routes.get('/profile', CheckAuth, ProfileController.index);
routes.post('/profile', CheckAuth, ProfileController.update);
routes.get('/products', CheckAuth, ProductsController.index);
routes.post('/products/new', CheckAuth, ProductsController.store);
routes.post('/products/edit', CheckAuth, ProductsController.update);
routes.post('/products/delete', CheckAuth, ProductsController.destroy);

routes.post('/upload', upload.single('fileData'), (req, res, next) => {
	console.log(req.file)
	res.json({efff: 'ok'})
});

module.exports = routes