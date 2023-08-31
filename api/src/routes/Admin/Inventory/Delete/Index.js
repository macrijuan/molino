const {Router}=require("express");
const router = Router();
const {Inventory}=require("../../../../db");
const {unknown, errJSON, notFound}=require("../../../error");

router.delete("/delete_inventory/:id",
  async (req,res)=>{
    try{
      Inventory.findByPk(req.params.id)
      .then(inventory=>{
        if(inventory){
          inventory.destroy({force:true}).then(()=>{res.json(errJSON("message", "The element of inventory has been deleted."))});
        }else res.json(errJSON("not_found", notFound("Inventory's element")));
      });
    }catch(err){
      res.status(500).json({errors:{unknown:unknown}});
    };
  }
);

module.exports = router;