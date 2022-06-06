const fs = require('fs');

fs.readFile('./data_json/goods.json', 'utf8', (err, data)=> {
  if (err) return console.log(err);
  let newData = JSON.parse(data);
  let i = 0;
  let newArr = [];
  newData.RECORDS.forEach(item=> {
    if (item.IMAGE1 != null) {
      i++;
      // console.log(item.NAME);
      newArr.push(item)
    }
  });
  console.log(i);
  fs.writeFile('./data_json/newGoods.json', JSON.stringify(newArr), (wErr)=> {
    if (wErr) {
      console.log('写入文件操作失败')
    } else {
      console.log('写入文件操作成功')
    }
  })
})