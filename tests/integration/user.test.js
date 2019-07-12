const request = require('supertest')
const express = require('express'); 
const {User}=require('../../models/user')
const app = express();
const mongoose=require('mongoose')
let db;
let server;
describe('/api/users/', () => {
    it('',()=>{
        
    })
//     beforeEach(async ()=>{
//        db= await mongoose.connect('mongodb://localhost/myTeamProject_test',{useNewUrlParser: true})
//        server = app.listen(3000);
//     })
//     afterEach(async ()=>{
        
//         await User.remove({});
//        await db.connection.close()
//       await server.close();
//     })
//     //
//     describe('Get /', () => {
        
//         it('should return all users', async () => {
//             try{
//                  await User.collection.insertMany([
//                 {name:'mojtaba',email:'mo@gmail.com',password:'123456'},
//                 {name:'ali',email:'ali55@gmail.com',password:'123456'}
//             ]);
//                 const res = await request(app).get('/api/users');
//                 expect(res.status).toBe(200);
//                 expect(res.body).toHaveProperty('name','mojtaba');
            
//             }
//             catch(ex){
//             }

//         })
//     })
 })