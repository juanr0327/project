var express = require('express');
var uuid = require('uuid');
var mysql = require('mysql');
var fs = require('fs');
var busboy = require('connect-busboy')
var idpingjia1=6;
var multer = require('multer');

var router = express.Router();
var upload = multer({dest: 'upload/'})

var http = require('http');
var url = require('url');
var qs = require('querystring');
/*,
  fs = require('fs'),
  TITLE = 'fromidable1',
  AVATAR_UPLOAD_FOLDER = '/avator/',
  domain = 'http://localhost:3000';*/


var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'data',
});




connection.connect();
//用户注册
var sql1 = 'insert into user(id,tel,password,score, name,dep) values(?,?,?,100,?,?)';
var findsql = 'select password,dep,id,score from user where id = ?';
//记录历史记录


//用户注册
router.post('/sign', function (req, res) {
    a = req.body;
    console.log(req.body);
    
	var id = a.id;//提取register信
    console.log(id);
    var tel = a.tel;
    var pwd = a.passwd;
    console.log(pwd);
    var uuid1 = uuid.v1();
    console.log(uuid1);
	var name=" ";
	var dep=" ";
    var param = [id,tel,pwd,name,dep];
    console.log(param);
    connection.query(sql1,param,function (err,result) {
        if(err){
            console.log(err.message);
            return;
        }
    });
    res.status(200).send(id);//发送用户id
});

//用户登录
router.post('/login/account', function (req, res) {
    console.log(req.body);
    var arg = url.parse(req.url,true).query;
    var tel = arg.user;
    var passwd = arg.passwd;
    var param = [tel];
    connection.query(findsql,param,function (err,result) {
        if(err){
            res.status(202).send("aerr");
            return;
        }
        if(result != '') {
            console.log(result);
            if (result[0].password == passwd) {
                console.log("------------------------------")
                res.status(200).send(result[0]);
            }
            else {
                res.status(202).send("err")
            }
        }
        else{
            res.status(202).send("err")
        }
    });
});


//新建转账任务 
router.get('/createorder', function (req, res) {
    var arg = url.parse(req.url,true).query;
	var money = arg.amount;
    var accountto = arg.receiverAccount[1];
    var accountout = arg.payAccount[1];
	var time = arg.time;
	var bankout=arg.payAccount[0];
	var bankto=arg.receiverAccount[0];
	var state="未进行";
	var idoperator="李丽";
	var pa=[accountto,accountout,money,time,bankout,bankto,state,idoperator];
   var select_guan='insert into data.orders(accountto,accountout,od_money,od_time,bankout,bankto,od_state,idoperator) values(?,?,?,?,?,?,?,?);';
	connection.query(select_guan,function (err, result) {
		console.log(result);
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(200).send(result);
        }
    })
});

//_查看转账历史记录
router.get('/recordHistory', function (req, res) {
	//console.log('查看request对象',req.url);
	var arg = url.parse(req.url,true).query;
	//console.log(arg);
	var accountto = arg.accountto;
	var accountout = arg.accountout;
	var op_name = arg.op_name;
    var od_starttime = arg.od_starttime;
    var od_endtime = arg.od_endtime;
	var bankout = arg.bankout;
	var bankto = arg.bankto;
    var od_state=arg.od_state;
    var paa={accountto,accountout,op_name,od_starttime,od_endtime,bankout,bankto,od_state};
    console.log('aa',paa);
	var pa=[];//
    var sql='SELECT accountto,accountout,bankto,bankout,od_money,od_state,od_time,op_name FROM data.orders,data.operator where data.orders.idoperator=data.operator.idoperator';
    // var haveFirst = false;
    for(key in paa){
        if(paa[key]){
            if(key!=od_starttime&&key!=od_endtime){
                sql+=' and '
                pa.push(paa[key]);
                sql +=key+' = '+"'"+paa[key]+"'";
            }else{
                if(key==od_starttime){
                    sql+=' and '
                    pa.push(paa[key]);
                    sql +=od_time+' > '+"'"+paa[key]+"'";
                }else {
                    sql+=' and '
                    pa.push(paa[key]);
                    sql +=od_time+' < '+"'"+paa[key]+"'";
                }
            }
            
        }

    }
    console.log(sql,pa);
	connection.query(sql,pa,function (err, result) {
		//console.log(result);
        if(err) {
            console.log(err);
            res.status(202).send('err')
        }
        else{
            //console.log(result);
            res.status(200).send(result);
        }
    })
});
//_查看银行卡列表
router.get('/recordCard', function (req, res) {
	console.log('查看request对象',req.url);
	var arg = url.parse(req.url,true).query;
	console.log(arg);
	var idoperator = 0;
	var pa=[idoperator];//
    var sql='SELECT card_id,bank,op_name FROM data.card,data.operator where data.card.idoperator =? and data.card.idoperator=data.operator.idoperator';
	connection.query(sql,pa,function (err, result) {
		//console.log(result);
        if(err) {
            console.log(err);
            res.status(202).send('err')
        }
        else{
            //console.log(result);
            res.status(200).send(result);
        }
    })
});

