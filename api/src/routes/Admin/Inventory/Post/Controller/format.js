const {Router}=require("express");
const router = Router();
const {nameValidator, quantityValidator, unitValidator, classValidator}=require("../../validation");
const {unknown, wrongNumberSize, }=require("../../../../error");

router.use((req,res,next)=>{
  try{
    res.locals.errors = {};
    nameValidator(req.body.name, res.locals.errors);
    req.body.quantity = Number(req.body.quantity);
    quantityValidator(req.body.quantity, res.locals.errors);
    unitValidator(req.body.unit, res.locals.errors);
    classValidator(req.body.class, res.locals.errors);
    if(Object.keys(res.locals.errors).length){
      res.status(403).json({errors:res.locals.errors});
    }else{
      next();
    };
  }catch(err){
    console.log(err)
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports = router;