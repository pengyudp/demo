const musicServer = require("../server/musicServer")
const md5 = require("md5");
module.exports = {
    async toLogin(ctx){
        let isLogin = ctx.cookies.get("isLogin");
        if(isLogin === md5("pengyu"+"123")){
            await ctx.render("list.pug",{
                musicData:musicServer.getList()
            });
        }else{

            await ctx.render("login.pug");
        }
    },

    async login(ctx){
        let body = ctx.request.body;
        if(body.username === 'pengyu' && body.pwd === '123'){
            if(body.memberMe){
                ctx.cookies.set("isLogin" , md5(body.username+body.pwd) , {
                    maxAge: 3600*1000*24*7
                })
            }
            await ctx.render("list.pug",{
                musicData:musicServer.getList()
            });
        }else{
            await ctx.render("error.pug");
        }
    },

    async toDetail(ctx){
        await ctx.render("detail.pug")
    }
}