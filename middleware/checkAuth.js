const jwt = require('jsonwebtoken');
const config = require('config');
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) res.status(401).send('Error: there is not exist token  ...');
    try {
        const decode = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decode;
        next();
    } catch (ex) {
        res.status(400).send('invalid token')
    }
}
module.exports=auth;