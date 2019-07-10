const lodash = require('lodash')
const bcrypt = require('bcrypt')
const { User } = require('../models/user')

class UserService {
    //create new user
    async createUser(userData) {
        const result = await this.findUserByEmail(userData.email)
        if (result) {
            const user = await this.addUserInDb(userData)
            return await this.deletePassword(user)
        }
        return new Error('this username already exist !')
    }
    //update user info 
    async updateUser(user, userId) {
        const checkUser = await this.findUserById(userId);
        if (checkUser) {
            const { name, email, password } = user
            //set property and save
            const result = await checkUser.set({ name, email, password }).save();
            return await this.deletePassword(result)
            //second way for  update
            // getUser.update({_id:req.params.id},{$set:{name:req.body.name,email:req.body.email,password:req.body.password}})
        }
        return new Error('can not find user !')
    }
    //delete userform database
    async deleteUser(userId) {
        const checkUser = await this.findUserById(userId);
        if (checkUser) return await User.remove(checkUser)
        return new Error('can not find user !')
    }
    //get all user
    async getAll() {
        return await User.find().select('-password')
    }
    //save user in database
    async addUserInDb(userData) {
        let user = new User(lodash.pick(userData, ["name", "email", "password"]));
        await this.hashPassword(user)
        user = await user.save();
        return user;
    }
    //hash password of user
    async hashPassword(user) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
    //find user by email
    async findUserByEmail(email) {
        let user = await User.findOne({ email });
        if (user) return false;
        return true;

    }
    //find user by id
    async findUserById(userId) {
        return await User.findById(userId);
    }
    //delete password from object
    async deletePassword(user) {
        let userObj = user.toObject();
        delete userObj['password']
        console.log(user)
        return userObj;
    }
}
module.exports = UserService;