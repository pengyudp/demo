const Koa = require("koa");
const views = require("koa-views");
const static = require("koa-static");
const body = require("koa-body");
const musicRouter = require("./routers/music");
const app = new Koa();

app.use(views(__dirname+"/views") , {
    map:{
        html:"pug"
    }
});
app.use(static(__dirname+"/static"));
app.use(body());
app.use(musicRouter.routes())

app.listen(3000);