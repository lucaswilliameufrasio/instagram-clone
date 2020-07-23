const Post = require('../models/Post');

module.exports = {
    async store(req, res) {
        const post = await Post.findById(req.params.id);

        post.likes += 1;

        await post.save();

        // Emite uma mensagem para todos os clientes conectados na sala 'like'
        req.io.emit('like', post);

        return res.json(post);
    },
};
