const {Router}=require("express");
const router = Router();
const {Inventory}=require("../../../../../db");
const {unknown, existing}=require("../../../../error");

router.use(async (req,res,next)=>{
  try{
    Inventory.findOne({
      where:{name:req.body.name}
    })
    .then(element=>{
      if(element){
        res.status(409).json(existing("item"));
      }else{
        next();
      };
    });
  }catch(err){
    console.log(err)
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports = router;