const express = require('express');
const router = express.Router();
const joi = require('joi');
const bcrypt = require('bcrypt');
const lodash = require('lodash');
const { User } = require('../models/user')

const authService = require('../service/auth.service')
//log in user route
router.post('/login', async (req, res) => {
    //check validation
    const { error } = authService.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const result = authService.userLogin(req.body);
    if (!result.ok) return res.status(400).send(result);
    res.header('x-auth-token', result.token).send(`welcome ${result.user.name} !`);
})


//create validate function for login

module.exports = router;