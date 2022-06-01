var workmate1={
  name:'JSPang',
  age:33,
  sex:1,
  job:'前端',
  skill:{
      skillOne:'HTML+CSS',
      skillTwo:'JavaScript',
      skillThree:'PHP'
  },
  regeditTime:new Date(),
  interest:['看电影','看书','吃美食','钓鱼','旅游']
}

var workmate2={
  name:'ShengLei',
  age:31,
  sex:1,
  job:'JAVA后端',
  skill:{
      skillOne:'HTML+CSS',
      skillTwo:'J2EE',
      skillThree:'PPT'
  },
  regeditTime:new Date(),
  interest:['篮球','看电影','做饭']
}

var workmate3={
  name:'MinJie',
  age:18,
  sex:0,
  job:'UI',
  skill:{
      skillOne:'PhotoShop',
      skillTwo:'UI',
      skillThree:'PPT'
  },
  regeditTime:new Date(),
  interest:['做饭','画画','看电影']
}
var workmate4={
  name:'XiaoWang',
  age:25,
  sex:1,
  job:'UI',
  skill:{
      skillOne:'PhotoShop',
      skillTwo:'UI',
      skillThree:'PPT'
  },
  regeditTime:new Date(),
  interest:['写代码','篮球','画画']
}
var workmate5={
  name:'LiangPeng',
  age:28,
  sex:1,
  job:'前端',
  skill:{
      skillOne:'HTML+CSS',
      skillTwo:'JavaScript',
  },
  regeditTime:new Date(),
  interest:['玩游戏','写代码','做饭']
}

var workmate6={
  name:'HouFei',
  age:25,
  sex:0,
  job:'前端',
  skill:{
      skillOne:'HTML+CSS',
      skillTwo:'JavaScript',
  },
  regeditTime:new Date(),
  interest:['化妆','读书','做饭']
}

var workmate7={
  name:'LiuYan',
  age:35,
  sex:0,
  job:'美工',
  skill:{
      skillOne:'PhotoShop',
      skillTwo:'CAD',
  },
  regeditTime:new Date(),
  interest:['画画','聚会','看电影']
}


var workmate8={
  name:'DingLu',
  age:20,
  sex:0,
  job:'美工',
  skill:{
      skillOne:'PhotoShop',
      skillTwo:'CAD',
  },
  regeditTime:new Date(),
  interest:['美食','看电影','做饭']
}

var workmate9={
  name:'JiaPeng',
  age:29,
  sex:1,
  job:'前端',
  skill:{
      skillOne:'HTML+CSS',
      skillTwo:'JavaScript',
      skillThree:'PHP'
  },
  regeditTime:new Date(),
  interest:['写代码','篮球','游泳']
}

var workmate10={
  name:'LiJia',
  age:26,
  sex:0,
  job:'前端',
  skill:{
      skillOne:'HTML+CSS',
      skillTwo:'JavaScript',
      skillThree:'PHP'
  },
  regeditTime:new Date(),
  interest:['玩游戏','美食','篮球']
}



var db=connect('company');
var workmateArray=[workmate1,workmate2,workmate3,workmate4,workmate5,workmate6,workmate7,workmate8,workmate9,workmate10];
db.workmate.insert(workmateArray);

// 简单查找
// db.workmate.find({"skill.skillOne":"HTML+CSS"})

// 筛选字段
// db.workmate.find({"skill.skillOne":"HTML+CSS"}, {name: true, "skill.skillOne": true, _id: false})

// 不等修饰符

// 小于($lt):英文全称less-than
// 小于等于($lte)：英文全称less-than-equal
// 大于($gt):英文全称greater-than
// 大于等于($gte):英文全称greater-than-equal
// 不等于($ne):英文全称not-equal 我们现在要查找一下

// db.workmate.find(
//   {age:{$lte:30,$gte:25}},
//   {name:true,age:true,"skill.skillOne":true,_id:false}
// )

// 日期查找
// var startDate= new Date('01/01/2022');
// db.workmate.find(
//     {regeditTime:{$gt:startDate}},
//     {name:true,age:true,"skill.skillOne":true,_id:false}
// )

// $in修饰符 in修饰符可以轻松解决一键多值的查询情况 现在要查询同事中年龄是25岁和33岁的信息。
// db.workmate.find({age:{$in:[25,33]}},
//   {name:1,"skill.skillOne":1,age:1,_id:0}
// )

// $or修饰符 用来查询多个键值的情况 就比如查询同事中大于30岁或者会做PHP的信息
// db.workmate.find({$or:[
//   {age:{$gte:30}},
//   {"skill.skillThree":'PHP'}
// ]},
//   {name:1,"skill.skillThree":1,age:1,_id:0}
// )

// $and修饰符 用来查找几个key值都满足的情况，比如要查询同事中大于30岁并且会做PHP的信息
// db.workmate.find({$and:[
//   {age:{$gte:30}},
//   {"skill.skillThree":'PHP'}
// ]},
//   {name:1,"skill.skillThree":1,age:1,_id:0}
// )

// $not修饰符 它用来查询除条件之外的值，比如我们现在要查找除年龄大于20岁，小于30岁的人员信息。
// 需要注意的是$not修饰符不能应用在条件语句中，只能在外边进行查询使用。
// db.workmate.find({
//   age:{
//       $not:{
//           $lte:30,
//           $gte:20
//       }
//   }
// },
// {name:1,"skill.skillOne":1,age:1,_id:0}
// )
db.workmate.find({interest:['画画','聚会','看电影']}, {name: 1, age: 1, interest: 1, _id: 0})

db.workmate.find({interest:['看电影']},
    {name:1,interest:1,age:1,_id:0} 
)

db.workmate.find({interest:'看电影'},
    {name:1,interest:1,age:1,_id:0} 
)

// $all-数组多项查询（且） 例如查找：兴趣中既有看电影又有看书的人员
db.workmate.find(
  {interest:{$all:["看电影","看书"]}},
  {name:1,interest:1,age:1,_id:0} 
)

// $in-数组的或者查询
db.workmate.find(
  {interest:{$in:["看电影","看书"]}},
  {name:1,interest:1,age:1,_id:0} 
)

// $size-数组个数查询 比如现在我们要查找兴趣的数量是5个的人员信息
db.workmate.find(
  {interest:{$size:5}},
  {name:1,interest:1,age:1,_id:0} 
)

// $slice-显示选项 有时候我并不需要显示出数组中的所有值，而是只显示前两项
db.workmate.find(
  {},
  {name:1,interest:{$slice: 2},age:1,_id:0} 
)

db.workmate.find({},{name:true,age:true,_id:false}).limit(0).skip(2).sort({age:1});
print('[SUCCESS]：The data was inserted successfully');