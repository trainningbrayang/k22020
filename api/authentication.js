var fs = require('fs');
var express = require('express');
var jwt = require("jsonwebtoken");

var router = express.Router();
router.post("/signin", signin);
router.post('/signup', signup)
var privatekey = fs.readFileSync('./data/privatekey.txt');
function signup(req, res) {
    fs.readFile('./data/userdata.json', 'utf8', (err, data) => {
        if (err != null) {
            res.status(400).send("signup fail");
        }
        else {
            let objectDatas = [];
            let e = undefined;

            if (data.length <= 0) {
                console.log("null");
            }
            else {
                objectDatas = JSON.parse(data);
                e = objectDatas.find(x => x.user === req.body.user);
            }
            if (e !== undefined) {
                res.status(400).send("signup fail, user unavailabe");
            }
            else {
                let userdata = {
                    "user": req.body.user,
                    "pass": req.body.pass
                }
                objectDatas.push(userdata);
                let data_add = JSON.stringify(objectDatas);
                fs.writeFile('./data/userdata.json', data_add, (err) => {
                    if (err != null) {
                        res.status(400).send("signup fail ");
                    }
                    else {
                        let token = jwt.sign({ userid: req.body.user }, privatekey, { expiresIn: "1m" });
                        res.status(200).send(token);

                    }
                })
            }

        }
    });
}
function signin(req, res) {
    fs.readFile('./data/userdata.json', 'utf8', (err, data) => {
        if (err != null) {
            res.status(400).send("Signin data err");
        }
        else {
            let objectDatas = [];
            let e = undefined;

            if (data.length <= 0) {
                res.status(400).send("Signin data null");
            }
            else {
                objectDatas = JSON.parse(data);
                e = objectDatas.find(x => x.user === req.body.user);
                if (e !== undefined) {
                    if (e.pass === req.body.pass) {
                        let token = jwt.sign({ userid: req.body.user }, privatekey, { expiresIn: "1m" });
                        res.status(200).send(token);
                    }
                    else {
                        res.status(400).send("sign in , pass invalid");
                    }
                }
                else {
                    res.status(400).send("sign in , user invalid");
                }
            }
        }
    });
}
module.exports = router;


