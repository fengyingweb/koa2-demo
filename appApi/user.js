const Router = require('koa-router');
const router = new Router();
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

router.get('/', async ctx => {
  ctx.body = '注册首页';
})

// 注册接口
router.post('/register', async(ctx)=> {
  // 获取model
  const User = mongoose.model('User');
  try {
    let result = await User.findOne({userName: ctx.request.body.userName}).exec();
    console.log(result)
    if (result) {
      ctx.body = {
        code: 2,
        data: result,
        msg: '用户名被注册了'
      }
    } else {
      // 接受post数据
      const userId = new ObjectId()
      console.log(userId)
      let newUser = new User({...ctx.request.body, userId});
      await newUser.save().then(()=> {
        ctx.body = {
          code: 0,
          data: null,
          msg: '注册成功'
        }
      }).catch(err=> {
        ctx.body = {
          code: 1,
          data: null,
          msg: err.message || '注册失败'
        }
      })
    }
  } catch (error) {}
})

// 登录接口
router.post('/login', async(ctx)=> {
  let loginInfo = ctx.request.body;
  console.log(loginInfo);
  let {userName, password} = loginInfo;
  // 获取model
  const User = mongoose.model('User');
  //查找用户名是否存在，如果存在开始比对密码
  try {
    let result = await User.findOne({userName: userName}).exec();
    console.log(result);
    if (result) {
      let newUser = new User()
      try {
        let resMatch = await newUser.comparePassword(password, result.password);
        if (resMatch) {
          ctx.body = {
            code: 0,
            data: {
              isLogin: resMatch,
              userInfo: {
                userId: result.userId,
                userName: result.userName
              }
            },
            msg: '登录成功'
          }
        } else {
          ctx.body = {
            code: 0,
            data: {
              isLogin: resMatch,
              userInfo: {
                userId: result.userId,
                userName: result.userName
              }
            },
            msg: '登录失败,密码错误'
          }
        }
      } catch (errM) {
        console.log(errM)
        ctx.body = {
          code: 1,
          data: null,
          msg: errM
        }
      }
    } else {
      ctx.body = {
        code: 2,
        data: null,
        msg: '用户名不存在'
      }
    }
  } catch (err) {
    console.log(err);
    ctx.body = {
      code: 1,
      data: null,
      msg: err.message || '登录失败'
    }
  }
})

module.exports = router;