const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx)=> {
  ctx.body = '注册首页'
})
router.get('/register', async (ctx)=> {
  ctx.body = '用户注册接口'
})

module.exports = router;
