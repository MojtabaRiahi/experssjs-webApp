const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { Post, validate } = require('../models/post')
const lodash = require('lodash')
const checkRole = require('../middleware/checkRole')
const checkAuth = require('../middleware/checkAuth')
const asyncMiddleware = require('../middleware/asyncmiddleware')

router.post('/create', [checkAuth, checkRole], asyncMiddleware(async (req, res) => {
    const { error } = await validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) };
    const post = new Post(lodash.pick(req.body, ['title', 'description', 'tags', 'imageUrl']))
    post.author = req.user._id;
    await post.save();
    return res.status(200).send(`new post created:${post}`)
}))
//update post
router.put('/edit/:id', [checkAuth, checkRole], asyncMiddleware(async (req, res) => {
    const { error } = await validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) };
    let findPost = await Post.findById(req.params.id);
    if (!findPost) return res.status(400).send(`there is not post by this ${req.params.id}`)

    const post = new Post(lodash.pick(req.body, ['title', 'description', 'tags', 'imageUrl']))
    post.author = req.user._id;

    findPost.title = post.title;
    findPost.description = post.description;
    findPost.imageUrl = post.imageUrl;
    findPost.author = post.author;
    findPost.tags = post.tags;
    await findPost.save();
    return res.status(200).send(`new post created:${findPost}`)
}))
//delete post 
router.delete('/delete/:id', [checkAuth, checkRole], asyncMiddleware(async (req, res) => {

    let findPost = await Post.findById(req.params.id);
    if (!findPost) return res.status(400).send(`there is not post by this ${req.params.id}`)
    await Post.deleteOne(findPost)
    return res.status(200).send('post is deleted')
}))
//get all post
router.get('/', [checkAuth, checkRole], asyncMiddleware(async (req, res) => {
    const posts = await Post.find();
    return res.status(200).send(`all post : ${posts}`)
}))
module.exports = router