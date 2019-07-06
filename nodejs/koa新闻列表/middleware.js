const Koa = require("koa");
const app = new Koa();

let mw1 = (ctx , next)=>{
    ctx.body = "hello koa";
    next();
}
let mw2 = (ctx , next)=>{
    ctx.body = "hello koa mw2"
}
app.use(mw1);
app.use(mw2);

app.listen(3000);