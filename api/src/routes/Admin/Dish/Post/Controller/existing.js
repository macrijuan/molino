const {Router}=require("express");
const router = Router();
const{Dish}=require("../../../../../db");
const{Op}=require("sequelize");
const {existingFor}=require("../../../../error");

router.use(async(req,res,next)=>{
  const errors = {};
  Dish.findOne({
    where:{
      [Op.or]:[{name:req.body.name}, {image:req.body.image}]
    }
  })
  .then(dish=>{
    if(dish){
      if(dish.name===req.body.name)errors.name=[existingFor("name","dish")];
      if(dish.image===req.body.image)errors.image=[existingFor("image","dish")];
      if(Object.keys(errors).length){
        res.status(409).json({errors:errors});
      };
    }else{
      next();
    };
  });
});

module.exports = router;