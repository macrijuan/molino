const {Router}=require("express");
const router=Router();
const {errJSON, unknown}=require("../../../error");
const {Table} = require("../../../../db");
const format = require("../Controller/format");
const exisisting = require("../Controller/existing");

router.post("/post_table",
  format,
  exisisting,
  async(req,res)=>{   
  try{
    Table.create({id:req.body.id, sits:req.body.sits, sector:req.body.sector})
    .then(table=>{
      res.json(table);
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports=router;