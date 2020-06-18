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
const CategoriesController = require('./controllers/CategoriesController');
const OrdersController = require('./controllers/OrdersController');

const CheckAuth = require('./middlewares/auth');
const storage = require('./configs/storage');
const upload = multer({ storage });

//AUTH
routes.post('/check', async (req, res) => {

    const current = req.headers.user
       
    const store = await Store.findOne({_id: current.id});

    return res.json(store);

})

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


routes.post('/signin', AuthController.signin);
routes.post('/signup', AuthController.signup);
routes.get('/panel', CheckAuth, PanelController.index);
routes.get('/profile', CheckAuth, ProfileController.index);
routes.post('/profile', CheckAuth, ProfileController.update);
routes.get('/products', CheckAuth, ProductsController.index);
routes.post('/products/new', CheckAuth, ProductsController.store);
routes.post('/products/edit', CheckAuth, ProductsController.update);
routes.post('/products/delete', CheckAuth, ProductsController.destroy);
routes.get('/loadcategories', CheckAuth, CategoriesController.indexAll)
routes.get('/categories', CheckAuth, CategoriesController.index);
routes.post('/categories/new', CheckAuth, CategoriesController.store);
routes.post('/categories/edit', CheckAuth, CategoriesController.update);
routes.post('/categories/delete', CheckAuth, CategoriesController.destroy);
routes.get('/orders', CheckAuth, OrdersController.index);
routes.post('/orders/new', OrdersController.store);
routes.post('/orders/edit', OrdersController.update);
routes.post('/orders/delete', OrdersController.destroy);

module.exports = routes
 