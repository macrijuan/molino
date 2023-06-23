const {Router}= require("express");
const router = Router();

const testMiddleware=require("./Tests");

router.use("/test",testMiddleware, (req,res)=>{console.log(req.body);res.send("Approved")});

module.exports = router;