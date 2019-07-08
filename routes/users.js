const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { User, validate } = require('../models/user')
const checkRole = require('../middleware/checkRole')
const checkAuth = require('../middleware/checkAuth')
const asyncMiddleware = require('../middleware/asyncmiddleware')
const userService = new userService();
// create new user
router.post('/create', asyncMiddleware(async (req, res) => {
    // validate input
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    // check username or email and save in db
    const result = await userService.createUser(req.body);
    if (!result.ok) return res.status(400).send(`bad-request : ${result}`)
    return res.status(200).send(`new user created: ${result}`);

}));

//update user by id
router.put('/update/:id', [checkAuth, checkRole], asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //find user
    const getUser = await User.findById(req.params.id);
    //check user
    if (!getUser) {
        return res.status(400).send('error : dose not exist user with this id')
    }
    //set property and save
    getUser.name = req.body.name;
    getUser.email = req.body.email;
    getUser.password = req.body.password;
    getUser.save();
    console.log(getUser);
    res.send(`user updated : ${getUser}`)

    //second way for  update
    // getUser.update({_id:req.params.id},{$set:{name:req.body.name,email:req.body.email,password:req.body.password}})
}))
//delete user by id

router.delete('/delete/:id', [checkAuth, checkRole], asyncMiddleware(async (req, res) => {
    //find user
    const user = await User.findById(req.params.id);
    //check user
    if (!user) {
        return res.status(400).send('error : dose not exist user with this id')
    }
    console.log(req.user.id)
    //if exist => delete user
    user.delete({ _id: req.params.id })
    console.log(req.params.id)
    res.send(`delete user  :${user.name}`)
}))

//get my profile 
router.post('/me', checkAuth, asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
}))

//show all user
router.get('/', [checkAuth, checkRole], asyncMiddleware(async (req, res) => {

    const getAllUser = await User.find().select('-password');
    res.status(200).send(getAllUser);
}))
module.exports = router;