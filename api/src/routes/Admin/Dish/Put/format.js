const {Router}=require("express");
const router = Router();
const{nameValidator, ingredientsValidator, dietsValidator, descriptionValidator, imageValidator}=require("../validation");

router.use((req,res,next)=>{
  const {name, ingredients, diets, description, image}=req.body;
	if(name)nameValidator(name, res.locals.errors);
	if(ingredients)ingredientsValidator(ingredients, res.locals.errors);
	if(diets)dietsValidator(diets, res.locals.errors);
	if(description)descriptionValidator(description, res.locals.errors);
	if(image)imageValidator(image, res.locals.errors);
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