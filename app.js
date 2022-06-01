const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());
app.use(async (ctx)=> {
  // 从request中获取get请求
  let url = ctx.url;
  let method = ctx.method;
  if (url === '/' && method === 'GET') {
    let request = ctx.request;
    let req_query = request.query;
    let req_queryString = request.querystring;

    // 从执行上线文中获取ctx
    let ctx_query = ctx.query;
    let ctx_queryString = ctx.querystring;
    ctx.body = {
      url,
      method,
      req_query,
      req_queryString,
      ctx_query,
      ctx_queryString
    }
  } else if (url === '/' && method === 'POST') {
    const parseData = ctx.request.body;
    console.log(parseData)
    ctx.body = parseData;
  } else {
    ctx.body = '404'
  }
})

function parsePostData(ctx) {
  return new Promise((resolve, reject)=> {
    try{
      let parseData = ''
      ctx.req.on('data', (data)=> {
        console.log(data)
        parseData += data
      });

      ctx.req.addListener('end', ()=> {
        resolve(parseData)
      })
    }catch(error) {
      reject(error)
    }
  })
}

app.listen(3001, ()=> {
  console.log('start listening port 3001')
})