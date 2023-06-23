const {Admin} = require("../../../../../db");
const {Router}=require("express");
const router = Router();
const {existing, equalToCurent} = require("../../../../error");

router.use(async(req,res,next)=>{
  Admin.findOne({
    where:{email:req.body.email}
  })
  .then((user)=>{
    if(user){
      if(res.locals.params.id==user.id){
        res.status(409).json({errors:{email:[equalToCurent("email")]}});
      }else{
        res.status(409).json({errors:{email:[existing("email")]}});
      };
    }else{
      next();
    };
  });
});

module.exports=router;