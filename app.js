const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router')
const app = new Koa();
const router = new Router();
const {mongoose, connect, initSchemas} = require('./dataBase/init.js');

(async ()=> {
  await connect();
  initSchemas();
  const User = mongoose.model('User');
  let oneUser = new User({userName:'jspang',password:'123456'});
  oneUser.save().then(async ()=> {
    console.log('插入数据成功');
    let users = await User.findOne({}).exec();
    console.log('------------------')
    console.log(users)
    console.log('------------------')
  })
})();
app.use(bodyParser());

router.get('/', (ctx, next)=> {
  ctx.body = {
    method: ctx.method,
    ...ctx.query
  };
})

router.post('/:id', (ctx, next)=> {
  ctx.body = {
    method: ctx.method,
    ...ctx.request.body,
    ...ctx.params
  };
})
// app.use(async (ctx)=> {
//   let method = ctx.request.method;
//   if (method === 'GET') {
//     ctx.body = router
//   } else if (method === 'POST') {
//     ctx.body = ctx.request.body;
//   }
// })

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3001, ()=> {
  console.log('start listening port 3000')
})
