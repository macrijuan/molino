const {Router}=require("express");
const router = Router();
const {Inventory}=require("../../../../db");
const {Op}=require("sequelize");
const {unknown, notFound}=require("../../../error");

router.get("/get_inventory", async (req,res)=>{
  try{
    Inventory.findAndCountAll({limit:req.query.perPage, offset:req.query.page})
    .then(inventory=>{
      console.log(inventory);
      if(inventory&&inventory.rows.length){
        res.json(inventory);
      }else{
        res.status(404).json({errors:{not_found:notFound("Elements")}});
      };
    });
  }catch(err){
    res.status(500).json({errors:{unknown:unknown}});
  };
});

router.get("/get_item/:id", async (req,res)=>{
  try{
    Inventory.findByPk(req.params.id)
    .then(item=>{
      if(item){
        res.json(item);
      }else{
        res.status(404).json({errors:{not_found:notFound("Item")}});
      };
    });
  }catch(err){
    res.status(500).json({errors:{unknown:unknown}});
  };
});

router.get("/get_by_name", async (req,res)=>{
  try{
    req.query.name=req.query.name.toLowerCase()
      Inventory.findAndCountAll({
        where:{
          name:{
            [Op.substring]: req.query.name
          }
        },
        limit:req.query.perPage,
        offset:req.query.index
      })
      .then(items=>{
        if(items){
          res.json(items);
        }else{
          res.status(404).json({errors:{not_found:notFound("Items")}});
        };
      });
  }catch(err){
    res.status(500).json({errors:{unknown:unknown}});
  };
});

router.get("/get_by_class", async (req,res)=>{
  try{
      Inventory.findAndCountAll({
        where:{
          class:req.query.class
        },
        limit:req.query.perPage,
        offset: req.query.index
      })
      .then(items=>{
        if(items){
          res.json(items);
        }else{
          res.status(404).json({errors:{not_found:notFound("Items")}});
        };
      });
  }catch(err){
    res.status(500).json({errors:{unknown:unknown}});
  };
});

module.exports = router;