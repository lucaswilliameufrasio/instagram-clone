const express = require('express');
const multer = require('multer');

const { celebrate, Joi } = require('celebrate');

const uploadConfig = require('./config/upload');

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/posts', PostController.index);
routes.post(
    '/posts',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            author: Joi.string().required(),
            place: Joi.string().required(),
            description: Joi.string().required(),
            hashtags: Joi.string().required(),
        }),
    }),
    PostController.store,
);

routes.post('/posts/:id/like', LikeController.store);
module.exports = routes;
