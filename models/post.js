const mongoose = require('mongoose')
const joi = require('joi')
const jwt = require('jsonwebtoken');
const config = require('config')
//create user schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    imageUrl: {
        type: String,
        minlength: 3,
        maxlength: 1024,
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    addDate: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    tags: [String],

})
const Post = mongoose.model('Post', postSchema);
//validate post
function validatePost(post) {
    const schema = {
        title: joi.string().min(5).max(50).required(),
        description: joi.string().min(5).max(1042).required(),
        tags:joi.array(),
        imageUrl:joi.string().min(3).max(1024)
    }
    return joi.validate(post, schema);
}
module.exports.Post = Post;
module.exports.validate = validatePost;