router.post('/upload', function (req, res) {
    if (req.busboy) {
        console.log("start")
        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            // var path = "C:\\Users\\马东阳\\Desktop\\"
            var path = "/home/zhaodong/a/"
            file.pipe(fs.createWriteStream(path + filename, {
                flags : 'w',
                defaultencoding : "utf-8",
                mode : "0666"
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
router.post('/kill', function (req, res) {
	var money = req.body.money;
    var accountto = req.body.accountto;
    var accountout = req.body.accountout;
	var time = req.body.time;
	var pa=[accountto,accountout,money,time];
	console.log(pa);
	
    var delete_orders = "delete from data.orders where accountto = ? and accountout=? and od_money=? and 0d_time=?";
	connection.query(delete_orders, [accountto,accountout,money,time],function (err, result) {
        if(err) {
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
	var idorder=req.body.idorder;
	var pa=[computer,duankou,describe,idorder];
	console.log(pa);
	//update data.orders set computer=?,duankou=?,describe=? where idorder = ? 
    var delete_orders = "delete from data.orders where accountto = ? and accountout=? and money=? and time=?";
	connection.query(delete_orders, pa,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else {
            console.log(result)
            res.status(200).send('ok')
        }
    })
});

//查看操作员
router.post('/view_stu',function(req,res){
	var select_xuesheng="select idoperator,op_name,op_birthday,op_tel,op_address from operator";
	connection.query(select_xuesheng,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(200).send(result);
        }
    })
})
//筛选
router.post('/review_stu',function(req,res){
	var a=req.body;
	console.log(a);
	var dep=a.dep+'%';
	var name=a.name+'%';
	var id=a.id+'%';
	var sqlfind='select * from user where  id like ? and name like ? and dep like ?';
	var pa=[id,name,dep];
	connection.query(sqlfind,pa,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(200).send(result);
        }
    })
})
//删除
router.post('/kill_stu', function (req, res) {
	
    var id = req.body.id;
	var delete_stu= "delete from user where id=?";
	connection.query(delete_stu, [id],function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else {
            console.log(result)
            res.status(200).send('ok')
        }
    })
});
//查找
router.post('/view_Te',function(req,res){
	var select_xuesheng="select * from Teacher";
	connection.query(select_xuesheng,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(200).send(result);
        }
    })
})
//模糊查询
router.post('/review_Te',function(req,res){
	var a=req.body;
	console.log(a);
	var dep=a.dep+'%';
	var Tname=a.name+'%';
	var Teid=a.id+'%';
	var sqlfind='select * from teacher where  Teid like ? and Tname like ? and dep like ?';
	var pa=[Teid,Tname,dep];
	connection.query(sqlfind,pa,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(200).send(result);
        }
    })
})
//删除
router.post('/kill_Te', function (req, res) {
	
    var id = req.body.id;
	var delete_stu= "delete from Teacher where Teid=?";
	connection.query(delete_stu, [id],function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else {
            console.log(result)
            res.status(200).send('ok')
        }
    })
});
//增加
router.post('/review',function(req,res){
	var a=req.body;
	console.log(a);	
	var name=a.name+'%';	
	var sqlfind='select name ,kaipan as kaipanjia,zuigao as zuigaojia,zuidi as zuidijia,chengjiaoliang,chengjiaojia from qihuo where  qihuo.name like ? ';
	var pa=[name];
	connection.query(sqlfind,pa,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            //console.log(result);
            res.status(200).send(result);
        }
    })
});
router.post('/review2',function(req,res){
	a=req.body;
	
	var name=a.name;
	var kaipan=a.kaipan;
	var zuigao=a.zuigao;
	var zuidi=a.zuidi;
	var chengjiaoliang=a.chengjiaoliang;
	var chengjiaojia=a.chengjiaojia;
	console.log(a);
	var add_te='insert into qihuo (name,kaipan,zuigao ,zuidi,chengjiaoliang,chengjiaojia)values(?,?,?,?,?,?)';
	connection.query(add_te, [name,kaipan,zuigao,zuidi,chengjiaoliang,chengjiaojia],function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else {
            console.log(result)
            res.status(200).send('ok')
        }
    })
})
//查看分数
router.post('/show_Te',function(req,res){
	a=req.body;
	console.log(a);
	var id=a.id;
	var select_num='select dafen from reserves where Teid=? and state="已评价"';
	connection.query(select_num, [id],function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else {
            console.log(result)
			var num=0;
			console.log(num);
			for (var i=0;i<result.length;i++)
			{num=num+result[0].dafen;console.log(num);}
			num=num/result.length;
			console.log(num);
			res.status(200).send({num:num})
        }
    })
})
router.post('/rview_zhuanye',function(req,res){
	a=req.body;
	console.log(a);
	var num=0;
	var num2=0;
	var name=a.name;
	
	 console.log(name);
	 var select_teacher='select * from user';
	 var select_zhuanye='select * from  guanzhu where guanzhu.name=?';
	 connection.query(select_teacher,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else {
			num=result.length;	
        }
    })
	connection.query(select_zhuanye, [name],function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else {
			
			var score=0;
			score=(result.length/num)*100;
			res.status(200).send({b:score,a:num})
			
        }
    })
})
router.post('/doc',function(req,res){
	var num=0
	var select_teacher='select * from teacher ';
	var select_zhuanye='select * from  teacher,reserves where teacher.Teid=reserves.Teid and state="已评价"';
	connection.query(select_teacher,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else {
			num=result.length;	
        }
    })
	connection.query(select_zhuanye,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else {
			var score=0;
            for(var i=0;i<result.length;i++)
				score+=result[i].dafen;
			score=score/result.length;
			res.status(200).send({b:score,a:num})
        }
    })
})
//显示信息
router.post('/xinxi1',function(req,res){
	a=req.body;
	console.log(a);
	var id=a.id;
	var select_num='select name,age,address,xueli,tel,email from user where id=? ';
	connection.query(select_num,[id],function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else {
			console.log(result);
			res.status(200).send(result)
        }
    })
});
router.post('/xinxi2',function(req,res){
	a=req.body;
	console.log(a);
	var id=a.id;
	var select_num='select git,weibo,zhihu from user where id=? ';
	connection.query(select_num,[id],function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else {
			console.log(result);
			res.status(200).send(result)
        }
    })
});
router.post('/xinxi3',function(req,res){
	a=req.body;
	console.log(a);
	var id=a.id;
	var select_num='select likes from user where id=?';
	connection.query(select_num,[id],function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else {
			console.log(result);
			res.status(200).send(result)
        }
    })
});

