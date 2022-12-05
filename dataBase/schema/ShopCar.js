const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const shopCarSchema = new Schema({
  shopCarId:{type: ObjectId},
  goodsId: String,
  name: String,
  price: Number,
  image: String,
  goodsNums: Number,
  userId: {unique: true, type: String}
}, {collection: 'shopCar'})

mongoose.model('ShopCar', shopCarSchema)