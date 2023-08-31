const {Router}=require("express");
const router = Router();
const {Admin}=require("../../../../db");
const {Op}=require("sequelize");
const {notFound, errJSON}=require("../../../error");
const { setUpdatables }=require("../../../routeFormatter");

router.get("/get_admin_users", async(req,res)=>{
  Admin.findAndCountAll({
    attributes:{
      exclude:["password", "updatable"]
    },
    offset:req.query.index,
    limit:req.query.perPage
  }).then(admins=>{
    if(admins&&admins.rows.length){
      setUpdatables(admins, Admin); res.json(admins);
    }else{
      res.status(404).json(errJSON("not_found", notFound("Administrators")));
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
      res.status(404).json(errJSON("not_found", notFound("Administrator")));
    };
  });
});

router.get("/get_by_name", async(req,res)=>{
  Admin.findAndCountAll({
    where:{[Op.or]:[
      {first_name:{[Op.substring]:[req.body.first_name]}},
      {last_name:{[Op.substring]:[req.body.last_name]}},
    ]},
    attributes:{
      exclude:["password", "udpatable"]
    },
    offset:req.query.index,
    limit:req.query.perPage
  })
  .then(admins=>{
    if(admins&&admins.rows.length){
      setUpdatables(admins, Admin); res.json(admins);
    }else{
      res.status(404).json(errJSON("not_found", notFound("Administrators")));
    };
  });
});

router.get("/login", async(req,res)=>{
  Admin.findOne({
    where:{
      email:req.query.email
    },
    offset:req.query.index,
    limit:req.query.perPage
  })
  .then(admin=>{
    if(admin){
      if(admin.password===req.query.password){
        delete admin.dataValues.password;
        res.json(admin);
      }else res.status(403).json(errJSON("password", "The password is incorrect."));
    }else{
      res.status(404).json(errJSON("not_found", notFound("Administrator")));
    };
  });
});

module.exports = router;