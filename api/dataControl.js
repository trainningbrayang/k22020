var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var fs = require('fs');
var privatekey = fs.readFileSync('./data/privatekey.txt');
var userdataModel = require('../model/userdata');

router.route("/signup").post(signup);
router.route("/signin").post(signin);
async function signup(req, res) {

    let user = await userdataModel.findOne({ "username": req.body.username });
    if (user != undefined) {
        res.status(400).send(" user unavailabe");
    }
    else {
        let token = jwt.sign({ username: req.body.username }, privatekey, { expiresIn: "30m" });
        await userdataModel.create({
            username: req.body.username,
            password: req.body.password,
            token: token,
            name: req.body.name,
            age: req.body.age
        }).then(() => {

            res.status(200).send(token);

        }, (err) => {

            res.status(400).send(" signup fail " + err);

        });
    }

}
async function signin(req, res) {

    let user = await userdataModel.findOne({ "username": req.body.username });
    if (user != undefined) {
        if (user.password == req.body.password) {
            // verify token 
            let token = user.token;
            jwt.verify(token, privatekey, (err, decode) => {
                if (err) {
                    let newtoken = jwt.sign({ username: req.body.username }, privatekey, { expiresIn: "30m" });
                    user.token = newtoken;
                    user.save();
                    res.status(200).send(newtoken);
                }
                else {
                    // req.username = decode.userid;
                    res.status(200).send(token);
                }
            })

        }
        else {
            res.status(400).send(" passWord invalid ");
        }
    }
    else {
        res.status(400).send(" user name invalid ");
    }
}
module.exports = router;