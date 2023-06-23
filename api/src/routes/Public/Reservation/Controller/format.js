const {tableValidator, customersValidator, dateValidator, userOwnerValidator}=require("../validation");
const {Router}=require("express");
const router = Router();

router.use((req,res,next)=>{
  res.locals.errors = {};
  if(res.locals.update){
    if(req.body.table)tableValidator(req.body.table, res.locals.errors);
    if(req.body.date)dateValidator(req.body.date, res.locals.errors);
  }else{
    tableValidator(req.body.table, res.locals.errors);
    dateValidator(req.body.date, res.locals.errors);
  };
  userOwnerValidator(res.locals.user, res.locals.errors);
  if(Object.keys(res.locals.errors).length){
    res.status(403).json(res.locals.errors);
  }else{
    next();
  };
});

module.exports = router;