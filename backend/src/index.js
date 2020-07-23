const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const { errors } = require('celebrate');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const routes = require('./routes');

mongoose.connect('mongodb://192.168.7.79:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: 'mongo',
    pass: 'mongodb',
    dbName: 'omnistack7',
});

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'uploads', 'resized')),
);

app.use(routes);

app.use(errors());

server.listen(7777);
