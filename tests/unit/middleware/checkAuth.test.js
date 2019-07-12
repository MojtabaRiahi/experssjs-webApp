const { User } = require('../../../models/user')
const checkAuth = require('../../../middleware/checkAuth')
const mongoose = require('mongoose');
describe('checkAuth middleware', () => {
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.send = jest.fn().mockReturnValue(res);
        return res;
    }
    const next = jest.fn();
    it("should return Error", () => {
        const arg = [null, 0, false, NaN, "", undefined];
        const res = mockResponse()
        arg.forEach(a => {
            const req = {
                header: jest.fn().mockReturnValue(a)
            };
            checkAuth(req, res, next);
            expect(res.status).toHaveBeenCalledWith(401)
        })
    })


    it('check user auth with valid jwt', () => {
        const token = new User().generateAuthToken();
        //create all input of checkAuth middleWare with mock Function
        const req = {
            header: jest.fn().mockReturnValue(token)
        };
        const res = mockResponse();
        checkAuth(req, res, next);
        expect(req.user).toBeDefined();
    })
    //test by specific user
    it('if token is valid should return specific user', () => {
        const user = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true }
        const token = new User(user).generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        };
        const res = mockResponse();
        checkAuth(req, res, next);
        expect(req.user).toMatchObject(user)
    })
})