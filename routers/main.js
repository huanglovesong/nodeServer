// 加载express模块
var express = require('express');
var router = express.Router();
router.get('/main', function (req, res, next) {
    res.render('main/index');
});
router.get('/login', function (req, res, next) {
    res.render('main/login');
});


module.exports = router;