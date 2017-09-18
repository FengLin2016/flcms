const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session2');
const cors = require('koa2-cors')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

app.use(session({
    key: "SESSIONID",   //default "koa:sess"
}))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(cors())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async function (ctx, next) {
	if (ctx.session.user) {  
	await next()
	} else {
	   if(ctx.req.url.indexOf('login')>-1 || ctx.req.url.indexOf('api')>-1 || ctx.req.url.indexOf('reg')>-1){
	   	await next()
	   }else{
	   	ctx.redirect('/admin/login') 
	   }
	  
	}
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

module.exports = app;