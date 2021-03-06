// 应用程序启动入口文件
var mongoose = require('mongoose');
// 加载express模块
var express = require('express');
//加载模板处理模块
var swig = require('swig');
// 创建app应用=>NodeJS Http.createServer();
var app = express();
var bodyParser = require('body-parser');
// 设置静态文件托管
// 当用户访问的url以public开头
app.use('/public', express.static(__dirname + '/public'));
// 定义当前应用所使用的模板引擎
// 第一个参数，模板引擎的名称，同时也是模板引擎的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);
// 设置模板文件存放的目录，第一个参数必须是views,第二个参数是目录
app.set('views', './views');
// 注册所使用的模板引擎，第一个参数必须是view engine，第二个参数和app.engine这个方法定义的模板引擎名称一致
app.set('view engine', 'html');
// 在开发过程中，取消缓存限制
swig.setDefaults({
    cache: false
});

app.use(bodyParser.urlencoded({
    extended: true
}));
// 根据不同的功能划分模块
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

// app.get('/', function (req, res, next) {
//     // res.send('<h1>欢迎光临！</h1>');
//     /*
//         读取views目录下的指定文件，解析并返回到客户端
//         第一个参数，表示模板的文件，相对于views目录 views/index
//         第二个参数，传递给模板使用的数据
//     */
//     res.render('index');
// });

// app.get('/main.css', function (req, res, next) {
//     res.setHeader('content-type', 'text/css');
//     res.send('body {background: red;}');
// });
// 监听http请求
mongoose.connect('mongodb://localhost:27018/blog', function (err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        app.listen(8088);
    }
});