var express=require('express')
const bodyParser = require('body-parser');
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var apiindex=require('./api/index');
app.listen(3000);
app.use('/api/', apiindex);
console.log('listen to port 3000');