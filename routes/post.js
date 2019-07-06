const express = require('express')
const router = express.Router()
const { validate } = require('../models/post')
const PostService = require('../service/post.service')
const checkRole = require('../middleware/checkRole')
const checkAuth = require('../middleware/checkAuth')
const asyncMiddleware = require('../middleware/asyncmiddleware')

const postService = new PostService();

router.post('/create', [checkAuth, checkRole], asyncMiddleware(async (req, res) => {
    const { error } = await validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) };
    //postService = new postService();
    const post = await postService.createPost(req.body, req.user._id)
    return res.status(200).send(`new post created:${post}`)
}))

//update post
router.put('/edit/:id', [checkAuth, checkRole], asyncMiddleware(async (req, res) => {
    const { error } = await validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) };
    const result = await postService.updatePost(req.params.id, req.body, req.user._id);
    if (!result.title) return res.status(400).send(`bad-request : ${result}`)
    return res.status(200).send(` post updated:${result}`)
}))
//delete post 
router.delete('/delete/:id', [checkAuth, checkRole], asyncMiddleware(async (req, res) => {
    const result = await postService.deletePost(req.params.id);
    if (!result.ok) return res.status(400).send(`bad-request : ${result}`)
    return res.status(200).send('post is deleted')
}))
//get all post
router.get('/', [checkAuth, checkRole], asyncMiddleware(async (req, res) => {
    const posts = await postService.getAllPost()
    return res.status(200).send(`all post : ${posts}`)
}))
module.exports = router