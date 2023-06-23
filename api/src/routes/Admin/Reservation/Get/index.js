const {Router} = require("express");
const router = Router();
const {Op}=require("sequelize");
const{ Reservation }=require("../../../../db");
const {errJSON, unknown, notFound}=require("../../../error");

router.get("/get_reservations", async(req,res)=>{
  try{
    Reservation.findAndCountAll({
      where:{expired:false},
      offset:req.query.index, limit:req.query.perPage
    }).then(resrs=>{
      if(resrs.rows.length){
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
      offset:req.query.index, limit:req.query.perPage
    }).then(resrs=>{
      if(resrs.rows.length){
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

router.get("/get_by_date",async(req,res)=>{
  try{
    Reservation.findAndCountAll({
      where:{date:req.query.date},
      offset:req.query.index, limit:req.query.perPage
    }).then(resrs=>{
      if(resrs.rows.length){
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

router.get("/get_by_day",async(req,res)=>{
  try{
    Reservation.findAndCountAll({
      where:{day:req.query.day},
      offset:req.query.index, limit:req.query.perPage
    }).then(resrs=>{
      if(resrs.rows.length){
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

router.get("/get_by_time",async(req,res)=>{
  try{
    Reservation.findAndCountAll({
      where:{time:req.query.time},
      offset:req.query.index, limit:req.query.perPage
    }).then(resrs=>{
      if(resrs.rows.length){
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

module.exports = router;