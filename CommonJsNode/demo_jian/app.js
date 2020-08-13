// var express = require("express");
// var app = express();
// app.listen(8080,function(err){
//     if(!err) console.log("成功建立数据库");
// })
// app.get('',function(req,res){
//     res.sendFile("D:/自己编程前端练习文件/网页核心.html/贪吃蛇.html")
// });

var express = require("express");
var bodyParser = require("body-parser"); //引入解析post请求的请求体的urlencoded的中间件
var app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.static("../../网页核心"))
app.listen(8080,function(err){
    if(!err) console.log("成功建立服务器");
});
var ui = require('./moudle/moudle2');

var {resolve} = require('path');
app.set('view engine','ejs');
app.set('views','../../网页核心');
var data = [{name:'jiange',age:18},{name:'liqiang',age:19}];
app.use(ui);