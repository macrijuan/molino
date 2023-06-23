const{Router}=require("express");
const router = Router();
const format = require("./Controller/format");
const existing = require("./Controller/existing");;
const{User}=require("../../../../db");
const {notFound, unknown} = require("../../../error");

router.put("/update_user/:id",
  (req,res,next)=>{res.locals.params=req.params; next();},
  format, existing, async(req,res)=>{
  try{
    User.findByPk(req.params.id)
      .then(user=>{
        if(user){
          user.update(req.body)
          .then(update=>update.save()
          .then(user=>{
            res.json(user);
          }))
          .catch(()=>{res.status(403).json({errors:{email:["This email is not valid."]}})});
        }else{
          res.status(404).json({errors:{not_found:notFound("User")}});
        };
      });
    }catch(err){
      console.log(err);
      res.status(500).json({errors:{unknown:unknown}});
    };
});

module.exports=router;