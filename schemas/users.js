var mongoose = require('mongoose');
var schema = mongoose.Schema;
module.exports = new schema({
    // 用户名
    userName: String,
    // 密码
    pwd: String,
})