const express = require('express');
const port = process.env.PORT || 21069;
const app = express();
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/carpede', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`ON in ${port}`));