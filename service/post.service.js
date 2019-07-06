const mongoose = require('mongoose');


class PostService {

    async createpost(post){
        const post = new Post(lodash.pick(req.body, ['title', 'description', 'tags', 'imageUrl']))
        post.author = req.user._id;
        await post.save();
    }
}
