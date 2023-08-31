const {Router}=require("express");
const router = Router();
const format = require("./Controller/format");
const existing = require("./Controller/existing");
const {Inventory}=require("../../../../db");
const {unknown}=require("../../../error");

router.post("/post_element",
  format,
  existing,
  async (req,res)=>{
    try{
      Inventory.create(req.body)
      .then(e=>{res.json(e)});
    }catch(err){
      res.status(500).json({errors:{unknown:unknown}});
    };
  }
);

module.exports = router;