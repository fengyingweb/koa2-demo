const Router = require('koa-router');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const router = new Router();

// 加入购物车
router.post('/add', async(ctx)=> {
  const ShopCar = mongoose.model('ShopCar')
  try {
    const query = {goodsId: ctx.request.body.goodsId, userId: ctx.request.body.userId}
    const result = await ShopCar.findOne(query).exec();
    console.log(result)
    if (!result) { // 未查询到结果，就新增
      let newShopCar = new ShopCar({...ctx.request.body});
      await newShopCar.save().then(async ()=> {
        const total = await ShopCar.count({userId: ctx.request.body.userId})
        ctx.body = {
          code: 0,
          data: {
            total
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
      await ShopCar.updateOne(query, {goodsNums: ctx.request.body.goodsNums}).exec()
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
module.exports = router