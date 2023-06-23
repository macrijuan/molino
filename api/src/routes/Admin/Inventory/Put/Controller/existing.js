const {Router}=require("express");
const router = Router();
const {Inventory}=require("../../../../../db");
const {unknown, existing, equalToCurent}=require("../../../../error");

router.use(async (req,res)=>{
  try{
    Inventory.findOne({
      where:{name:req.name}
    })
    .then(element=>{
      if(element){
        if(element.id==res.locals.params.id){
          res.status(409).json(equalToCurent("name"));
        }else{
          res.status(409).json(existing("name"));
        };
      }else{
        next();
      };
    });
  }catch(err){
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports = router;