router.post('/change',function(req,res){
	var a=req.body;
	console.log(a);
	var dep=a.dep
	var message=a.message;
	switch(Dep)
	{case 1:Dep="计算机";break;
	case 2: Dep="信息";break;
	case 3:Dep="软件工程";break}
	var select_num='update school  set message=? where dep=？';
	connection.query(select_num,[message,Dep],function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else {
			res.status(200).send(result)
        }
    })
});




router.post('/view_liuyan', function (req, res) {
    console.log(req.body);
    var a = req.body;
    var Teid= a.id;
	
	var findsql='select Teid,stuid as studentnum,liuyan as message from liuyan where Teid=?'
	param=[Teid]
	console.log(param)
    connection.query(findsql, param,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(200).send(result);
        }
    })
});
router.post('/answer', function (req, res) {
    console.log(req.body);
    var a = req.body;                     //前台给的数据是反的，学生号和老师号，懒得处理了
    var Teid= a.teid;
	var id=a.id;
	var text=a.text;
	var findsql='update  liuyan set huifu=? where Teid=? and stuid=?'
	param=[text,id,Teid]
	console.log(param)
    connection.query(findsql, param,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(200).send('ok');
        }
    })
});
	/*var guigui=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	console.log(a);
	var Teid=a.Teid;
	var insert='select * from reserves2 where Teid=?'
	var param=[Teid]
connection.query(insert,param,function(err,result){
		if (err){res.status(200).send(err);}
		else{console.log(result)
		for(var i=0;i<result.length;i++)
		{
			var time=result[i].time
			var flag=0;
			var day=time.substr(0,3)
			console.log(day)
			var ke=time.substr(4,1)
			console.log(ke)
			switch(ke)
			{	case "1":flag+=0*4;break;
				case "2":flag+=1*4;break;
				case "3":flag+=2*4;break;
				case "4":flag+=3*4;break;
			}
			switch(ke)
			{
				case "Mon":flag+=0;break;
				case "Tue":flag+=1;break;
				case "Web":flag+=2;break;
				case "Thu":flag+=3;break;
				case "Fri":flag+=4;break;
				case "Sat":flag+=5;break;
				case "Sun":flag+=6;break;
				
			}
			guigui[flag]=1;
		}
		res.status(200).send(guigui);
	}
		})*/


