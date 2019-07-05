const { User } = require('../../../models/user')
const checkAuth = require('../../../middleware/checkAuth')
const mongoose=require('mongoose');
describe('checkAuth middleware', () => {
    it('check user auth with valid jwt', () => {
        const token = new User().generateAuthToken();
        //create all input of checkAuth middleWare with mock Function
        const req = {
            header: jest.fn().mockReturnValue(token)
        };
        const res = {};
        const next = jest.fn();
        checkAuth(req, res, next);
        expect(req.user).toBeDefined();
    })
    //test by specific user
    it('if token is valid should return specific user',()=>{
        const user={_id: new mongoose.Types.ObjectId().toHexString(),isAdmin:true}
        const token =new User(user).generateAuthToken();
        const req={
            header:jest.fn().mockReturnValue(token)
        };
        const res={};
        const next=jest.fn();
        checkAuth(req,res,next);
        expect(req.user).toMatchObject(user)
    })
})