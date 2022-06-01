const mongoose = require('mongoose');
const Schema = mongoose.Schema; //声明schema
const ObjectId = Schema.Types.ObjectId; // 声明Object类型

const userSchema = new Schema({
  userId: ObjectId,
  userName: {unique: true, type: String}, // unique: 布尔值 是否对这个属性创建唯一索引
  password: String,
  createTime: {type: Date, default: Date.now()},
  lastLoginTime: {type: Date, default: Date.now()}
});

// 发布模型
mongoose.model('User', userSchema);
