const{Router}=require("express");
const router = Router();
const{setAdminAsDeleted}=require("./facilitator.js");
const error = require("../../../error.js");

router.delete("/delete_admin_user/:id",async(req,res)=>{
  try{
    setAdminAsDeleted(req.params.id)
    .then(deletionActivated=>{
      if(deletionActivated){
        res.status(200).json({message:"The administrator user has been deactivated and will be deleted permanently in 15 days."});
      }else{
        res.status(404).json({errors:{not_found:error.notFound("Administrator")}});
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json({errors:{unknown:error.unknown}});
  };
});

module.exports=router;