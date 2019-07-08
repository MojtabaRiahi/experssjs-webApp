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
    const result = await userService.updateUser(req.body, req.params.id)
    if (!result.ok) {
        return res.status(400).send(result)
    }
    res.status(200).send(`user updated : ${result}`);
}))
//delete user by id

router.delete('/delete/:id', [checkAuth, checkRole], asyncMiddleware(async (req, res) => {
    const result = userService.deleteUser(req.prams.id);
    if (!result.ok) return res.status(400).send(`bad-request : ${result}`)
    res.status(200).send(`delete user  :${user.name}`)
}))

//get my profile 
router.post('/me', checkAuth, asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
}))

//show all user
router.get('/', [checkAuth, checkRole], asyncMiddleware(async (req, res) => {
    const result = await userService.getAll();
    res.status(200).send(result);
}))
module.exports = router;