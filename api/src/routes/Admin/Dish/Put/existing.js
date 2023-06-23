const {Router}=require("express");
const router = Router();
const{Dish}=require("../../../../db");
const{Op}=require("sequelize");
const {existingFor, equalToCurent}=require("../../../error");
const {dobleSpaceEraser}=require("../../../../formatter");

router.use(async(req,res,next)=>{
  if(req.body.name || req.body.image){
    Dish.findOne({
      where:{
        [Op.or]:[{name:req.body.name}, {image:req.body.image}]
      }
    })
    .then(dish=>{
      if(dish){
        if(dish.id == res.locals.params.id){
          if(dish.name===dobleSpaceEraser(req.body.name))res.locals.errors.name=[equalToCurent("name")];
          if(dish.image===req.body.image)res.locals.errors.image=[equalToCurent("image")];
          if(Object.keys(res.locals.errors).length){
            res.status(409).json({errors:res.locals.errors});
          };
        }else{
          if(dish.name===req.body.name)res.locals.errors.name=[existingFor("name","dish")];
          if(dish.image===req.body.image)res.locals.errors.image=[existingFor("image","dish")];
          if(Object.keys(res.locals.errors).length){
            res.status(409).json({errors:res.locals.errors});
          };
        };
      }else{
        next();
      };
    });
  }else{
    next();
  };
});

module.exports = router;