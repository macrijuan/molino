const {Router}=require("express");
const router = Router();
const{nameValidator, ingredientsValidator, dietsValidator, descriptionValidator, imageValidator, priceValidator}=require("../../validation");

router.use((req,res,next)=>{
  res.locals.errors = {};
	nameValidator(req.body.name, res.locals.errors);
	ingredientsValidator(req.body.ingredients, res.locals.errors);
	dietsValidator(req.body.diets, res.locals.errors);
	descriptionValidator(req.body.description, res.locals.errors);
  req.body.price = Number(req.body.price);
	priceValidator(req.body.price, res.locals.errors);
  // console.log("req.body.price: ", req.body.price);
	imageValidator(req.body.image, res.locals.errors);
  if(Object.keys(res.locals.errors).length){
    res.status(403).json({errors:res.locals.errors});
  }else{
    next();
  };
});

module.exports = router;