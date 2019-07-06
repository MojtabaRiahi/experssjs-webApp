const winston=require('winston')
module.exports=function (err,req,res,next){
   // winston.log(level,error message,all error option)
   //level:error warn info verbose debug silly
    winston.error(err.message,err);
    res.status(500).send("something failed . . .");
}