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
    password : '',
    database : 'data',
});
connection.connect();//数据库连接
router.post('/log',function(req,res){
	console.log(req.body);
	var a=req.body;
	
})
//显示所有人得预约情况
router.post('/view', function (req, res) {
    var select_guan='select room,user.name,user.id,time,state from reserves,user where reserves.id=user.id';
	connection.query(select_guan,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(200).send(result);
        }
    })
});