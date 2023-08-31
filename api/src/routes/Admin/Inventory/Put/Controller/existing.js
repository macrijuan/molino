const {Router}=require("express");
const router = Router();
const {Inventory}=require("../../../../../db");
const {unknown, existing, equalToCurent, errJSON}=require("../../../../error");

router.use(async (req,res, next)=>{
  try{
    if(req.body.name){
      Inventory.findOne({
        where:{name:req.body.name}
      }).then(element=>{
        if(element){
          if(element.id===parseInt(res.locals.id)){
            res.json(errJSON("name", equalToCurent("name")));
          }else{ 
            res.json(errJSON("name", existing("name")));
          };
        }else{
          next();
        };
      });
    }else next();
  }catch(err){
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports = router;