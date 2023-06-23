const {Router}=require("express");
const router = Router();
const {nameValidator, quantityValidator}=require("../../validation");
const {unknown, wrongNumberSize, }=require("../../../../error");

router.use((req,res,next)=>{
  try{
    res.locals.errors = {
      name:[],
      quantity:[]
    };
    nameValidator(req.body.name, res.locals.errors.name);
    quantityValidator(req.body.quantity, res.locals.errors.quantity);
    Object.keys(res.locals.errors).forEach(prop=>{
      if(!res.locals.errors[prop].length)delete res.locals.errors[prop];
    });
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