//学生模块部分
router.post('/stu_view_yuyue',function(req,res){
	var select_xian='select dep,Tname, Teacher.Teid,time,personnum from teacher,reserves2 where personnum>0 and Teacher.Teid=reserves2.Teid';
	connection.query(select_xian,function(err,result){
		if (err){res.status(200).send(err);}
		else{console.log(result)
			res.status(202).send(result)}
		})
})
//学生预约模块
router.post('/stu_reserves',function(req,res){
	var	a=req.body;
	var stuid=a.id;
	var teid=a.teid;
	var time=a.time;
	console.log(stuid);
	var jianyi='update reserves2 set personnum=personnum-1 where teid=? and time=?';
	var charu='insert into reserves(stuid,time,state,xiaoguo,dafen,teid)values(?,?,"未完成",0,0,?)';
	connection.query(jianyi,[teid,time],function(err,result){
		if (err){res.status(200).send(err);}
		else{console.log(result)
			connection.query(charu,[stuid,time,teid],function(err,result){
			if (err){res.status(200).send(err);}
			else{console.log(result)
			res.status(202).send(result)}
		})}
		})
})
router.post('/review_reserve',function(req,res){
	var a=req.body;
	console.log(a);
	console.log(a.dep);
	var dep=a.dep+'%';
	var Tname=a.name+'%';
	
	var sqlfind='select dep,Tname, Teacher.Teid,time,personnum from teacher,reserves2 where personnum>0 and Teacher.Teid=reserves2.Teid and dep Like ? and Tname like ?';
	var pa=[dep,Tname];
	connection.query(sqlfind,pa,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(200).send(result);
        }
    })
})
//查看预约历史
router.post('/history', function (req, res) {
    console.log(req.body);
    var a = req.body;
    var id = a.id;
	var findsql='select name ,kaipan as kaipanjia,zuigao as zuigaojia,zuidi as zuidijia,chengjiaoliang,chengjiaojia from qihuo'
    connection.query(findsql,function (err, result) {
		
        if(err) {
			console.log("===3=====");
            res.status(202).send('err')
        }
        else{
			console.log("==4======");
            //console.log(result);
            res.status(200).send(result);
        }
    })
});
router.post('/review',function(req,res){
	var a=req.body;
	console.log(a);	
	var name=a.name+'%';	
	var sqlfind='select name ,kaipan as kaipanjia,zuigao as zuigaojia,zuidi as zuidijia,chengjiaoliang,chengjiaojia from qihuo where  qihuo.name like ? ';
	var pa=[name];
	connection.query(sqlfind,pa,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            //console.log(result);
            res.status(200).send(result);
        }
    })
});

