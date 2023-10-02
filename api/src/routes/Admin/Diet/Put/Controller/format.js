const {Router}=require("express");
const router = Router();
const{dietNameValidator, dietDescValidator}=require("../../validation");

router.use((req,res,next)=>{
  if(req.body.name)dietNameValidator(req.body.name, res.locals.errors);
	if(req.body.description)dietDescValidator(req.body.description, res.locals.errors);
  if(Object.keys(res.locals.errors).length){
    res.status(403).json({errors:res.locals.errors});
  }else{
    next();
  };
});

module.exports = router;