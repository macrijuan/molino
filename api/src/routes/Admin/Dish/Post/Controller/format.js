const {Router}=require("express");
const router = Router();
const{nameValidator, ingredientsValidator, dietsValidator, descriptionValidator, imageValidator}=require("../../validation");

router.use((req,res,next)=>{
  const {name, ingredients, diets, description, image}=req.body;
  res.locals.errors = {};
	nameValidator(name, res.locals.errors);
	ingredientsValidator(ingredients, res.locals.errors);
	dietsValidator(diets, res.locals.errors);
	descriptionValidator(description, res.locals.errors);
	imageValidator(image, res.locals.errors);
  Object.keys(res.locals.errors).forEach(prop=>{
    if(!res.locals.errors[prop].length) delete res.locals.errors[prop];
  });
  if(Object.keys(res.locals.errors).length){
    res.status(403).json({errors:res.locals.errors});
  }else{
    next();
  };
});

module.exports = router;