const express = require('express');
const router = express.Router();
const joi = require('joi');
const bcrypt = require('bcrypt');
const lodash = require('lodash');
const { User } = require('../models/user')


//log in user route
router.post('/', async (req, res) => {
    //check validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //if req is validate => find user
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid email or password !');
    //check password
    const checkPass = await bcrypt.compare(req.body.password, user.password);
    if (!checkPass) return res.status(400).send('invalid email or password !')
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(`welcome ${user.name} !`);

})


//create validate function for login
function validate(req) {
    const schema = {
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(1024).required()
    }
    return joi.validate(req, schema)
}
module.exports=router;