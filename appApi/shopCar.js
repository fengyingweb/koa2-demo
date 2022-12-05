const Router = require('koa-router');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const router = new Router();

// 加入购物车
router.post('/add', async (ctx)=> {
  const ShopCar = mongoose.model('ShopCar')
  try {
    const query = {goodsId: ctx.request.body.goodsId, userId: ctx.request.body.userId}
    const result = await ShopCar.findOne(query).exec();
    console.log(result)
    if (!result) { // 未查询到结果，就新增
      let shopCarId = new ObjectId()
      let newShopCar = new ShopCar({...ctx.request.body, shopCarId});
      await newShopCar.save().then(async ()=> {
        const total = await ShopCar.count({userId: ctx.request.body.userId})
        console.log('newTotal:', total)
        ctx.body = {
          code: 0,
          data: {
            total: total
          },
          msg: '加入购物车成功'
        }
      }).catch((err)=> {
        ctx.body = {
          code: 1,
          data: null,
          msg: err.message || '加入购物车失败'
        }
      })
    } else { // 有结果，就修改
      let goodsNums = result.goodsNums + ctx.request.body.goodsNums
      await ShopCar.updateOne(query, {goodsNums}).exec()
      const total = await ShopCar.count({userId: ctx.request.body.userId})
      console.log(total)
      ctx.body = {
        code: 0,
        data: {
          total
        },
        msg: '加入购物车成功'
      }
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      data: null,
      msg: error.message || '加入购物车失败'
    }
  }
})

// 查找用户购物车
router.get('/query', async (ctx)=> {
  const ShopCar = mongoose.model('ShopCar')
  const query = {userId: ctx.request.query.id}
  try {
    const result = await ShopCar.find(query).exec();
    ctx.body = {
      code: 0,
      data: {
        list: result,
        total: result.length
      },
      msg: '查找购物车成功'
    }
  } catch (error) {
    ctx.body = {
      code: 1,
      data: null,
      msg: '查找购物车失败'
    }
  }
})

// 更新购物车商品数量
router.post('/updateNums', async (ctx)=> {
  const ShopCar = mongoose.model('ShopCar')
  const query = {goodsId: ctx.request.body.goodsId, userId: ctx.request.body.userId}
  try {
    await ShopCar.updateOne(query, {goodsNums: ctx.request.body.goodsNums}).exec()
    ctx.body = {
      code: 0,
      data: true,
      msg: '修改数量成功'
    }
  } catch (error) {
    ctx.body = {
      code: 1,
      data: false,
      msg: '修改数量失败'
    }
  }
})

// 删除购物车
router.post('/batchDeleteCar', async (ctx)=> {
  const ShopCar = mongoose.model('ShopCar')
  const shopCarIds = ctx.request.body.shopCarIdList
  let count = 0
  shopCarIds.forEach(id => {
    const query = {shopCarId: id}
    ShopCar.findOneAndRemove(query, (err)=> {
      console.log(err)
      if (err) {
        ctx.body = {
          code: 1,
          data: false,
          msg: err || '删除失败'
        }
        return
      }
      count += 1
    })
  })
  ctx.body = {
    code: 0,
    data: true,
    msg: '删除成功'
  }
})
module.exports = router