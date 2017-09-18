const router = require('koa-router')()
const article = require('../schemas/article')
const user = require('../schemas/user')
const crypto = require('crypto')
const  moment = require('moment')
router.get('/admin', async (ctx, next) => {
  let tags = await article.distinct('tags')
  await ctx.render('index', {
    title: '夏玉林博客网站管理',
    article:{tags:[]},
    tags:tags
  })
})

router.get('/admin/login', async (ctx, next) => {
  await ctx.render('login', {
    title: '夏玉林博客网站管理'
  })
})

router.post('/admin/logining', async (ctx, next) => {
  await user.find({name:ctx.request.body.name},function(err,doc){
    if(err) {
      ctx.body = '登陆失败！' + err
    } else {
      if(!doc.length){
        ctx.body = '登陆失败！用户不存在'
        return
      }
      let md5 = crypto.createHash('md5')
          md5.update(ctx.request.body.pwd)
      if(doc[0].pwd == md5.digest('hex')) {
         ctx.body = '登陆成功！'
         ctx.session.user = ctx.request.body.name
         ctx.redirect('/admin')
      }else{
         ctx.body = '登陆失败！密码错误！'
      }
    }
  })
})

router.post('/admin/reg', async (ctx, next) => {
  var userList = await user.find({name:ctx.request.body.name})
  if(userList.name){
    ctx.body = '用户已经存在！'
    return
  }
  let md5 = crypto.createHash('md5')
      md5.update(ctx.request.body.pwd)
  userSch = new user({
    name:ctx.request.body.name,
    pwd:md5.digest('hex')
  })
  await userSch.save(function(err){
    if(err){
      console.log(err)
      ctx.redirect('/admin/error')
    }else{
      console.log('保存成功')
      ctx.redirect('/admin/login')
    }
  })
})



router.post('/admin/add', async (ctx, next) => {
  let reg = /[\\\`\*\_\[\]\#\+\-\!\>]/g
  let describe = ctx.request.body.content.replace(reg,'').substr(0,200)
  let art
  console.log(ctx.request.body.id)
  if(ctx.request.body.id){
    await article.findById(ctx.request.body.id,function(err,doc){
      doc.title=ctx.request.body.title
      doc.describe=describe
      doc.tags=ctx.request.body.tags.split(','),
      doc.author=ctx.request.body.author
      doc.content=ctx.request.body.content
      doc.updateDate=new Date()
      art = doc
    })

  }else{
    art = new article({
    	title:ctx.request.body.title,
    	describe:describe,
    	tags:ctx.request.body.tags.split(','),
    	author:ctx.request.body.author,
    	content:ctx.request.body.content
    })
  }
  await art.save(function(err){
  	if(err){
  		console.log(err)
      ctx.redirect('/admin/error')
  	}else{
  		console.log('保存成功')
      ctx.redirect('/admin/list')
  	}
  })
  // ctx.body = await article.find({},null,{sort:{'_id':-1}})
})

router.get('/admin/list/', async (ctx, next) => {
 ctx.redirect('/admin/list/1')
})

router.get('/admin/list/:page', async (ctx, next) => {
  ctx.state.moment = moment
  let page = ctx.params.page
  let artList = await article.find({},null,{sort:{'_id':-1}}).skip((page-1)*15).limit(15)
  let count = await article.count({},null,{sort:{'_id':-1}})
  await ctx.render('list', {
    title: '夏玉林博客网站管理',
    list: artList,
    pageCount:parseInt((count/15)+1),
    page:page
  })
})

//api
router.get('/api/artList/', async (ctx, next) => {
  ctx.redirect('/api/artList/1')
})
router.get('/api/tags', async (ctx, next) => {
  let tags = await article.distinct('tags')
  ctx.body =  tags
})
router.get('/api/artList/:page', async (ctx, next) => {
  let page = ctx.params.page
  let artList = await article.find({isDel:false},null,{sort:{'_id':-1}}).skip((page-1)*15).limit(15)
  ctx.body =  artList
})
router.get('/api/tags/:tag/:page', async (ctx, next) => {
  let page = ctx.params.page
  let tag = ctx.params.tag
  let artList = await article.find({isDel:false,tags:{$in:[tag]}},null,{sort:{'_id':-1}}).skip((page-1)*15).limit(15)
  ctx.body =  artList
})
router.get('/api/art/:id', async (ctx, next) => {
  let art = await article.findById(ctx.params.id, function(err, doc){
    if(!err){
      doc.hits = ++doc.hits
    }
    doc.save(function(err){
      if(err){
        console.log(err)
      }else{
        console.log('保存成功')
      }
    })
  })

  ctx.body =  art
})


router.get('/admin/:id', async (ctx, next) => {
  let art = await article.findById(ctx.params.id)
  art.tags = art.tags.join(",")
  let tags = await article.distinct('tags')
  console.log(art.tags)
  await ctx.render('index', {
    title: '夏玉林博客网站管理',
    article: art,
    tags:tags
  })
})

router.get('/admin/del/:id', async (ctx, next) => {
   await article.remove({_id:ctx.params.id},err=>{
    if(err){
      ctx.body = {
          status :0
      }
    }else{
      ctx.body = {
          status :1
      }
    }
  })
})

router.get('/admin/hide/:id', async (ctx, next) => {
 let doc1
 await article.findById(ctx.params.id, (err,doc)=>{
    doc1 = doc;
    if(err){ 
      ctx.body = {
          status :0
      }
    }else{
      doc.isDel = !doc.isDel
      
      console.log(1)
    }
  })

 await doc1.save(function(err){
        ctx.body = {
            status :1
        }
         console.log(2)
  })
  
})

module.exports = router
