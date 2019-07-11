const UserSerVice = require('./user.service')
const lodash = require('lodash')
class AuthService {

    constructor() {
        userService = new UserSerVice();
    }
    async register(userData) {
        const result = await userService.createUser(userData)
        if (!result.email) return result;
        await this.userLogin(result)
    }
    async userLogin(userData) {
        //if req is validate => find user
        let user = await User.findOne({ email: userData.email });
        if (!user) return new Error('invalid username or password !')
        //check password
        const checkPass = await this.checkPassword(userData.password, user.password)
        if (!checkPass) return new Error('invalid username or password !')
        const token = user.generateAuthToken();
        const data = { token: token, user: lodash.pick(user, ['name', 'email']) };
        return data;
    }
    async checkPassword(sendPassword, userPassword) {
        return await bcrypt.compare(sendPassword, userPassword);

    }
    //validate login data
    validate(loginData) {
        const schema = {
            email: joi.string().min(5).max(255).required().email(),
            password: joi.string().min(5).max(1024).required()
        }
        return joi.validate(loginData, schema)
    }
}
module.exports = AuthService;