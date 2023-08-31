const {Router}=require("express");
const router = Router();
const {errJSON, notFound, unknown}=require("../../../error");
const {Table}=require("../../../../db");

router.delete("/delete_table/:id",async(req,res)=>{
  try{
    Table.findByPk(req.params.id)
    .then(table=>{
      if(table){
        table.destroy({force:true})
        .then(()=>{res.json(errJSON("message", `The table ${table.id} has been deleted.`))})
      }else res.status(404).json(errJSON("not_found", notFound("Table")));
    });
  }catch(err){
    console.log(err);
    res.status(500).json("unknown", unknown);
  };
});

module.exports = router;