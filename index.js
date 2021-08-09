var express = require('express');// static 

var app = express();
// middle ware 
app.use(express.urlencoded({ extended: false }));
// use middle ware 
var module_auth = require('./api/authentication');
app.use('/auth', module_auth);

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