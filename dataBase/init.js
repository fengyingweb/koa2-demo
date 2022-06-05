const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/mall';
const glob = require('glob');
const {resolve} = require('path');

mongoose.Promise = global.Promise;

const connect = ()=> {
  let maxConnectNum = 0;
  // 链接数据库
  mongoose.connect(dbUrl);

  return new Promise((resolve, reject)=> {
    mongoose.connection.on('disconnected', ()=> {
      console.log('***********数据库断开***********')
      if (maxConnectNum < 3) {
        maxConnectNum++;
        mongoose.connect(dbUrl);
      } else {
        reject();
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    });

    mongoose.connection.on('error', (err)=> {
      console.log('***********数据库错误***********')
      if (maxConnectNum < 3) {
        maxConnectNum++;
        mongoose.connect(dbUrl);
      } else {
        reject(err);
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })

    // 链接打开时
    mongoose.connection.once('open', ()=> {
      console.log('MongoDB connected successfully');
      resolve();
    })
  });
}

const initSchemas = ()=> {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

module.exports = {
  connect,
  initSchemas
}
