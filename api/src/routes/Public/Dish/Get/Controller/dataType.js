const{Router}=require("express");
const router = Router();
const { unknown, errJSON}=require("../../../../error");
const {Op}=require("sequelize");

router.use((req,res,next)=>{
  res.locals.dataToMatch = {};
  if(
    typeof req.body.taste !== "string"
    ||
    typeof req.body.name !== "string"
    ||
    !Array.isArray(req.body.diets)
    ||
    !Array.isArray(req.body.ingredients)
  ){
    res.status(500).json(errJSON("unknown", unknown));
  }else{
    next();
  }
});

module.exports = router;