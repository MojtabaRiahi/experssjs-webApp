const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { Post, validate } = require('../models/post')
const lodash = require('lodash')
const bcrypt = require('bcrypt')
const checkRole = require('../middleware/checkRole')
const checkAuth = require('../middleware/checkAuth')
const asyncMiddleware = require('../middleware/asyncmiddleware')

router.post('/create', [checkAuth, checkRole], asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) { res.status(400).send(error.details[0].message) };
    const post = new Post(lodash.pick(req.body), ['title', 'description', 'tags', 'imageUrl'])
    post.author = req.user._id;
    await post.save();
    return res.status(200).send(`new post created:${post}`)

}))