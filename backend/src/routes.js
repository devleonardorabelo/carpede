const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require ('path');
const sharp = require('sharp');
const fs = require('fs')
const AuthController = require('./controllers/AuthController');
const PanelController = require('./controllers/PanelController');
const ProfileController = require('./controllers/ProfileController');
const ProductsController = require('./controllers/ProductsController');

const CheckAuth = require('./middlewares/auth');
const storage = require('./configs/storage');
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

routes.post('/upload', upload.single('fileData'), async (req, res) => {
    
    const { filename: image } = req.file 

    await sharp(req.file.path)
    .resize(500)
    .jpeg({quality: 100})
    .withMetadata()
    .toFile(
        path.resolve(req.file.destination, `r${image}`)
    )
    let imageResize = `r${image}`

    fs.unlinkSync(req.file.path);
    res.json({file: imageResize});
    
});

module.exports = routes
 