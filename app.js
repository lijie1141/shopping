global.__basename = __dirname;

global.config = require(__basename + '/config/config.js');

const express = require('express');

const ejs = require('ejs');

const favion = require('serve-favicon');

const app = express();

const routes = require(__basename + '/routes/routes.js');


let port = process.env.PORT || config.server.port;

const bodyParser = require('body-parser');

app.use(favion(__basename + '/web/public/images/icon/img_79.ico'));

//静态资源路径
app.use(express.static(__basename + '/web/public'));

app.use(express.static(__basename + '/web/views'));
app.use(express.static(__basename + '/web'));

//视图引擎
app.set('views', __basename + '/web/views');
app.set('views engine', 'html');
app.engine('.html', ejs.__express);

//处理JSON化post请求数据
app.use(bodyParser.json());


routes(app);


// 404处理
app.use((req, res) => {
	res.status(404);
	res.send('页面不存在');
});

// 500处理 服务器报错
app.use((req, res) => {
	res.status(500);
	res.send('服务器错误');
});

app.listen(config.server.port, function () {
	console.log(`服务器运行在${config.server.host}:${port}`);
})

