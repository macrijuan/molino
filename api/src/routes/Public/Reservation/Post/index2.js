const { Router }=require("express");
const router = Router();
const format = require("../Controller/format.js");
const existing = require("../Controller/existing.js");
const maxResrs = require("../Controller/maximum.js");
const { Reservation, User }=require("../../../../db");
const { errJSON, unknown, notFound } = require("../../../error");

router.post("/post_reservation/:user",
(req,res,next)=>{res.locals.user = req.params.user; next();},
format,
maxResrs,
existing,
async(req,res)=>{
  try{
    User.findByPk(req.params.user)
    .then(user=>{
      if(user){
        res.locals.date = new Date(req.body.date);
        res.locals.ticket = undefined;
        const timer = setTimeout(async ()=>{
          Reservation.findByPk(res.locals.ticket)
          .then(resr=>{
            if(resr){
              resr.update({expired:true})
              .then(resr=>resr.save()
                .then(resr=>{
                  console.log(`Reserve ${resr.ticket} of user ${res.locals.user} has expired.`);
                }
              ));
            }else{
              res.status(404).json(errJSON("not_found", notFound("Reservation")));
            };
          });
        }, res.locals.date.getTime() -  Date.now() + 900000); // The client holds the reservation during extra 15 mins = 900000 ms
        Reservation.create({
          table: req.body.table,
          date: res.locals.date,
          user: res.locals.user,
          deletion_code: Number(timer)
        }).then((resr)=>{
          res.locals.ticket = resr.ticket;
          delete resr.dataValues.deletion_code;
          res.json(resr.dataValues);
        });
      }else{
        res.status(404).json(errJSON("not_found", notFound("User")));
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports = router;