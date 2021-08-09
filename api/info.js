var express = require('express');
var router = express.Router();
router.get('/mess', mess);
router.post('/checkInfo', checkInfo)
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
module.exports = router;