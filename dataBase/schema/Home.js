const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const homeSchema = new Schema({
  ID:{unique:true,type:String},
  advertesPicture: {
    PICTURE_ADDRESS: String
  },
  floor1: [{goodsId: String, image: String}],
  floor2: [{goodsId: String, image: String}],
  floor3: [{goodsId: String, image: String}],
  floorName: {
    floor1: String,
    floor2: String,
    floor3: String
  },
  category: [{
    mallCategoryId: String,
    mallCategoryName: String,
    comments: String,
    image: String,
    bxMallSubDto: [{
      mallSubId: String,
      mallCategoryId: String,
      mallSubName: String,
      comments: String
    }]
  }],
  slides: [{
    image: String,
    goodsId: String
  }],
  buyTime: String,
  hotGoods: [{
    mallPrice: Number,
    image: String,
    goodsId: String,
    price: Number,
    name: String
  }],
  recommend: [{
    image: String,
    mallPrice: Number,
    goodsId: String,
    price: Number,
    goodsName: String
  }],
  sendFee: {
    chargeStartFee: String,
    deliveryFee: String
  }
}, {collection: 'home'})

mongoose.model('Home', homeSchema)