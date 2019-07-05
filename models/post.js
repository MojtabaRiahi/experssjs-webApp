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
        minlength: 5,
        maxlength: 1024,
        required: true,

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
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [String],

})
const Post = mongoose.model('Post', postSchema);
//validate post

module.exports=Post;