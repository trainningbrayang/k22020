var express = require('express');// static 
var mongoss = require('mongoose');
mongoss.Promise = global.Promise;
var app = express();
// middle ware 
app.use(express.urlencoded({ extended: false }));
// use middle ware 
var module_auth = require('./api/authentication');
app.use('/auth', module_auth);

// mongo db
let option = { useNewUrlParser: true };
const urlMongodb = "mongodb://34.126.85.26:27017/k22020";
mongoss.connect(urlMongodb, option).then(() => {
    console.log("connect mongo ok");
}, () => {
    console.log("connect mongo fail");
});
var data = require('./api/dataControl');
app.use('/data', data);

var token = require('./api/token');
app.use(token);
var module_Info = require('./api/info');
app.use('/info', module_Info);



// var server = app.listen(5000, () => {

//     console.log("SERVER START, PORT: 5000");
// });
// Arrow function , lamda expression
var server = app.listen(5000, function () {

    console.log("SERVER START, PORT: 5000");
});
// test git
