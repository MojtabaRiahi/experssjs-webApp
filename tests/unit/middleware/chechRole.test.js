const mongoose = require('mongoose')
const checkRole = require('../../../middleware/checkRole')
describe("checkRole middleWare", () => {
    const mockResponce = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.send = jest.fn().mockReturnValue(res);
        return res;
    }
    const next = jest.fn();
    it("should return 403 error if user role is not admin", () => {
        const user = { _id: mongoose.Types.ObjectId().toHexString, isAdmin: false }
        const req = {
            user: user
        }
        res = mockResponce();
        checkRole(req, res, next)
        expect(res.status).toHaveBeenCalledWith(403)
    })
})