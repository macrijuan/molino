const {Router}=require("express");
const router=Router();
const {errJSON, unknown}=require("../../../error");
const {tableIdValidation, sitsValidation, sectotValidation}= require("../validation");

router.use(async(req,res,next)=>{
  try{
    res.locals.errors={};
    if(res.locals.update){
      if(req.body.id)tableIdValidation(req.body.id, res.locals.errors);
      if(req.body.sits)sitsValidation(req.body.sits, res.locals.errors);
      if(req.body.sector)sectotValidation(req.body.sector, res.locals.errors);
    }else{
      tableIdValidation(req.body.id, res.locals.errors);
      sitsValidation(req.body.sits, res.locals.errors);
      sectotValidation(req.body.sector, res.locals.errors);
    }
    if(Object.keys(res.locals.errors).length){
      res.status(403).json({errors:res.locals.errors});
    }else next();
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports=router;