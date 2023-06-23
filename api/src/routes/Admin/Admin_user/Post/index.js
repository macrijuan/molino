const { Router } = require('express');
const router = Router();
const format = require("./Controllers/format");
const existing = require("./Controllers/existing");
const {Admin}=require("../../../../db")
const {unknown}=require("../../../error");
const {dobleSpaceEraser}=require("../../../../formatter");

router.post("/post_admin_user", format, existing, async(req,res)=>{
  try{
    const {email, password, first_name, last_name}=req.body;
    Admin.create({ email, password, first_name:dobleSpaceEraser(first_name), last_name:dobleSpaceEraser(last_name) })
    .then((newAdmin=>{
      delete newAdmin.dataValues.password;
      res.status(200).json(newAdmin.dataValues);
    }));
  }catch(err){
    console.log(err);
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports = router;