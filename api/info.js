var express = require('express');
var router = express.Router();
var userdataModel = require('../model/userdata');
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
    let user = await userdataModel.findOne({ "username": req.username });
    if (user != undefined) {
        user.name = req.body.name;
        user.save((err) => {
            if (err) {
                res.status(400).send("change namw fail");
            }
            else {
                res.status(200).send("change name ok");

            }

        });
    }
}
module.exports = router;