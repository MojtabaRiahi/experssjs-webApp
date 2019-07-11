const express = require('express');
const router = express.Router();
const { validate } = require('../models/user')
const asyncMiddleware = require('../middleware/asyncmiddleware')
const authService = require('../service/auth.service')

router.post('/register', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const result =await authService.register(req.body);
    res.status(400).send(result)
}))

//log in user route
router.post('/login', asyncMiddleware(async (req, res) => {
    //check validation
    const { error } = authService.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const result = authService.userLogin(req.body);
    if (!result.ok) return res.status(400).send(result);
    res.header('x-auth-token', result.token).send(`welcome ${result.user.name} !`);
}))


//create validate function for login

module.exports = router;