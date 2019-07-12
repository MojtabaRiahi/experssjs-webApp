const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const { validate } = require('../../../models/user')

describe('User.generateAuthToken', () => {
    it('should return a valid jwt', () => {
        const payload = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true }
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    })

})
describe('validate user', () => {

    it('should return valide data', () => {
        const user = { name: 'mojtaba', email: 'mojtabariahi@gmail.com', password: '123456' }
        const result = validate(user);
        expect(result.error).toBeNull()

    })
})
