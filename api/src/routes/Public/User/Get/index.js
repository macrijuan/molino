const { Router } = require('express');
const router = Router();
const { User } = require("../../../../db");
const {notFound, unknown} = require("../../../error.js");

router.get("/get_users", async(req,res)=>{
  try{
    User.findAll()
    .then(users=>{
      if(users && users.length){
        const data=users.map(e=>{
          const {id, email, first_name, last_name}=e;
          return {id, email, first_name, last_name};
        });
        res.status(200).json(data);
      }else{
        res.status(404).json({errors:{not_found:notFound("Users")}});
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json({errors:{unknown:unknown}});
  };
});

router.get("/get_user/:id", async(req,res)=>{
  try{
    User.findByPk(req.params.id)
    .then(user=>{
      if(user){
        delete user.dataValues.password;
        res.status(200).json(user.dataValues);
      }else{
        res.status(404).json({errors:{not_found:notFound("User")}});
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports = router;