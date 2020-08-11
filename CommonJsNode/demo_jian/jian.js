let http = require("http"); //引入内置模块
// 形如key=value&key=value 叫做urlencoded编码形式
// urlencoded的参数叫做查询字符串参数  必须要用&  不能用 # 之类的
// querystring是一个对象  有一些方法 如 parse()
let querystring = require("querystring");
let server = http.createServer(function(requst,response){
    response.setHeader("content-type","text/html;charset=utf-8");
    var url = requst.url.split("?")[1];
    var name = querystring.parse(url).name;
    var age = querystring.parse(url).age;
    response.end(`<h1>名字：${name}，年龄：${age}</h1>`);
});
//这个部分必须放在createserver后面
server.listen("8080",function(err){
    if(err) console.log("shibai")
    else console.log("成功  服务器开启")
})
