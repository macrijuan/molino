const {Router}=require("express");
const router = Router();
const format = require("./Controller/format");
const existing = require("./Controller/existing");
const {Inventory}=require("../../../../db");
const {unknown, errJSON, equalToCurent, notFound}=require("../../../error");

router.put("/update_inventory/:id",
  (req,res,next)=>{res.locals.id = req.params.id; next()},
  format,
  existing,
  async (req,res)=>{
    try{
      Inventory.findByPk(req.params.id)
      .then(inventory=>{
        if(inventory){
          const equality = Object.keys(inventory.dataValues).find(prop=>{if(inventory[prop]===req.body[prop])return prop;})
          if(equality){
            res.json(errJSON(`${equality}`, equalToCurent(`${equality}`)));
          }else{
            inventory.update(req.body)
            .then(inventory=>inventory.save())
            .then(inventory=>{res.json(inventory)});
          };
        }else res.json(errJSON("not_found", notFound("Inventory's element")));
      });
    }catch(err){
      res.status(500).json({errors:{unknown:unknown}});
    };
  }
);

module.exports = router;