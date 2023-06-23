const {Router}=require("express");
const router = Router();
const {Admin}=require("../../../../db");
const {Op}=require("sequelize");
const {notFound}=require("../../../error");

router.get("/get_admin_users", async(req,res)=>{
  Admin.findAndCountAll({offset:req.query.index, limit:req.query.perPage})
  .then(admins=>{
    if(admins&&admins.rows.length){
      res.json(admins);
    }else{
      res.status(404).json({errors:{not_found:notFound("Administrators")}});
    };
  });
});

router.get("/get_admin_user/:id", async(req,res)=>{
  Admin.findByPk(req.params.id)
  .then(admin=>{
    if(admin){
      delete admin.dataValues.password;
      res.json(admin.dataValues);
    }else{
      res.status(404).json({errors:{not_found:notFound("Administrator")}});
    };
  });
});

router.get("/get_by_name", async(req,res)=>{
  console.log(req.body.first_name);
  Admin.findAndCountAll({
    where:{[Op.or]:[
      {first_name:{[Op.substring]:[req.body.first_name]}},
      {last_name:{[Op.substring]:[req.body.last_name]}},
    ]},
    offset:req.query.index,
    limit:req.query.perPage
  })
  .then(admins=>{
    if(admins&&admins.rows.length){
      res.json(admins);
    }else{
      res.status(404).json({errors:{not_found:notFound("Administrators")}});
    };
  });
});

module.exports = router;