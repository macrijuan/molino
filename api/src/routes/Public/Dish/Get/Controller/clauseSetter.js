const{Router}=require("express");
const router = Router();
const {isMandatory, maxLength, unknown}=require("../../../../error");
const {Op}=require("sequelize");

router.use((req,res,next)=>{
  res.locals.dataToMatch = {};
  if(req.body.taste) res.locals.dataToMatch.taste = req.body.taste;
  if(req.body.name) res.locals.dataToMatch.name = {[Op.substring]:req.body.name};
  if(req.body.diets.length) res.locals.dataToMatch.diets = {[Op.contains]:req.body.diets};
  if(req.body.ingredients.length) res.locals.dataToMatch.ingredients = {[Op.contains]:req.body.ingredients};
  next();
});

module.exports = router;