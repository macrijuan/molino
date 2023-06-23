const{Router}=require("express");
const router = Router();
const format = require("./Controller/format");
const existing = require("./Controller/existing");;
const{Admin}=require("../../../../db");
const {notFound, unknown} = require("../../../error");

router.put("/update_admin_user/:id",
  (req,res,next)=>{res.locals.params=req.params; next();},
  format, existing, async(req,res)=>{
  try{
      Admin.findByPk(req.params.id)
      .then(admin=>{
        if(admin){
          admin.update(req.body)
          .then(update=>update.save()
            .then(admin=>{
              res.json(admin);
            })
          );
        }else{
          res.status(404).json({errors:{not_found:notFound("Administrator")}});
        };
      });
    }catch(err){
      res.status(500).json({errors:{unknown:unknown}});
    };
});

module.exports=router;