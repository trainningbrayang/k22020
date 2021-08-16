var express = require('express');
var router = express.Router();
var userdataModel = require('../model/userdata');
var infoModel = require('../model/infoModel');
router.get('/mess', mess);
router.post('/checkInfo', checkInfo)
router.route("/changeName").post(changeName);
function mess(req, res) {
    res.send(" Helo test ok");
}
function checkInfo(req, res) {

    var name = req.username;
    let data = {
        "name": name

    }
    res.json(data);

}
async function changeName(req, res) {
    let user = await userdataModel.findOne({ "token": req.token });
    if (user != undefined) {

        let info = await infoModel.findOne({ "username": user.username });
        if (info != undefined) {
            info.name = req.body.name;
            info.save((err) => {
                if (err) {
                    res.status(400).send("change namw fail");
                }
                else {
                    res.status(200).send("change name ok");

                }

            });
        }
        else {
            res.status(400).send("change name fail, user not found ");
        }

    }
    else {
        res.status(400).send("change name fail, user not found ");
    }
}
module.exports = router;