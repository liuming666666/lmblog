/*const [express] = [require('express')];
const router = express.Router();
router.get('/',(req,res) => {
	res.send('hello express');
});*/
module.exports = function(app) {
	app.get('/',(req,res) => {
		//res.redirect('');	//跳转url
		res.render("index",{
			blog: {title:"博客主页"}
		});
	});

	app.get('/create',(req,res) => {
		res.render("create",{});
	});

	app.post('/create',(req,res) => {
		res.send("发表文章");
	});

	app.get('/:id',(req,res) => {
		res.send("文章详情页");
	});

	app.get('/:id/edit',(req,res) => {
		res.send("更新文章页");
	});
};