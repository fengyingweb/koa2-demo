const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');
const {resolve} = require('path');
const router = new Router();

// 导入商品详情数据
router.get('/insertAllGoodsInfo', async(ctx)=> {
  fs.readFile(resolve(__dirname, '../data_json', 'newGoods.json'), 'utf8', (err, data)=> {
    if (err) {
      console.log('读取数据失败')
      return;
    }
    let jsonData = JSON.parse(data);
    const saveCount = 0;
    const Goods = mongoose.model('Goods');
    jsonData.map(item=> {
      let newGoods = new Goods(item);
      newGoods.save().then(()=> {
        saveCount++
        if (saveCount === jsonData.length) {
          console.log('导入数据成功:' + saveCount)
        }
      }).catch(error=> {
        console.log(error)
      })
    })
  });
  ctx.body = '开始导入数据'
})

// 导入商品大类数据
router.get('/insertAllCategory', async(ctx)=> {
  fs.readFile(resolve(__dirname, '../data_json', 'category.json'), 'utf8', (err, data)=> {
    if (err) {
      console.log(err);
      return;
    }
    let jsonData = JSON.parse(data);
    let saveCount=0;
    const Category = mongoose.model('Category');
    jsonData.RECORDS.map(item=> {
      let newCategory = new Category(item)
      newCategory.save().then(()=> {
        saveCount++;
        if (saveCount === jsonData.RECORDS.length) {
          console.log('导入数据成功:', saveCount)
        }
      }).catch(error=> {
        console.log(error)
      })
    })
  })
  ctx.body = '开始导入数据'
})

// 导入商品子类数据
router.get('/insertAllCategorySub', async(ctx)=> {
  fs.readFile(resolve(__dirname, '../data_json', 'category_sub.json'), 'utf8', (err, data)=> {
    if (err) {
      console.log(err);
      return;
    }
    let jsonData = JSON.parse(data);
    let saveCount = 0;
    const CategorySub = mongoose.model('CategorySub');
    jsonData.RECORDS.map(item=> {
      let newCategorySub = new CategorySub(item);
      newCategorySub.save().then(()=> {
        saveCount++;
        if (saveCount === jsonData.RECORDS.length) {
          console.log('导入数据成功:', saveCount)
        }
      }).catch(error=> {
        console.log(error);
      })
    })
  })
  ctx.body = '开始导入数据'
})

// 获取所有商品信息
router.get('/getAllGoodsInfo', async(ctx)=> {
  const Goods = mongoose.model('Goods');
  try {
    const res = await Goods.find().exec();
    ctx.body = {
      code: 0,
      data: res,
      msg: res.length ? '获取成功' : '暂无数据'
    }
  } catch (err) {
    ctx.body = {
      code: 1,
      msg: err.message || '获取商品数据失败'
    }
  }
})

// 获取商品详细信息的接口
router.post('/getDetailGoodsInfo', async(ctx)=> {
  let goodsId = ctx.request.body.goodsId
  const Goods = mongoose.model('Goods');
  try{
    const res = await Goods.findOne({ID: goodsId}).exec();
    ctx.body = {
      code: 0,
      data: res,
      msg: res ? '获取数据成功' : '暂无数据'
    }
  }catch(error) {
    ctx.body = {
      code: 1,
      msg: error.message || '获取商品详情数据失败'
    }
  }
})

// 获取商品大类列表
router.get('/getCategoryList', async(ctx)=> {
  try {
    const Category = mongoose.model('Category');
    const res = await Category.find().exec();
    ctx.body = {
      code: 0,
      data: res,
      msg: res ? '获取成功' : '暂无数据'
    }
  } catch(error) {
    ctx.body = {
      code: 1,
      data: null,
      msg: error
    }
  }
})

// 获取商品小类数据
router.post('/getCategorySubList', async(ctx)=> {
  let {categoryId} = ctx.request.body;
  console.log(categoryId);
  try {
    const CategorySub = mongoose.model('CategorySub');
    const res = await CategorySub.find({MALL_CATEGORY_ID: categoryId}).exec();
    ctx.body = {
      code: 0,
      data: res,
      msg: res.length ? '获取成功' : '暂无数据'
    }
  } catch(error) {
    ctx.body = {
      code: 1,
      msg: error
    }
  }
})

// 根据商品类别获取商品列表,分页查询
router.post('/getGoodsListByCategorySubID', async(ctx)=> {
  let {categorySubId, pageNo, pageSize} = ctx.request.body;
  pageSize = pageSize || 10;
  let start = (pageNo - 1) * pageSize;
  try {
    const Goods = mongoose.model('Goods');
    const res = await Goods.find({SUB_ID: categorySubId}).skip(start).limit(pageSize).exec();
    ctx.body = {
      code: 0,
      data: {
        list: res,
        pageNo,
        pageSize
      },
      msg: res.length ? '获取成功' : '暂无数据'
    }
  } catch (error) {
    ctx.body = {
      code: 1,
      msg: error
    }
  }
})

module.exports = router;