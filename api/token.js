var jwt = require('jsonwebtoken');
var fs = require('fs');
// create middle ware
var privatekey = fs.readFileSync('./data/privatekey.txt');
var MiddleWareTest = function (req, res, next) {
    let token = req.headers["accesstoken"];
    if (token) {
        jwt.verify(token, privatekey, (err, decode) => {
            if (err) {
                res.status(401).send("Access denied");
            }
            else {
                req.username = decode.username;
                req.token = token;
                next();
            }
        })
    }
    else {
        res.status(401).send("Access Deneid");
    }
}
module.exports = MiddleWareTest;