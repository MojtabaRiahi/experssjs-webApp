const { Post} = require('../models/post')
const lodash = require('lodash')


class PostService {

    async createpost(newPost,authorId){
        const post = new Post(lodash.pick(newPost, ['title', 'description', 'tags', 'imageUrl']))
        post.author = authorId;
        await post.save();
    }
}
