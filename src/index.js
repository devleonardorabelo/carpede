const express = require('express');
const port = process.env.PORT || 21022;
const app = express();
const routes = require('./routes');
const http = require('http');
const { setupWebSocket } = require('./websocket');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect(process.env.BD, {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(port, () => console.log(`ON in ${port}`));