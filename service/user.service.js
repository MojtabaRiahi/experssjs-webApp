const lodash = require('lodash')
const bcrypt = require('bcrypt')
const { User } = require('../models/user')

class UserService {

    async createUser(userData) {
        if (await findUserByEmail(userData.email)) {
            const user = await addUserInDb(userData)
            return user;
        }
        return new Error('this username already exist !')
    }
    async addUserInDb(userData) {
        let user = new User(lodash.pick(userData, ["name", "email", "password"]));
        await this.hashPassword(user)
        user = await user.save();
        user = delete user['password'];
        return user;
    }
    
    async hashPassword(user) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
    async findUserByEmail(email) {
        let user = await User.findOne({ email });
        if (user) return false;
        return true;

    }
    async findUserById(userId) {
       return await User.findById(userId);
    }
}
module.exports = UserService;