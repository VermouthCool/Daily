//ui路由
var rotuer = require("express");
var app = new rotuer.Router();  //路由器
app.get('/',function(req,res){
    res.sendFile("D:/自己编程前端练习文件/网页核心/login.html")
});
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/demo",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on("open",function(err){
    if(!err) console.log("数据库连接成功");
});
var Schema = mongoose.Schema;
var rule = new Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    enable_flag:{
        type:String,
        default:"Y"
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
var moudle = mongoose.model("login",rule);
app.post('/',function(req,res){
    app.use(rotuer.urlencoded({extended:true}));
    var {email,username,password} = req.body;
    if(email&&username&&password){
        moudle.findOne({email,username},function(err,data){
            if(err){
                console.log(err);
                return;
            }
            if(data){
                res.send('<h1>该用户已存在</h1>');
                return
            }
            res.send('<h1>注册成功</h1>');
            moudle.create({email,username,password})
            console.log(`邮箱为${email}用户名为${username}的用户注册成功${Date.now()}`);
            return
        })
    }
    if(password&&username){
        moudle.findOne({username,password},function(err,data){
            if(err) console.log(err);
            if(data){
                res.send('登录成功');
                return
            }
            res.send('用户名或者密码输入错误')
        })
    }
})
module.exports = app;