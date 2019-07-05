const mongoose = require('mongoose')
const joi = require('joi')
const jwt=require('jsonwebtoken');
const config=require('config')
//create user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})
//generate authtoken for user by create method for userSchema
userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
    return token;
}
//create validation function for user model
function validateUser(user) {
    const schema = {
        name: joi.string().min(5).max(50).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(1024).required()
    };
    return joi.validate(user, schema);
}

const User = mongoose.model('User', userSchema);


//export modules in this document
module.exports.User = User;
module.exports.validate=validateUser;