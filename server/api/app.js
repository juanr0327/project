var express = require('express');
var uuid = require('uuid');
var mysql = require('mysql');
var fs = require('fs');
var busboy = require('connect-busboy')

var multer = require('multer');

var router = express.Router();
var upload = multer({dest: 'upload/'})

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'data',
});
connection.connect();//数据库连接
router.post('/log',function(req,res){
	console.log(req.body);
	var a=req.body;
	
})
