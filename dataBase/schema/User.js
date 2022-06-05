const mongoose = require('mongoose');
const Schema = mongoose.Schema; //声明schema
const ObjectId = Schema.Types.ObjectId; // 声明Object类型
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  UserId :{type:ObjectId},
  userName: {unique: true, type: String}, // unique: 布尔值 是否对这个属性创建唯一索引
  password: String,
  createTime: {type: Date, default: Date.now()},
  lastLoginTime: {type: Date, default: Date.now()}
}, {collection: 'user'});

userSchema.pre('save', function(next) { // 注意此处不能使用箭头函数，否则找不到this.XXX
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt)=> {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash)=> {
      if (err) return next(err);
      this.password = hash;
      next();
    })
  })
})

userSchema.methods = {
  // 密码比对的方法
  comparePassword: (_password, password)=> {
    return new Promise((resolve, reject)=> {
      bcrypt.compare(_password, password, (err, isMatch)=> {
        if (!err) {
          resolve(isMatch)
        } else {
          reject(err)
        }
      })
    })
  }
}

// 发布模型
mongoose.model('User', userSchema);
