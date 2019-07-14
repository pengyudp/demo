const Router = require("koa-router");
const musicController = require("../constroller/musicController");
const router = new Router({
    prefix:'/music'
});

router.get("/" , musicController.toLogin);
router.post("/checkUser" , musicController.login);
router.get("/detail" , musicController.toDetail)

module.exports = router;