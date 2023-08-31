const { Router } = require('express');
const router = Router();
const format = require("./format");
const existing = require("./existing");
const {Dish}=require("../../../../db");
const {notFound, unknown} = require("../../../error");

router.put("/update_dish/:id",
	(req,res, next)=>{res.locals.params=req.params; res.locals.errors={}; next();},
	format,
 	existing,
 	async(req,res)=>{
	try{
			Dish.findByPk(req.params.id)
			.then((dish)=>{
				if(dish){
          dish.update(req.body)
          .then((updatedDish)=>updatedDish.save())
          .then((dish)=>{
						if(dish)res.json(dish);
					});
				}else{
					res.status(404).json({errors:{not_found:notFound("Dish")}});
				};
			});
	}catch(err){
		console.log(err);
		res.status(500).json({errors:{unknown:unknown}});
	};
});

module.exports = router;