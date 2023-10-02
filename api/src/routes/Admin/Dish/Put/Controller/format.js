const {Router}=require("express");
const router = Router();
const{nameValidator, ingredientsValidator, dietsValidator, descriptionValidator, imageValidator, priceValidator}=require("../../validation");

router.use((req,res,next)=>{
  if(req.body.name)nameValidator(req.body.name, res.locals.errors);
	if(req.body.ingredients)ingredientsValidator(req.body.ingredients, res.locals.errors);
	if(req.body.diets)dietsValidator(req.body.diets, res.locals.errors);
	if(req.body.description)descriptionValidator(req.body.description, res.locals.errors);
	if(req.body.image)imageValidator(req.body.image, res.locals.errors);
	if(req.body.price){ req.body.price = Number(req.body.price); priceValidator(req.body.price, res.locals.errors);};
  if(Object.keys(res.locals.errors).length){
    res.status(403).json({errors:res.locals.errors});
  }else{
    next();
  };
});

module.exports = router;