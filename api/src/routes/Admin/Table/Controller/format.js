const {Router}=require("express");
const router=Router();
const {errJSON, unknown}=require("../../../error");
const {tableNameValidation, sitsValidation, sectorValidation}= require("../validation");

router.use(async(req,res,next)=>{
  try{
    res.locals.errors={};
    if(res.locals.update){
      if(req.body.name !== undefined)tableNameValidation(req.body.name, res.locals.errors);
      if(req.body.sits !== undefined){
        req.body.sits = Number(req.body.sits);
        sitsValidation(req.body.sits, res.locals.errors);
      };
      if(req.body.sector !== undefined)sectorValidation(req.body.sector, res.locals.errors);
    }else{
      console.log(req.body);
      tableNameValidation(req.body.name, res.locals.errors);
      req.body.sits = Number(req.body.sits);
      sitsValidation(req.body.sits, res.locals.errors);
      sectorValidation(req.body.sector, res.locals.errors);
    };
    if(Object.keys(res.locals.errors).length){
      res.status(403).json({errors:res.locals.errors});
    }else next();
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports=router;