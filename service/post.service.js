const { Post } = require('../models/post')
const lodash = require('lodash')
class PostService {

    async createPost(newPost, authorId) {
        const post = new Post(lodash.pick(newPost, ['title', 'description', 'tags', 'imageUrl']))
        post.author = authorId;
       return  await post.save();
    }
    async updatePost(postId, newPostData, author) {
        const { title, description, imageUrl, tags } = newPostData;
        let post = await this.findPostById(postId)
        if (!post) return new Error(`there is not post by this id: ${postId}`);
        return  await post.set({ title, description, imageUrl, tags, author }).save();
    }
    async deletePost(postId) {
        const post = await this.findPostById(postId)
        if (!post) return await new Error(`there is not post by this id: ${postId}`)
        return await Post.remove(post)
    }
    async getAllPost() {
        return await Post.find();
    }
    async findPostById(postId) {
        return  await Post.findById(postId);
    }
}
module.exports = PostService;
