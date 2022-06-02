const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors'); // 引入跨域中间件
const Router = require('koa-router');
const app = new Koa();
// const mongoose = require('mongoose');
// const {connect, initSchemas} = require('./dataBase/init.js');

let router = new Router({
  prefix: '/api'
});
// 引入子路由
const user = require('./appApi/user.js');

// 装载所有子路由
router.use('/user', user.routes())

// (async ()=> {
//   await connect();
//   initSchemas();
//   const User = mongoose.model('User');
//   let oneUser = new User({userName:'jspang',password:'123456'});
//   oneUser.save().then(async ()=> {
//     console.log('插入数据成功')
//     let users = await User.findOne({}).exec()
//     console.log('------------------')
//     console.log(users)
//     console.log('------------------')
//   });
// })();

app.use(cors()); // 配置跨域
app.use(bodyParser()); // 配置body，post请求时需要使用ctx.request.body

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3001, ()=> {
  console.log('start listening port 3001')
})