const UserSerVice = require('./user.service')

class AuthService {

    constructor() {
      userService=new UserSerVice();
    }
    async register(userData) {
        const result = userService.createUser(userData)
        if(result.ok){
            await this.userLogin(result)
        }

    }
    async userLogin(user){
        const token = user.generateAuthToken();
       // res.header('x-auth-token', token).send(lodash.pick(user, ["name", "email"]));
    }
}
module.exports = AuthService;