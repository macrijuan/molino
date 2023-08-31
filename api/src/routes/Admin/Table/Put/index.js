const {Router}=require("express");
const router=Router();
const {errJSON, unknown}=require("../../../error");
const {Table} = require("../../../../db");
const format = require("../Controller/format");
const exisisting = require("../Controller/existing");
const { setUpdatables } = require("../../../routeFormatter");

router.put("/update_table/:id",
  (req, res, next)=>{res.locals.update = true; next()},
  format,
  exisisting,
  async(req,res)=>{   
  try{
    Table.findByPk(req.params.id)
    .then(table=>{
      if(table){
        res.locals.update={};
        if(req.body.id)res.locals.update.id=req.body.id;
        if(req.body.sector)res.locals.update.sector=req.body.sector;
        if(req.body.sits)res.locals.update.sits = req.body.sits;
        table.update(res.locals.update)
        .then(table=>table.save()
          .then(table=>{
            if(req.query.single==="true"){
              res.json(table);
            }else{
              Table.findAndCountAll({
                attributes:{exclude:["updatable"]},
                offste:req.query.indes,
                limit:req.query.perPage
              }).then(tables=>{
                setUpdatables(tables, Table); res.json(tables);
              });
            };
          })
        );
      };
    });
  }catch(err){
    console.log(err);
    res.status(500).json(errJSON("unknown", unknown));
  };
});

module.exports=router;