const {Router} = require("express");
const router = Router();
const {Diet}=require("../../../../db");
const { notFound, unknown } = require("../../../error");

router.delete("/delete_diet/:id", async(req,res)=>{
  try{
    Diet.findByPk(req.params.id)
    .then(diet=>{
      if(diet){
        diet.destroy({force:true}).then(()=>{res.json(`The diet "${diet.name}" has been deleted.`)});
      }else{
        res.status(404).json({errors:{not_found:notFound("Diet")}});
      };
    });
  }catch(err){
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports = router;