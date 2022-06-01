
// var startTime = (new Date()).getTime();
var db = connect('user');

// $set
// db.userInfo.update({name: 'MinJie'}, {$set: {"skill.SkillThree": "word"}});

// $unset用于将key删除
// db.userInfo.update({name: 'MinJie'}, {$unset: {age: ''}});

// $inc对数字进行计算
// db.userInfo.update({name: 'MinJie'}, {$inc: {age: -2}});

// multi选项
// db.userInfo.update({}, {$set: {interset: []}}, {multi: true});

// upsert是在找不到值的情况下，直接插入这条数据
// db.userInfo.update({name:'xiaoWang'}, {$set: {age: 20}}, {upsert: true})

// $push追加数组/内嵌文档值
// db.userInfo.update({name:'xiaoWang'}, {$push: {interest: 'draw'}});
// db.userInfo.update({name: 'MinJie'}, {$push: {"skill.SkillFour": "draw"}});

// $ne查找是否存在 没有则修改，有则不修改。
// db.userInfo.update({name:'xiaoWang', interest: {$ne: 'game'}}, {$push: {interest: 'game'}})

// $addToSet 升级版的$ne
// db.userInfo.update({name:'xiaoWang'}, {$addToSet: {interest: 'readBook'}})

// $each 批量追加
// var newInterset=["Sing","Dance","Code"];
// db.userInfo.update({name:'xiaoWang'}, {$addToSet: {interest: {$each: newInterset}}})

// $pop 删除数组值 1：从数组末端进行删除 -1：从数组开端进行删除
// db.userInfo.update({name:'xiaoWang'}, {$pop: {interest: 1}})

// 数组定位修改
// db.userInfo.update({name:'xiaoWang'}, {$set: {'interest.2': 'Music'}})

// 状态返回与安全 findAndModify是查找并修改的意思
var myModify={
  findAndModify:"userInfo",
  query:{sex: 1},
  update:{$set:{money: 1000}},
  new: true    //更新完成，需要查看结果，如果为false不进行查看结果
}

var resMsg = db.runCommand(myModify)

printjson(resMsg)

// var runTime = (new Date()).getTime() - startTime;

// print('[mongoDemo1] user update success runTime is ' + runTime + 'ms');