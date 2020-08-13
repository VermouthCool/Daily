//ui路由
var rotuer = require("express");
var app = new rotuer.Router();  //路由器
var parser = require('cookie-parser');
var session = require('express-session');
var MongoSession = require('connect-mongo')(session) //操作session可持续化
app.use(session({
    name:'useid',
    secret:'jiange',//设置加密的规则,
    saveUninitialized:false,//是否在存储内容之前创建session会话
    resave:true,//每次强制刷新保存
    store: new MongoSession({
        url:'mongodb://localhost:27017/sessions_container',
        touchAfter:24*3600 //数据库修改的频率
    }),
    cookie:{
        httpOnly:true,//设置了以后前端无法通过js操作cookie
        maxAge:1000*30
    }
}))
app.use(parser());
app.get('/',function(req,res){
    res.render('login',{err:''});
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
var jian = 322;
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
            moudle.create({email,username,password},function(err,data){
                // res.cookie('_id',data._id,{maxAge:1000*30});
                req.session._id = data._id; //这一步那四个过程解决
                res.redirect('/user_center')
            });
            console.log(`邮箱为${email}用户名为${username}的用户注册成功${Date.now()}`);
            return
        })
        return;
    }
    if(password&&username){
        moudle.findOne({username,password},function(err,data){
            if(err) console.log(err);
            if(data){
                // res.cookie('_id',data._id,{maxAge:1000*30});
                req.session._id = data._id; 
                res.redirect('/user_center');
                return
            }
            res.render('login.ejs',{err:'账号输入有误'});
        })
    }
});
app.get('/user_center',function(req,res){
    //1.检查cookie带来的编号
    //2.查找对应的session
    //没找到 —_id则为null
    var {_id} = req.session;
    if(_id){
        moudle.findOne({_id},function(err,data){
            if(!err&&data){
                res.render('个人中心',{name:data.username});
                console.log(`${data.username}成功进入个人中心`)
                return
            }
            if(!data){
                res.redirect('/');
            }
        })
    }else{
        res.redirect('/')
    }
})
module.exports = app;