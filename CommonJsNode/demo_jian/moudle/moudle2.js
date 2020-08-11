
//创建模型对象  写入数据
var a = require("./moudle1");
module.exports = {
    good:function(rule,clloestion){
        var Schema = a.mongoose.Schema;
        var StudentSchama = new Schema(rule)
        this.StuMudle = a.mongoose.model(clloestion,StudentSchama);
    },
    moudle:this.StuMudle
}