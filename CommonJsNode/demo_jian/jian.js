var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.set('view engine','ejs');
app.set('views','../../网页核心');
app.get('/',function(req,res){
    res.render('login',{err:''});
})
app.listen(8080);
