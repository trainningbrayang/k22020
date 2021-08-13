var express = require('express');
var router = express.Router();
var userdataSchema = require('../model/userdata');

router.route("/createUser").post(createUser);
async function createUser(req, res) {
    await userdataSchema.create({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        age: req.body.age
    });
    res.send(" create ok");
}
module.exports = router;