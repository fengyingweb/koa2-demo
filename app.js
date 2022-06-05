const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors'); // 引入跨域
const Router = require('koa-router')
const app = new Koa();
const {connect, initSchemas} = require('./dataBase/init.js');

app.use(bodyParser());
app.use(cors());

const router = new Router({
  prefix: '/api'
});

// 子路由
const user = require('./api/user.js');

// 装载所有子路由
router.use('/user', user.routes());

// 加载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods())


;(async ()=> {
  await connect();
  initSchemas();
})();

// 错误处理
app.use(async(ctx, next)=> {
  try {
    await next();
    if (!ctx.body) {
      ctx.status = 404;
      ctx.body = {
        code: 404,
        msg: 'not found'
      }
    }
  } catch(err) {
    console.log(err);
    ctx.status = 500
    ctx.body = {
      code: 500,
      msg: 'server error'
    }
  }
})

app.listen(3001, ()=> {
  console.log('start listening port 3001')
})