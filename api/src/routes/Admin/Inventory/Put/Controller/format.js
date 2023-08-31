const {Router}=require("express");
const router = Router();
const {nameValidator, quantityValidator, unitValidator, classValidator}=require("../../validation");
const {unknown}=require("../../../../error");

router.use((req,res,next)=>{
  try{
    res.locals.errors = {};
    if(req.body.name)nameValidator(req.body.name, res.locals.errors);
    if(req.body.quantity)quantityValidator(req.body.quantity, res.locals.errors);
    if(req.body.unit)unitValidator(req.body.unit, res.locals.errors);
    if(req.body.class)classValidator(req.body.class, res.locals.errors);
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