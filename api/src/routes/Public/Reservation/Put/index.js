const {Router}=require("express");
const router = Router();
const format = require("../Controller/format");
const existing = require("../Controller/existing");
const {Reservation}=require("../../../../db");
const { errJSON, notFound, unknown } = require("../../../error");

router.put("/update_reservation/:user/:ticket",
(req,res,next)=>{res.locals.user = req.params.user; res.locals.update=true; next()},
format,
existing,
async(req,res)=>{
  try{
    Reservation.findByPk(req.params.ticket)
    .then(async resr=>{
      if(resr){
        resr.update(req.body)
        .then(async resr=>{
          resr.save().then(resr=>{ res.json(resr); });
        });
      }else{
        res.status(404).json(errJSON("not_found", notFound("Reservation")));
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports = router;