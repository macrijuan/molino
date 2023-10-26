const {Router}=require("express");
const router=Router();
const{Table}=require("../../../../db");
const {errJSON}=require("../../../error");

router.use(async(req,res,next)=>{
  Table.findOne({where:{name:req.body.name}})
  .then(table=>{
    if(table){
      res.status(403).json(errJSON("name",["This name belongs to another table."]));
    }else next();
  });
});

module.exports=router;