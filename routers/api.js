// 加载express模块
var express = require('express');
var router = express.Router();
var User = require('../models/User');

// 统一返回格式
var resData;
router.use(function (req, res, next) {
    resData = {
        code: 0,
        message: ''
    }
    next();
});
// 用户注册
router.post('/user/register', function (req, res, next) {
    //console.log(req.body);
    var userName = req.body.userName;
    var pwd = req.body.pwd;
    if (!userName) {
        resData.code = 1;
        resData.message = '用户名不能为空';
        return res.json(resData);
    }
    if (!pwd) {
        resData.code = 2;
        resData.message = '密码不能为空';
        res.json(resData);
    }
    User.findOne({
        userName: userName
    }).then(function (userInfo) {
        console.log(userInfo);
        // 如果存在说明数据库有这条记录
        if (userInfo) {
            resData.code = 4;
            resData.message = '用户名已被注册';
            return res.json(resData);
        }
        // 保存用户的信息到数据库中
        var user = new User({
            userName: userName,
            pwd: pwd
        });
        return user.save();
    }).then(function (newUserInfo) {
        console.log(newUserInfo);
        resData.code = 0;
        resData.message = '注册成功';
        res.json(resData);
    });
});
// 用户登录
router.post('/user/login', function (req, res, next) {
    //console.log(req.body);
    var userName = req.body.userName;
    var pwd = req.body.pwd;
    if (!userName) {
        resData.code = 1;
        resData.message = '用户名不能为空';
        return res.json(resData);
    }
    if (!pwd) {
        resData.code = 2;
        resData.message = '密码不能为空';
        res.json(resData);
    }
    // 查询数据库是否存在
    User.findOne({
        userName: userName,
        pwd: pwd
    }).then(function (userInfo) {
        // 如果存在说明数据库有这条记录
        console.log(userInfo, 9);
        if (!userInfo) {
            resData.code = 4;
            resData.message = '用户名或密码错误';
            return res.json(resData);
        }
        resData.message = "登录成功";
        return res.json(resData);
    });
});
module.exports = router;