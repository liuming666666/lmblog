
const [express,path,session,flash,config,router] = [require('express'),require('path'),require('express-session'),require('connect-flash'),require('config-lite')(__dirname),require('./routes/index')];
const app = express();
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');

console.log(__dirname);
app.set('views', path.join(__dirname, 'views'))// 设置存放模板文件的目录
app.set('view engine', 'ejs')// 设置模板引擎为 ejs
app.use(express.static(path.join(__dirname,'static')));		//设置静态目录
app.use(session({
	name : config.session.key,	//设置cookie中保存的session id字段
	secret : config.session.secret,		//
	resave : true,	//强制更新session
	saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
	cookie: {
	  maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
	}
}));
app.use(flash());	//显示通知，刷新就消失


//路由
router(app);

app.listen(config.port);
console.log('启动服务器：127.0.0.1:3000');

//安装了全局supervisor，自动检测改变，并重启
//express 使用了 path-to-regexp 模块实现的路由匹配
// req.query: 解析后的 url 中的 querystring，如 ?name=haha，req.query 的值为 {name: 'haha'}
// req.params: 解析 url 中的占位符，如 /:name，访问 /haha，req.params 的值为 {name: 'haha'}
// req.body: 解析后请求体，需使用相关的模块，如 body-parser，请求体为 {"name": "haha"}，则 req.body 为 {name: 'haha'}
