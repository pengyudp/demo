const Koa = require("koa");
const Router = require('koa-router');
const views = require("koa-views");
const static = require("koa-static");
const data = require("./json/data.json")
const router = new Router();
const app = new Koa();
app.use(static(__dirname+"/static"))
app.use(views(__dirname+"/view"),{
    map:{
        html:'pug',
    }
})
app.use(router.routes());

router.get("/" , async (ctx)=>{
    await ctx.render("index.pug",{
        data
    })
});

router.get("/detail" , async (ctx)=>{
    let d = data[ctx.query.id-1]
    await ctx.render("detail.pug",{
        d
    });
})

app.listen(3000);
