const {Router} = require("express");
const router = Router();
const {Op}=require("sequelize");
const{ Reservation }=require("../../../../db");
const {errJSON, unknown, notFound}=require("../../../error");
const { setOptions }=require("../../../routeFormatter");

router.get("/get_reservations", async(req,res)=>{
  try{
    Reservation.findAndCountAll({
      where:{expired:false},
      offset:(req.query.index || 0), limit:(req.query.perPage || 12)
    }).then(resrs=>{
      if(resrs&&resrs.rows.length){
        res.json(resrs);
      }else{
        res.status(404).json(errJSON("not_found", notFound("Reservations")));
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

router.get("/get_by_meridiem_time", async(req,res)=>{
  try{
    Reservation.findAndCountAll({
      where:{meridiem_time:req.query.meridiem_time},
      attributes:{exclude:["options"]},
      offset:req.query.index, limit:req.query.perPage
    }).then(resrs=>{
      if(resrs.rows.length){
        setOptions(resrs); res.json(resrs);
      }else{
        res.status(404).json(errJSON("not_found", notFound("Reservations")));
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

router.get("/get_by_date",async(req,res)=>{
  try{
    Reservation.findAndCountAll({
      where:{date:req.query.date},
      attributes:{exclude:["options"]},
      offset:req.query.index, limit:req.query.perPage
    }).then(resrs=>{
      if(resrs.rows.length){
        setOptions(resrs); res.json(resrs);
      }else{
        res.status(404).json(errJSON("not_found", notFound("Reservations")));
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

router.get("/get_by_day",async(req,res)=>{
  try{
    Reservation.findAndCountAll({
      where:{day:req.query.day},
      attributes:{exclude:["options"]},
      offset:req.query.index, limit:req.query.perPage
    }).then(resrs=>{
      if(resrs.rows.length){
        setOptions(resrs); res.json(resrs);
      }else{
        res.status(404).json(errJSON("not_found", notFound("Reservations")));
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

router.get("/get_by_time",async(req,res)=>{
  try{
    Reservation.findAndCountAll({
      where:{time:req.query.time},
      attributes:{exclude:["options"]},
      offset:req.query.index, limit:req.query.perPage
    }).then(resrs=>{
      if(resrs.rows.length){
        setOptions(resrs); res.json(resrs);
      }else{
        res.status(404).json(errJSON("not_found", notFound("Reservations")));
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports = router;