router.post('/history2', function (req, res) {
    console.log(req.body);
    var a = req.body;
    var id = a.id;
	var findsql='select title ,shijian,content,xihuan,pingjia from discover where author=?'
	var pa=[id];
    connection.query(findsql,pa,function (err, result) {
		
        if(err) {
			console.log("===3=====");
            res.status(202).send('err')
        }
        else{
			console.log("==4======");
            console.log(result);
            res.status(200).send(result);
        }
    })
});
router.post('/history3', function (req, res) {
    console.log(req.body);
    var a = req.body;
    var id = a.id;
	var findsql='select name,chengjiaojia,chengjiaoliang,shouyilv ,shijian from goumai where id=?'
	var pa=[id];
    connection.query(findsql,pa,function (err, result) {
		
        if(err) {
			console.log("===3=====");
            res.status(202).send('err')
        }
        else{
			console.log("==4======");
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//
router.post('/history4', function (req, res) {
    console.log(req.body);
    var a = req.body;
    var id = a.id;
	var findsql='select name ,kaipan as kaipanjia,zuigao as zuigaojia,zuidi as zuidijia,chengjiaoliang,chengjiaojia from qihuo where name in(select name from keshe.guanzhu where id=? );'
	var pa=[id];
    connection.query(findsql,pa,function (err, result) {
		
        if(err) {
			console.log("===3=====");
            res.status(202).send('err')
        }
        else{
			console.log("==4======");
            console.log(result);
            res.status(200).send(result);
        }
    })
});
router.post('/history5', function (req, res) {
    console.log(req.body);
    var a = req.body;
    var id = a.id;
	var findsql='select zhonglei,name,jiesuanjia,shouxulv,jiaoyishouxu,jiaogeshouxu,maitouji,maitaobao,maitouji2,maitaobao2 from canshubiao where name in(select name from keshe.guanzhu where id=? );'
	var pa=[id];
    connection.query(findsql,pa,function (err, result) {
		
        if(err) {
			console.log("===3=====");
            res.status(202).send('err')
        }
        else{
			console.log("==4======");
            console.log(result);
            res.status(200).send(result);
        }
    })
});
router.post('/history6', function (req, res) {
    console.log(req.body);
    var a = req.body;
    var id = a.id;
	var findsql='select name ,paiming1,name1,chengjiaoliang1,zengjian1,paiming2,name2,chengjiaoliang2,zengjian2,paiming3,name3,chengjiaoliang3,zengjian3 from jiaoyipaiming where name in(select name from keshe.guanzhu where id=? );'
	var pa=[id];
    connection.query(findsql,pa,function (err, result) {
		
        if(err) {
			console.log("===3=====");
            res.status(202).send('err')
        }
        else{
			console.log("==404======");
            console.log(result);
            res.status(200).send(result);
        }
    })
});
router.post('/history7', function (req, res) {
    console.log(req.body);
    var a = req.body;
    var id = a.id;
	var findsql='select distinct zhonglei,xiaoxi from xinxi where name in(select name from keshe.guanzhu where id=? );'
	var pa=[id];
    connection.query(findsql,pa,function (err, result) {
		
        if(err) {
			console.log("===3=====");
            res.status(202).send('err')
        }
        else{
			console.log("==4======");
            console.log(result);
            res.status(200).send(result);
        }
    })
});
router.post('/history8', function (req, res) {
    console.log(req.body);
    var a = req.body;
    var id = a.id;
	var findsql='select name,kaipan,zuigao,zuidi,chengjiaoliang,chengjiaojia,zuixin,zhangdie,chicang,maimaijia,zuojiesuan from qihuo where name in(select name from keshe.guanzhu where id=? );'
	var pa=[id];
    connection.query(findsql,pa,function (err, result) {
		
        if(err) {
			console.log("===3=====");
            res.status(202).send('err')
        }
        else{
			console.log("==4======");
            console.log(result);
            res.status(200).send(result);
        }
    })
});
router.post('/history51', function (req, res) {
    console.log(req.body);
    var a = req.body;
    var id = a.id;
	var findsql='select zhonglei,name,jiesuanjia,shouxulv,jiaoyishouxu,jiaogeshouxu,maitouji,maitaobao,maitouji2,maitaobao2 from canshubiao ;'
	var pa=[id];
    connection.query(findsql,function (err, result) {
		
        if(err) {
			console.log("===3=====");
            res.status(202).send('err')
        }
        else{
			console.log("==4======");
            console.log(result);
            res.status(200).send(result);
        }
    })
});
router.post('/history61', function (req, res) {
    console.log(req.body);
    var a = req.body;
    var id = a.id;
	var findsql='select name ,paiming1,name1,chengjiaoliang1,zengjian1,paiming2,name2,chengjiaoliang2,zengjian2,paiming3,name3,chengjiaoliang3,zengjian3 from jiaoyipaiming ;'
	var pa=[id];
    connection.query(findsql,function (err, result) {
		
        if(err) {
			console.log("===3=====");
            res.status(202).send('err')
        }
        else{
			console.log("==404======");
            console.log(result);
            res.status(200).send(result);
        }
    })
});
router.post('/history71', function (req, res) {
    console.log(req.body);
    var a = req.body;
    var id = a.id;
	var findsql='select distinct zhonglei,xiaoxi from xinxi ;'
	var pa=[id];
    connection.query(findsql,function (err, result) {
		
        if(err) {
			console.log("===3=====");
            res.status(202).send('err')
        }
        else{
			console.log("==4======");
            console.log(result);
            res.status(200).send(result);
        }
    })
});
router.post('/history81', function (req, res) {
    console.log(req.body);
    var a = req.body;
    var id = a.id;
	var findsql='select name,kaipan,zuigao,zuidi,chengjiaoliang,chengjiaojia,zuixin,zhangdie,chicang,maimaijia,zuojiesuan from qihuo ;'
	var pa=[id];
    connection.query(findsql,function (err, result) {
		
        if(err) {
			console.log("===3=====");
            res.status(202).send('err')
        }
        else{
			console.log("==4======");
            console.log(result);
            res.status(200).send(result);
        }
    })
});
//
router.post('/add_jiaoyi',function(req,res){
	a=req.body;
	console.log(a);
	var id=a.id;
	var shijian=a.shijian;
	var name=a.name;
	var shouyilv=a.shouyilv;
	var chengjiaojia=a.chengjiaojia;
	var chengjiaoliang=a.chengjiaoliang;
	var add_jy='insert into goumai (name,id,shijian,shouyilv,chengjiaoliang,chengjiaojia)values(?,?,?,?,?,?)';
	p=[name,id,shijian,shouyilv,chengjiaoliang,chengjiaojia];
	console.log(p);
	connection.query(add_jy, p,function (err, result) {
        if(err) {
			console.log(err.message)
            res.status(202).send('err')
        }
        else {
            console.log(result)
            res.status(200).send('ok')
        }
    })
});
router.post('/add_guanzhu',function(req,res){
	a=req.body;
	console.log(a);
	var id=a.id;
	var name=a.name;
	var add_jy='insert into guanzhu (id,name)values(?,?)';
	p=[id,name];
	console.log(p);
	connection.query(add_jy, p,function (err, result) {
        if(err) {
			console.log(err.message)
            res.status(202).send('err')
        }
        else {
            console.log(result)
            res.status(200).send('ok')
        }
    })
});
router.post('/del_guanzhu',function(req,res){
	a=req.body;
	console.log(a);
	var id=a.id;
	var name=a.name;
	var add_jy='delete from guanzhu where id = ? and name= ?';
	p=[id,name];
	console.log(p);
	connection.query(add_jy, p,function (err, result) {
        if(err) {
			console.log(err.message)
            res.status(202).send('err')
        }
        else {
            console.log(result)
            res.status(200).send('ok')
        }
    })
});
router.post('/del_qihuo',function(req,res){
	a=req.body;
	console.log(a);
	var name=a.name;
	var add_jy='delete from qihuo where name= ?';
	p=[name];
	console.log(p);
	connection.query(add_jy, p,function (err, result) {
        if(err) {
			console.log(err.message)
            res.status(202).send('err')
        }
        else {
            console.log(result)
            res.status(200).send('ok')
        }
    })
});
router.post('/add_wenzhang',function(req,res){
	a=req.body;
	console.log(a);
	var author=a.id;
	var neirong=a.neirong;
	var title=a.title;
	var content=a.content;
	var myDate = new Date();
	myDate.toLocaleDateString();
	var shijian=myDate;
	var add_jy='insert into discover (title,shijian,author,content,see,xihuan,pingjia,neirong)values(?,?,?,?,0,0,0,?)';
	p=[title,shijian,author,content,neirong];
	console.log(p);
	connection.query(add_jy, p,function (err, result) {
        if(err) {
			console.log(err.message)
            res.status(202).send('err')
        }
        else {
            console.log(result)
            res.status(200).send('ok')
        }
    })
});
//评价
router.post('/xiugai_xinxi', function (req, res) {
    console.log(req.body);
    var a = req.body;
    
	
	var zhonglei=a.zhonglei;
	var xiaoxi=a.xiaoxi;
	var findsql='update xinxi set xiaoxi=? where zhonglei=?'
	param=[xiaoxi,zhonglei]
	console.log(param)
    connection.query(findsql, param,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(200).send('ok');
        }
    })
	
});
router.post('/xiugai_gerenziliao', function (req, res) {
    console.log(req.body);
    var a = req.body;
	var id=a.id;
	var name=a.name;
       
        var age=a.age;
        var xueli=a.xueli;
        var email=a.email;
       
	var findsql='update keshe.user set name=? ,age=?,xueli=?,email=?where id=?;'
	param=[name,age,xueli,email,id];
	console.log(param)
    connection.query(findsql, param,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(200).send('ok');
        }
    })
});
router.post('/xiugai_gerenziliao2', function (req, res) {
    console.log(req.body);
    var a = req.body;
	var id=a.id;
        var likes=a.likes;
        
	var findsql='update keshe.user set likes=?where id=?;'
	param=[likes,id];
	console.log(param)
    connection.query(findsql, param,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(200).send('ok');
        }
    })
});
router.post('/xiugai_gerenziliao3', function (req, res) {
    console.log(req.body);
    var a = req.body;
	var id=a.id;
        var git=a.git;
        var weibo=a.weibo;
        var zhihu=a.zhihu;
	var findsql='update keshe.user set git=?,weibo=?,zhihu=?where id=?;'
	param=[git,weibo,zhihu,id];
	console.log(param)
    connection.query(findsql, param,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(200).send('ok');
        }
    })
});
router.post('/history_pingjia', function (req, res) {
    console.log(req.body);
    var a = req.body;
    var id = a.id;
	var time =a.time;
	var name=a.name;
	var dafen=a.dafen;
	var findsql='update yuce set dafen=? where name=? and time=?'
	param=[dafen,name,time]
	console.log(param)
    connection.query(findsql, param,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(200).send('ok');
        }
    })
});
router.post('/insert_pingjia', function (req, res) {
    console.log(req.body);
    var a = req.body;
    var id = a.id;
	var shijian =a.time;
	var name=a.name;
	var fenshu=a.dafen;
	var findsql2='INSERT INTO fenshu (id, shijian, name, fenshu) VALUES (?, ?, ?, ?) '
	param2=[id,shijian,name,fenshu]
	console.log(param2)
    connection.query(findsql, param2,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(200).send('ok');
        }
    })
});
router.post('/wancheng', function (req, res) {
    console.log(req.body);
    var a = req.body;
    var stuid = a.id;
	var time =a.time;
	var Teid=a.Teid;
	
	var findsql='update reserves set state="已完成" where stuid=?and Teid=? and time=?'
	param=[stuid,Teid,time]
	console.log(param)
    connection.query(findsql, param,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(200).send('ok');
        }
    })
});
//查看预约历史
//给老师留言
router.post('/view2', function (req, res) {
	console.log(req.body);
    a = req.body;
    var id = a.id;
    var title = a.title;
    var param = [title];
	console.log(title);
   var select_guan='select id,idpingjia,shijian,neirong from pingjia where title=?';
	connection.query(select_guan,param,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(200).send(result);
        }
    })
});
router.post('/pinglun', function (req, res) {
    console.log(req.body);
    a = req.body;
    var id = a.id;
    var title = a.title;
	var neirong=a.neirong;
    var param = [title];
	var myDate = new Date();
	idpingjia1+=1;
	var idpingjia=idpingjia1;
	myDate.toLocaleDateString();
	var shijian=myDate;
	console.log(shijian);
	console.log(idpingjia);
	p=[id,idpingjia,title,shijian,neirong];
	var insert='insert into pingjia(id,idpingjia,title,shijian,neirong)values(?,?,?,?,?)'                		
    connection.query(insert,p ,function (err, result) {
        if(err) {
            res.status(202).send('err')
        }
        else{
            console.log(result);
            res.status(202).send('ok')
        }
    })
        
    
});
module.exports = router;
