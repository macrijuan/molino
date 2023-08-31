const {Router}=require("express");
const router=Router();
const{Table}=require("../../../../db");
const {errJSON}=require("../../../error");

router.use(async(req,res,next)=>{
  Table.findByPk(req.body.id)
  .then(table=>{
    if(table){
      res.status(403).json(errJSON("existing","This id belongs to another table."));
    }else next();
  });
});

module.exports=router;