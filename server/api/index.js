var express = require('express');
var uuid = require('uuid');
var mysql = require('mysql');
var fs = require('fs');
var busboy = require('connect-busboy')
var idpingjia1 = 6;
var multer = require('multer');

var router = express.Router();
var upload = multer({ dest: 'upload/' })

var http = require('http');
var url = require('url');
var qs = require('querystring');
/*,
  fs = require('fs'),
  TITLE = 'fromidable1',
  AVATAR_UPLOAD_FOLDER = '/avator/',
  domain = 'http://localhost:3000';*/


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'data',
});




connection.connect();

var findsql = 'select password,tel,authority,id from data.web where id = ? or tel=?';
//用户登录
router.post('/login', function (req, res) {
    //console.log(req.body);
    var arg = req.body;
    var id = arg.userName;
    var password = arg.password;
    var tel = arg.userName;
    var param = [id, tel];
    connection.query(findsql, param, function (err, result) {
        if (err) {
            res.status(202).send("err");
            return;
        }
        if (result != '') {
            console.log(result);
            if (result[0].password == password) {

                res.status(200).send(result);

            }
            else {
                res.status(202).send("err")
            }
        }
        else {
            res.status(202).send("err")
        }
    });
});


//新建转账任务 
router.post('/createorder', function (req, res) {
    var arg = req.body;
    // console.log('查看request对象',req.body);
    var money = arg.amount;
    var accountto = arg.receiverAccount[1];
    var accountout = arg.payAccount[1];
    var time = arg.time;
    var bankout = arg.payAccount[0];
    var bankto = arg.receiverAccount[0];
    var state = "notstart";
    var idoperator = 2;
    var pa = [accountto, accountout, money, time, bankout, bankto, state, idoperator];
    //insert into data.orders(accountto,accountout,od_money,od_time,bankout,bankto,od_state,idoperator) values('111','222','333','2019-04-11 11:42:07','444','555','notstart','1');
    var select_guan = 'insert into data.orders(accountto,accountout,od_money,od_time,bankout,bankto,od_state,idoperator) values(?,?,?,?,?,?,?,?);';
    if (accountto && accountout && money && time && bankout && bankto) {
        connection.query(select_guan, pa, function (err, result) {
            console.log(result);
            if (err) {
                res.status(202).send('err')
            }
            else {
                console.log(result);
                res.status(200).send(result);
            }
        })
    }
});
//新建操作员 
router.post('/createoperator', function (req, res) {
    var arg = req.body;
    console.log('查看request对象', req.url);
    console.log(arg);
    var op_name = arg.op_name;
    var op_tel = arg.op_tel;
    var tel = arg.op_tel;
    var op_email = arg.op_email;
    var op_password = '123456';
    var password = '123456';
    var op_paymentcode = '123456';
    var idmanager = '0';
    var authority = '1';
    var pa = [authority, idmanager, op_name, op_tel, op_email, op_password, op_paymentcode, tel, password, authority];
    var select_guan = 'insert into data.operator(authority,idmanager,op_name,op_tel,op_email,op_password,op_paymentcode) values(?,?,?,?,?,?,?);insert into data.web(tel,password,authority) values(?,?,?);';
    connection.query(select_guan, pa, function (err, result) {
        console.log(result);
        if (err) {
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//新建设备
router.post('/addequipment', function (req, res) {
    var arg = req.body;
    console.log('查看request对象', req.url);
    console.log(arg);
    var idequipment = arg.idequipment;
    var duankou = arg.duankou;
    var pa = [idequipment, duankou];
    var select_guan = 'insert into data.equipment(idequipment,duankou) values(?,?);';
    connection.query(select_guan, pa, function (err, result) {
        console.log(result);
        if (err) {
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//新建worklog
router.post('/createWorklog', function (req, res) {
    var arg = req.body;
    console.log('查看request对象', req.url);
    console.log(arg);
    var wk_time = arg.wk_time;
    var wk_content = arg.wk_content;
    var wk_state = '未读';
    var idoperator = 0;
    var pa = [wk_time, wk_content, wk_state, idoperator];
    var select_guan = 'insert into data.worklog(wk_time,wk_content,wk_state,idoperator) values(?,?,?,?);';
    if (wk_time && wk_content) {
        connection.query(select_guan, pa, function (err, result) {
            console.log(result);
            if (err) {
                res.status(202).send('err')
            }
            else {
                console.log(result);
                res.status(200).send(result);
            }
        })
    }
});
//新建转出银行卡
router.post('/createcard', function (req, res) {
    var arg = req.body;
    console.log('查看request对象', req.url);
    console.log(arg);
    var tel = arg.tel;
    var card_id = arg.card_id;
    var name = arg.name;
    var bank = arg.bank;
    var money = arg.money;
    var idoperator = arg.idoperator;
    var pa = [card_id, money, bank, name, tel, idoperator];
    var select_guan = 'insert into data.card(card_id,money,bank,name,tel,idoperator) values(?,?,?,?,?,?);';
    if (card_id && money && idoperator && bank && name && tel) {
        connection.query(select_guan, pa, function (err, result) {
            console.log(result);
            if (err) {
                res.status(202).send('err')
            }
            else {
                console.log(result);
                res.status(200).send(result);
            }
        })
    }
});
//新建转入银行卡
router.post('/createcardto', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = req.body;
    console.log(arg);
    var cardto_id = arg.cardto_id;
    var name = arg.name;
    var bank = arg.bank;
    var idoperator = arg.idoperator;
    var pa = [cardto_id, name, bank, idoperator];
    var select_guan = 'insert into data.cardto(cardto_id,name,bank,idoperator) values(?,?,?,?);';
    if (cardto_id && idoperator && bank && name) {
        connection.query(select_guan, pa, function (err, result) {
            console.log(result);
            if (err) {
                res.status(202).send('err')
            }
            else {
                console.log(result);
                res.status(200).send(result);
            }
        })
    }
});
//修改密码(user)
router.post('/updatepassword', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = req.body;
    var op_password = arg.op_password;
    var op_paymentcode = arg.op_paymentcode;
    var tel = arg.tel;
    var pa = [op_password, op_paymentcode, tel];
    var select_guan = 'update data.operator set op_password=?,op_paymentcode=? where op_tel=?;';
    connection.query(select_guan, pa, function (err, result) {
        console.log(result);
        if (err) {
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//修改密码(admin)
router.post('/updatepassword2', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = req.body;
    var op_password = arg.op_password;
    var pa = [op_password];
    var select_guan = 'update data.manager set ma_password=? ;';
    connection.query(select_guan, pa, function (err, result) {
        console.log(result);
        if (err) {
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//修改个人信息(user)
router.post('/updategerenxinxi', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = req.body;
    console.log(arg.tel);
    var op_email = arg.op_email;
    var op_address = arg.op_address;
    var signature = arg.signature;
    var tel = arg.tel;
    var paa = { op_address, op_email, signature };
    var pa = [tel];
    var num = 0;
    var sql = 'update data.operator set ';
    for (key in paa) {

        if (paa[key]) {
            if (num > 0) {
                sql += ',';
            }
            num = num + 1;
            sql += key + ' = ' + "'" + paa[key] + "'";
        }
    }

    sql += 'where op_tel' + ' = ' + "'" + tel + "';";

    connection.query(sql, [], function (err, result) {
        console.log(sql);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {

            res.status(200).send(result);
        }
    })
});
//修改个人信息(admin)
router.post('/updategerenxinxi2', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = req.body;
    console.log(arg.tel);
    var ma_email = arg.ma_email;
    var ma_address = arg.ma_address;
    var signature = arg.signature;
    var paa = { ma_address, ma_email, signature };
    var num = 0;
    var sql = 'update data.manager set ';
    for (key in paa) {

        if (paa[key]) {
            if (num > 0) {
                sql += ',';
            }
            num = num + 1;
            sql += key + ' = ' + "'" + paa[key] + "'";
        }
    }

    connection.query(sql, [], function (err, result) {
        console.log(sql);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {

            res.status(200).send(result);
        }
    })
});
//修改转出银行卡
router.post('/updatecard', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = req.body;
    var card_id = arg.CardId;
    var idoperator = arg.idoperator;
    var pa = [idoperator, card_id];
    var select_guan = 'update data.card set idoperator=? where card_id=?;';
    connection.query(select_guan, pa, function (err, result) {
        console.log(result);
        if (err) {
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//修改转入银行卡管理员
router.get('/updatecardto', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    var cardto_id = arg.cardto_id;
    var idoperator = arg.idoperator;
    var pa = [idoperator, cardto_id];
    var select_guan = 'update data.cardto set idoperator=? where cardto_id=?;';
    connection.query(select_guan, pa, function (err, result) {
        console.log(result);
        if (err) {
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});


//_查看转账历史记录
router.get('/recordHistory', function (req, res) {
    var arg = url.parse(req.url, true).query;
    var accountto = arg.accountto;
    var accountout = arg.accountout;
    var op_name = arg.op_name;
    var od_starttime = arg.od_starttime;
    var od_endtime = arg.od_endtime;
    var bankout = arg.bankout;
    var bankto = arg.bankto;
    var od_state = arg.od_state;
    var tel = arg.tel;
    console.log(tel);
    var paa = { accountto, accountout, op_name, od_starttime, od_endtime, bankout, bankto, od_state };
    var pa = [];//
    pa.push(tel);
    var sql = 'SELECT idorder, accountto,accountout,bankto,bankout,od_money,od_state,od_time,op_name FROM data.orders,data.operator where data.orders.idoperator=data.operator.idoperator and data.operator.op_tel=';
    sql += "'" + tel + "'";
    // var haveFirst = false;
    for (key in paa) {
        if (paa[key]) {
            if (key != 'od_starttime' && key != 'od_endtime') {
                console.log(key)
                sql += ' and '
                pa.push(paa[key]);
                sql += key + ' = ' + "'" + paa[key] + "'";
            } else {
                if (key == 'od_starttime') {
                    sql += ' and '
                    pa.push(paa[key]);
                    sql += 'od_time' + ' >= ' + "'" + paa[key] + "'";
                } else {
                    sql += ' and '
                    pa.push(paa[key]);
                    sql += 'od_time' + ' <= ' + "'" + paa[key] + "'";
                }
            }

        }

    }
    sql+='ORDER BY od_time desc';
    console.log(sql, pa);
    connection.query(sql, [], function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            //console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看转账历史记录
router.get('/recordHistory2', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    //console.log(arg);
    var accountto = arg.accountto;
    var accountout = arg.accountout;
    var op_name = arg.op_name;
    var od_starttime = arg.od_starttime;
    var od_endtime = arg.od_endtime;
    var bankout = arg.bankout;
    var bankto = arg.bankto;
    var od_state = arg.od_state;
    var paa = { accountto, accountout, op_name, od_starttime, od_endtime, bankout, bankto, od_state };
    var pa = [];//
    var sql = 'SELECT idorder, accountto,accountout,bankto,bankout,od_money,od_state,od_time,op_name FROM data.orders,data.operator where data.orders.idoperator=data.operator.idoperator ';
    for (key in paa) {
        if (paa[key]) {
            if (key != 'od_starttime' && key != 'od_endtime') {
                console.log(key)
                sql += ' and '
                pa.push(paa[key]);
                sql += key + ' = ' + "'" + paa[key] + "'";
            } else {
                if (key == 'od_starttime') {
                    sql += ' and '
                    pa.push(paa[key]);
                    sql += 'od_time' + ' >= ' + "'" + paa[key] + "'";
                } else {
                    sql += ' and '
                    pa.push(paa[key]);
                    sql += 'od_time' + ' <= ' + "'" + paa[key] + "'";
                }
            }
        }
    }
    sql+='ORDER BY od_time desc';
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看
router.get('/fetchNotice', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    //console.log(arg);
    var tel = arg.tel;
    var pa = [tel];//
    var sql = 'SELECT idorder, accountto,accountout,bankto,bankout,od_money,od_state,od_time,op_name FROM data.orders,data.operator where data.orders.idoperator=data.operator.idoperator and data.operator.op_tel=? and data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 3 DAY)';
    connection.query(sql, pa, function (err, result) {
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看
router.get('/fetchNotice2', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    //console.log(arg);
    var sql = 'SELECT idorder, accountto,accountout,bankto,bankout,od_money,od_state,od_time,op_name FROM data.orders,data.operator where data.orders.idoperator=data.operator.idoperator  and data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 3 DAY)';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看日志列表
router.get('/recordrizhi', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg.tel);
    var op_tel = arg.tel;
    var pa = [op_tel];//
    var sql = 'SELECT wk_time,wk_content,idworklog,wk_state FROM data.worklog,data.operator where data.operator.op_tel =? and data.worklog.idoperator=data.operator.idoperator';
    connection.query(sql, pa, function (err, result) {
        console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看日志列表
router.get('/recordrizhi2', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    var sql = 'SELECT photos,op_name, wk_time,wk_content,idworklog,wk_state FROM data.worklog,data.operator where data.worklog.idoperator=data.operator.idoperator and data.worklog.wk_time < CURDATE() AND data.worklog.wk_time >= DATE_SUB(CURDATE(), INTERVAL 3 DAY)';
    connection.query(sql, function (err, result) {
        console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看日志列表
router.get('/checkrizhi', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    var idworklog=arg.idworklog;

    var sql = ' update data.worklog set wk_state="已读" where idworklog=?';
    connection.query(sql, [idworklog],function (err, result) {
        console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看日志列表
router.get('/check', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    var idworklog=arg.idworklog;

    var sql = ' update data.detail set checkstate=1 where iddetail=?';
    connection.query(sql, [idworklog],function (err, result) {
        console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看转出银行卡列表（admin）
router.get('/recordCard', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);

    var sql = 'SELECT card_id,bank,op_name,money,name,tel  FROM data.card,data.operator where  data.card.idoperator=data.operator.idoperator';
    connection.query(sql, function (err, result) {
        console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            //console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看转出银行卡列表
router.get('/recordCard2', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg.tel);
    var idoperator = 0;
    var tel = arg.tel;
    var pa = [tel];//
    var sql = 'SELECT card_id,bank,op_name FROM data.card,data.operator where data.operator.op_tel =? and data.card.idoperator=data.operator.idoperator';
    connection.query(sql, pa, function (err, result) {
        console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            //console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看转入银行卡列表
router.get('/recordCardto', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    //console.log(arg);
    var sql = 'SELECT cardto_id,bank,op_name FROM data.cardto,data.operator where data.cardto.idoperator=data.operator.idoperator';
    connection.query(sql, function (err, result) {
        console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            //console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看转入银行卡列表
router.get('/recordCardto2', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg.tel);
    var tel = arg.tel;
    var idoperator = 0;
    var pa = [tel];//
    var sql = 'SELECT cardto_id,bank,op_name FROM data.cardto,data.operator where data.operator.op_tel =?  and data.cardto.idoperator=data.operator.idoperator';
    connection.query(sql, pa, function (err, result) {
        console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            //console.log(result);
            res.status(200).send(result);
        }
    })
});
//查看个人信息(user)
router.get('/view_gerenxinxi', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    var tel = arg.tel;
    var pa = [tel];//
    console.log(tel)
    var select_op = "select operator.idoperator,photos, op_birthday,op_name,op_tel,op_email,op_birthday,op_address,signature from data.operator where op_tel=? ";
    connection.query(select_op, pa, function (err, result) {
        if (err) {
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//查看个人信息(admin)
router.get('/view_gerenxinxi2', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    var select_op = "select photos, ma_birthday,ma_name,ma_tel,ma_email,ma_birthday,ma_address,signature from data.manager ";
    connection.query(select_op, function (err, result) {
        if (err) {
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//查看操作员
router.get('/view_op', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    var idmanager = '0';
    var pa = [idmanager];//
    var select_op = "select data.operator.idoperator,photos,op_name,op_tel,op_email,op_birthday,op_address,COUNT(data.orders.idoperator) AS ordernum,FORMAT(SUM(IF(data.orders.`od_state` = 'completed', 1, 0))*100/ IF(COUNT(data.orders.idoperator)=0,1,COUNT(data.orders.idoperator)), 2) AS percent from data.operator left join data.orders on data.operator.idoperator = data.orders.idoperator where idmanager=? GROUP BY data.operator.idoperator; ";
    connection.query(select_op, pa, function (err, result) {
        if (err) {
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//workplace
router.get('/feachuser', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    var tel = arg.tel;
    var pa = [tel];//
    var select_op = "select data.operator.idoperator,photos,op_name,sum(data.orders.od_money) AS money,COUNT(data.orders.idoperator) AS ordernum,FORMAT(SUM(IF(data.orders.`od_state` = 'completed', 1, 0))*100/ IF(COUNT(data.orders.idoperator)=0,1,COUNT(data.orders.idoperator)), 2) AS percent from data.operator left join data.orders on data.operator.idoperator = data.orders.idoperator where op_tel=? and data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY data.operator.idoperator; ";
    connection.query(select_op, pa, function (err, result) {
        if (err) {
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//workplace
router.get('/feachuser2', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    var select_op = "select sum(data.orders.od_money) AS money,count(*) AS ordernum,FORMAT(SUM(IF(data.orders.`od_state` = 'completed', 1, 0))*100/ IF(COUNT(*)=0,1,COUNT(*)), 2) AS percent from  data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)  ; ";
    connection.query(select_op, function (err, result) {
        if (err) {
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//查看设备
router.get('/view_equipment', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    var select_op = "select idequipment,data.equipment.duankou,COUNT(idduankou) AS num,FORMAT(SUM(IF(data.orders.`od_state` = 'completed', 1, 0))*100/ IF(COUNT(idduankou)=0,1,COUNT(idduankou)), 2) AS percent from data.equipment left join data.orders on data.equipment.idequipment = data.orders.idduankou GROUP BY data.equipment.idequipment; ";
    connection.query(select_op, function (err, result) {
        if (err) {
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看详细详情
router.get('/basic', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    var idorder = arg.id;
    var pa = [idorder];//
    var sql = 'SELECT name,accountto,accountout,bankto,bankout,od_money,od_state,od_time,op_name,starttime,endtime,begintotransfer,Pfill,Plogin,Presult,Pverify,checktime FROM data.cardto,data.orders,data.detail,data.operator where data.orders.idoperator=data.operator.idoperator and data.cardto.cardto_id =data.orders.accountto  and data.orders.idorder=data.detail.iddetail and data.orders.idorder=?;';
    connection.query(sql, pa, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看详细详情
router.get('/advanced', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    var idorder = arg.id;
    var pa = [idorder];//
    var sql = 'SELECT name,tel,money,card_id,idorder,op_name,od_money,checkstate,starttime,endtime FROM data.card,data.orders,data.detail,data.operator  where data.orders.idoperator=data.operator.idoperator and data.card.card_id =data.orders.accountout  and data.orders.idorder=? and data.detail.iddetail=data.orders.idorder;';
    connection.query(sql, pa, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});

function getsumData() {
    // pa=[params1];
    var sql = 'SELECT IFNULL(sum(od_money),0) AS y,DATE_FORMAT(data.orders.od_time,"%Y-%m-%d") AS x from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY x ORDER BY x ASC;';
    var promise = new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    return promise
}
function getsumData2() {
    // pa=[params1];
    var sql = 'SELECT IFNULL(sum(od_money),0) AS y,DATE_FORMAT(data.orders.od_time,"%Y-%m-%d") AS x from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY x ORDER BY x ASC;';
    var promise = new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    return promise
}

function getcountData(params1) {
    pa = [params1];
    var sql = 'SELECT IFNULL(count(*),0) AS y,DATE_FORMAT(data.orders.od_time,"%Y-%m-%d") AS x from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL ? DAY) GROUP BY x ORDER BY x ASC;';
    var promise = new Promise((resolve, reject) => {
        connection.query(sql, pa, function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    return promise
}


function getsearchData(params1) {
    pa = [params1];
    //各个银行卡
    var sql = 'SELECT IFNULL(count(*),0) AS `range`,IFNULL(sum(od_money),0) AS count,ANY_VALUE(bankto ) AS `index`,accountto AS keyword from data.orders where data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL ? DAY) GROUP BY accountto ORDER BY count desc;';
    var promise = new Promise((resolve, reject) => {
        connection.query(sql, pa, function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    return promise
}

function getsalesData(params1) {
    pa = [params1];
    var sql = 'SELECT IFNULL(sum(od_money),0) AS y,DATE_FORMAT(data.orders.od_time,"%Y-%m") AS x from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL ? DAY) GROUP BY x ORDER BY x ASC;';
    var promise = new Promise((resolve, reject) => {
        connection.query(sql, pa, function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    return promise
}
function getofflineChartData(params1) {
    pa = [params1];
    var sql = 'SELECT IFNULL(sum(od_money),0) AS y1,IFNULL(count(*),0) AS y2,DATE_FORMAT(data.orders.od_time,"%Y-%m") AS x from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL ? DAY) GROUP BY x ORDER BY x ASC;';
    var promise = new Promise((resolve, reject) => {
        connection.query(sql, pa, function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    return promise
}
function getsalesTypeData(params1) {
    pa = [params1];
    //各个银行
    var sql = 'SELECT IFNULL(sum(od_money),0) AS y,bankout AS x from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL ? DAY) GROUP BY bankout ;';
    var promise = new Promise((resolve, reject) => {
        connection.query(sql, pa, function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    return promise
}
function getofflineData() {
    // pa=[params1];
    //各个操作员
    var sql = "select op_name AS name,FORMAT(SUM(IF(data.orders.`od_state` = 'completed', 1, 0))/ IF(COUNT(data.orders.idoperator)=0,1,COUNT(data.orders.idoperator)), 2) AS cvr from data.operator left join data.orders on data.operator.idoperator = data.orders.idoperator  GROUP BY data.operator.idoperator; ";
    // var sql='SELECT IFNULL(sum(od_money),0) AS y,bankout AS x from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL ? DAY) GROUP BY bankout ORDER BY num desc;';
    var promise = new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    return promise
}
//最近一年的转账总额，按月份统计
router.get('/chart_data', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    var visitData, visitData2, salesData, searchData, offlineData, offlineChartData, salesTypeData, salesTypeDataOnline, salesTypeDataOffline, radarData;
    var getFakeChartData = {
        visitData,
        visitData2,
        salesData,
        searchData,
        offlineData,
        offlineChartData,
        salesTypeData,
        salesTypeDataOnline,
        salesTypeDataOffline,
        radarData,
    };
    var radarOriginData = [
        {
            name: '个人',
            ref: 10,
            koubei: 8,
            output: 4,
            contribute: 5,
            hot: 7,
        },
        {
            name: '',
            ref: 3,
            koubei: 9,
            output: 6,
            contribute: 3,
            hot: 1,
        },
        {
            name: '部门',
            ref: 4,
            koubei: 1,
            output: 6,
            contribute: 5,
            hot: 7,
        },
    ];
    var searchData = [];
    for (let i = 0; i < 50; i += 1) {
        searchData.push({
            index: i + 1,
            keyword: `银行卡-${i}`,
            count: Math.floor(Math.random() * 1000),
            range: Math.floor(Math.random() * 100),
            status: Math.floor((Math.random() * 10) % 2),
        });
    }
    // getFakeChartData.visitData = getsumData();

    Promise.all([getsumData(), getsumData2(),getsalesData(365),getsalesTypeData(365),getsalesTypeData(30),getsalesTypeData(7),getofflineData(),getofflineChartData(30),radarOriginData,getsearchData(30)]).then((data) => {
        getFakeChartData.visitData = data[0];
        getFakeChartData.visitData2 = data[1];
        getFakeChartData.salesData = data[2];
        getFakeChartData.salesTypeData = data[3];
        getFakeChartData.salesTypeDataOnline =data[4];
        getFakeChartData.salesTypeDataOffline = data[5];
        getFakeChartData.offlineData = data[6];
        getFakeChartData.offlineChartData = data[7];
        getFakeChartData.radarOriginData = data[8];
        getFakeChartData.searchData = data[9];
        // send result
        res.status(200).send(getFakeChartData);
    }).catch(err => {
        console.log(err)
    })

});

function getsumData2() {
    // pa=[params1];
    var sql = 'SELECT IFNULL(sum(od_money),0) AS y,DATE_FORMAT(data.orders.od_time,"%Y-%m-%d") AS x from data.orders,data.operator WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)  and operator.op_tel="18523651254" and orders.idoperator=operator.idoperator GROUP BY x ORDER BY x ASC ;';
    var promise = new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    return promise
}
function getsumData22() {
    // pa=[params1];
    var sql = 'SELECT IFNULL(sum(od_money),0) AS y,DATE_FORMAT(data.orders.od_time,"%Y-%m-%d") AS x from data.orders,data.operator WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)  and operator.op_tel="18523651254" and orders.idoperator=operator.idoperator GROUP BY x ORDER BY x ASC;';
    var promise = new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    return promise
}

function getcountData2(params1) {
    pa = [params1];
    var sql = 'SELECT IFNULL(count(*),0) AS y,DATE_FORMAT(data.orders.od_time,"%Y-%m-%d") AS x from data.orders,data.operator WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL ? DAY)  and operator.op_tel="18523651254" and orders.idoperator=operator.idoperator GROUP BY x ORDER BY x ASC;';
    var promise = new Promise((resolve, reject) => {
        connection.query(sql, pa, function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    return promise
}


function getsearchData2(params1) {
    pa = [params1];
    //各个银行卡
    var sql = 'SELECT IFNULL(count(*),0) AS `range`,IFNULL(sum(od_money),0) AS count,ANY_VALUE(bankto ) AS `index`,accountto AS keyword from data.orders,data.operator where data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL ? DAY)  and operator.op_tel="18523651254" and orders.idoperator=operator.idoperator GROUP BY accountto ORDER BY count desc;';
    var promise = new Promise((resolve, reject) => {
        connection.query(sql, pa, function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    return promise
}

function getsalesData2(params1) {
    pa = [params1];
    var sql = 'SELECT IFNULL(sum(od_money),0) AS y,DATE_FORMAT(data.orders.od_time,"%Y-%m") AS x from data.orders,data.operator WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL ? DAY)  and operator.op_tel="18523651254" and orders.idoperator=operator.idoperator GROUP BY x ORDER BY x ASC;';
    var promise = new Promise((resolve, reject) => {
        connection.query(sql, pa, function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    return promise
}
function getofflineChartData2(params1) {
    pa = [params1];
    var sql = 'SELECT IFNULL(sum(od_money),0) AS y1,IFNULL(count(*),0) AS y2,DATE_FORMAT(data.orders.od_time,"%Y-%m") AS x from data.orders,data.operator WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL ? DAY)  and operator.op_tel="18523651254" and orders.idoperator=operator.idoperator GROUP BY x ORDER BY x ASC;';
    var promise = new Promise((resolve, reject) => {
        connection.query(sql, pa, function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    return promise
}
function getsalesTypeData2(params1) {
    pa = [params1];
    //各个银行
    var sql = 'SELECT IFNULL(sum(od_money),0) AS y,bankout AS x from data.orders,data.operator WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL ? DAY)  and operator.op_tel="18523651254" and orders.idoperator=operator.idoperator GROUP BY bankout ;';
    var promise = new Promise((resolve, reject) => {
        connection.query(sql, pa, function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    return promise
}
function getofflineData2() {
    // pa=[params1];
    //各个操作员
    var sql = "select op_name AS name,FORMAT(SUM(IF(data.orders.`od_state` = 'completed', 1, 0))/ IF(COUNT(data.orders.idoperator)=0,1,COUNT(data.orders.idoperator)), 2) AS cvr from data.operator left join data.orders on data.operator.idoperator = data.orders.idoperator  GROUP BY data.operator.idoperator; ";
    // var sql='SELECT IFNULL(sum(od_money),0) AS y,bankout AS x from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL ? DAY) GROUP BY bankout ORDER BY num desc;';
    var promise = new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    return promise
}
//最近一年的转账总额，按月份统计
router.get('/chart_data2', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    var visitData, visitData2, salesData, searchData, offlineData, offlineChartData, salesTypeData, salesTypeDataOnline, salesTypeDataOffline, radarData;
    var getFakeChartData = {
        visitData,
        visitData2,
        salesData,
        searchData,
        offlineData,
        offlineChartData,
        salesTypeData,
        salesTypeDataOnline,
        salesTypeDataOffline,
        radarData,
    };
    var radarOriginData = [
        {
            name: '个人',
            ref: 10,
            koubei: 8,
            output: 4,
            contribute: 5,
            hot: 7,
        },
        {
            name: '',
            ref: 3,
            koubei: 9,
            output: 6,
            contribute: 3,
            hot: 1,
        },
        {
            name: '部门',
            ref: 4,
            koubei: 1,
            output: 6,
            contribute: 5,
            hot: 7,
        },
    ];
    var searchData = [];
    for (let i = 0; i < 50; i += 1) {
        searchData.push({
            index: i + 1,
            keyword: `银行卡-${i}`,
            count: Math.floor(Math.random() * 1000),
            range: Math.floor(Math.random() * 100),
            status: Math.floor((Math.random() * 10) % 2),
        });
    }
    // getFakeChartData.visitData = getsumData();

    Promise.all([getsumData2(), getsumData22(),getsalesData2(365),getsalesTypeData2(365),getsalesTypeData2(30),getsalesTypeData2(7),getofflineData2(),getofflineChartData2(30),radarOriginData,getsearchData2(30)]).then((data) => {
        getFakeChartData.visitData = data[0];
        getFakeChartData.visitData2 = data[1];
        getFakeChartData.salesData = data[2];
        getFakeChartData.salesTypeData = data[3];
        getFakeChartData.salesTypeDataOnline =data[4];
        getFakeChartData.salesTypeDataOffline = data[5];
        getFakeChartData.offlineData = data[6];
        getFakeChartData.offlineChartData = data[7];
        getFakeChartData.radarOriginData = data[8];
        getFakeChartData.searchData = data[9];
        // send result
        res.status(200).send(getFakeChartData);
    }).catch(err => {
        console.log(err)
    })

});
//_查看最近一个月的转账总额
router.get('/fake_chart_data', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
 
    var startDate = arg.startDate;
    var endDate=arg.endDate;
    var pa=[endDate,startDate];//
    console.log(pa);
    var sql = 'SELECT IFNULL(sum(od_money),0) AS y,DATE_FORMAT(data.orders.od_time,"%Y-%m-%d") AS x from data.orders WHERE data.orders.od_time < ? AND data.orders.od_time >= ? GROUP BY x ORDER BY x ASC;';
    connection.query(sql,pa, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看最近一个月的转账总额
router.get('/fake_chart_data2', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    var tel = arg.tel;
    var startDate = arg.startDate;
    var endDate=arg.endDate;
    var pa=[endDate,startDate];//
    console.log(pa);
    var sql = 'SELECT IFNULL(sum(od_money),0) AS y,DATE_FORMAT(data.orders.od_time,"%Y-%m-%d") AS x from data.orders,data.operator WHERE data.orders.od_time < ? AND data.orders.od_time >= ? GROUP BY x ORDER BY x ASC and operator.op_tel="18523651254" and orders.idoperator=operator.idoperator;';
    connection.query(sql,pa, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看最近一个月的转账笔数（天数统计）
router.get('/year_total_num', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(count(*),0) AS num,DATE_FORMAT(data.orders.od_time,"%Y-%m-%d") AS show_time from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) GROUP BY show_time ORDER BY show_time ASC;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看最近一周的转账笔数（天数统计）
router.get('/year_total_num', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(sum(od_money),0) AS num,DATE_FORMAT(data.orders.od_time,"%Y-%m-%d") AS show_time from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) GROUP BY show_time ORDER BY show_time ASC;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看最近一周的转账笔数（天数统计）
router.get('/year_total_num', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(count(*),0) AS num,DATE_FORMAT(data.orders.od_time,"%Y-%m-%d") AS show_time from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) GROUP BY show_time ORDER BY show_time ASC;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看今天的转账总额
router.get('/today_total_num', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(sum(od_money),0) AS num,DATE_FORMAT(data.orders.od_time,"%Y-%m-%d") AS show_time from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) GROUP BY show_time ORDER BY show_time ASC;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看今天的转账笔数
router.get('/today_total_num', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(count(*),0) AS num,DATE_FORMAT(data.orders.od_time,"%Y-%m-%d") AS show_time from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) GROUP BY show_time ORDER BY show_time ASC;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每张银行卡的转入（一年）
router.get('/year_card_num', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(count(*),0) AS num,accountto  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) GROUP BY accountto ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每张银行卡的转出（一年）
router.get('/year_card_num', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(count(*),0) AS num,accountout  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) GROUP BY accountout ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每张银行卡的转入（一个月）
router.get('/month_card_num', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(count(*),0) AS num,accountto  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY accountto ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每张银行卡的转出（一个月）
router.get('/month_card_num', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(count(*),0) AS num,accountout  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY accountout ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每张银行卡的转入（一周）
router.get('/week_card_num', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(count(*),0) AS num,accountto  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY accountto ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每张银行卡的转出（一周）
router.get('/week_card_num', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(count(*),0) AS num,accountout  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY accountout ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每张银行卡的转入（一天）
router.get('/today_card_num', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(count(*),0) AS num,accountto  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 1 DAY) GROUP BY accountto ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每张银行卡的转出（一天）
router.get('/today_card_num', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(count(*),0) AS num,accountout  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 1 DAY) GROUP BY accountout ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每张银行卡的转入（一年）
router.get('/year_card_amount', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(sum(od_money),0) AS num,accountto  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) GROUP BY accountto ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每张银行卡的转出（一年）
router.get('/year_card_amount', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(sum(od_money),0) AS num,accountout  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) GROUP BY accountout ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每张银行卡的转入（一个月）
router.get('/month_card_amount', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(sum(od_money),0) AS num,accountto  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY accountto ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每张银行卡的转出（一个月）
router.get('/month_card_amount', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(sum(od_money),0) AS num,accountout  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY accountout ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每张银行卡的转入（一周）
router.get('/week_card_amount', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(sum(od_money),0) AS num,accountto  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY accountto ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每张银行卡的转出（一周）
router.get('/week_card_amount', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(sum(od_money),0) AS num,accountout  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY accountout ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每张银行卡的转入（一天）
router.get('/today_card_amount', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(sum(od_money),0) AS num,accountto  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 1 DAY) GROUP BY accountto ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每张银行卡的转出（一天）
router.get('/today_card_amount', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(sum(od_money),0) AS num,accountout  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 1 DAY) GROUP BY accountout ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每个银行的转入（一年）
router.get('/year_bank_amount', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(sum(od_money),0) AS num,bankto  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) GROUP BY bankto ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每个银行的转出（一年）
router.get('/year_bank_amount', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(sum(od_money),0) AS num,bankout  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) GROUP BY bankout ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看各银行的转入（一个月）
router.get('/month_bank_amount', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(sum(od_money),0) AS num,bankto  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY bankto ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});

//_查看每个银行的转出（一个月）
router.get('/month_bank_amount', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(sum(od_money),0) AS num,bankout  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY bankout ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每个银行的转入（一周）
router.get('/week_bank_amount', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(sum(od_money),0) AS num,bankto  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY bankto ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看每个银行的转出（一周）
router.get('/week_bank_amount', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    console.log(arg);
    //var idorder = arg.id;
    //var pa=[idorder];//
    var sql = 'SELECT IFNULL(sum(od_money),0) AS num,bankout  from data.orders WHERE data.orders.od_time < CURDATE() AND data.orders.od_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY bankout ORDER BY num desc;';
    connection.query(sql, function (err, result) {
        //console.log(result);
        if (err) {
            console.log(err);
            res.status(202).send('err')
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//下载
router.post('/upload', function (req, res) {
    if (req.busboy) {
        console.log("start")
        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            // var path = "C:\\Users\\马东阳\\Desktop\\"
            var path = "/home/zhaodong/a/"
            file.pipe(fs.createWriteStream(path + filename, {
                flags: 'w',
                defaultencoding: "utf-8",
                mode: "0666"
            }));
            file.on('end', function () {
                res.json({
                    success: true
                });
            });
        });
        req.pipe(req.busboy);
    }
    else {
        console.log('a')
    }

});


//删除转账历史记录
router.post('/deleteorder', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    var idoperator = arg.idoperator;
    var accountto = arg.accountto;
    var accountout = arg.accountout;
    var time = arg.time;
    var pa = [accountto, accountout, idoperator, time];
    console.log(pa);

    var delete_orders = "delete from data.orders where accountto = ? and accountout=? and idoperator=? and od_time=?";
    connection.query(delete_orders, pa, function (err, result) {
        if (err) {
            res.status(202).send('err')
        }
        else {
            console.log(result)
            res.status(200).send('ok')
        }
    })
});

//删除操作员
router.post('/deleteoperator', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    var idoperator = arg.idoperator;
    var pa = [idoperator];
    console.log(pa);

    var delete_orders = "delete from data.operator where idoperator=? ";
    connection.query(delete_orders, pa, function (err, result) {
        if (err) {
            res.status(202).send('err')
        }
        else {
            console.log(result)
            res.status(200).send('ok')
        }
    })
});
//删除转出银行卡
router.post('/deletecard', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    var card_id = arg.cardId;
    var pa = [card_id];
    console.log(pa);

    var delete_orders = "delete from data.card where card_id=? ";
    connection.query(delete_orders, pa, function (err, result) {
        if (err) {
            res.status(202).send('err')
        }
        else {
            console.log(result)
            res.status(200).send('ok')
        }
    })
});
//删除转入银行卡
router.post('/deletecardto', function (req, res) {
    console.log('查看request对象', req.url);
    var arg = url.parse(req.url, true).query;
    var cardto_id = arg.cardtoId;
    var pa = [cardto_id];
    console.log(pa);

    var delete_orders = "delete from data.cardto where cardto_id=? ";
    connection.query(delete_orders, pa, function (err, result) {
        if (err) {
            res.status(202).send('err')
        }
        else {
            console.log(result)
            res.status(200).send('ok')
        }
    })
});
//配置
router.post('/kill', function (req, res) {
    var computer = req.body.computer;
    var duankou = req.body.duankou;
    var describe = req.body.describe;
    var idorder = req.body.idorder;
    var pa = [computer, duankou, describe, idorder];
    console.log(pa);
   
    var delete_orders = "delete from data.orders where accountto = ? and accountout=? and money=? and time=?";
    connection.query(delete_orders, pa, function (err, result) {
        if (err) {
            res.status(202).send('err')
        }
        else {
            console.log(result)
            res.status(200).send('ok')
        }
    })
});


module.exports = router;
