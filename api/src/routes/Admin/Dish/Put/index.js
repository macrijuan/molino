const { Router } = require('express');
const router = Router();
const format = require("./Controller/format");
const existing = require("./Controller/existing");
const {Dish}=require("../../../../db");
const {getMany}=require("../../../routeFormatter");
const {notFound, unknown, errJSON} = require("../../../error");

Array.prototype.manager = function(array){
	if(!Array.isArray(array))throw new Error("Array.prototype.manager--> data's not array.");
  let a = 0; 
  while(a<array.length){
		if(!(typeof array[a]==="string"))throw new Error("Array.prototype.manager--> data inside array is not string type.");
    if(this.includes(array[a])){
      this.splice(this.indexOf(array[a]), 1);
    }else{
      this.push(array[a]);
    };
    a++;
  };
  return this;
};

router.put("/update_dish/:id",
	(req,res, next)=>{res.locals.params=req.params; res.locals.errors={}; next();},
	format,
 	existing,
 	async(req,res)=>{
	try{
		Dish.findByPk(req.params.id)
		.then(async (dish)=>{
			if(dish){
				if(req.body.ingredients){
					req.body.ingredients=[...dish.ingredients.manager(req.body.ingredients)];
					if(!req.body.ingredients.length)return res.json(errJSON("ingredients", "Is not possible to delete all the ingredients of a dish."));
					await dish.changed("ingredients", true);
				};
				if(req.body.diets){
					req.body.diets=[...dish.body.manager(req.body.diets)];
					if(!req.body.diets.length)return res.json(errJSON("diets", "Is not possible to delete all the diets of a dish."));
					await dish.changed("diets", true);
				};
				dish.update(req.body)
				.then(updatedDish=>updatedDish.save())
				.then(async (dish)=>{
					if(req.query.single==="t"){
						res.json(dish);
					}else{
						await getMany(Dish, req.query, res, "Dishes");
					};
				});
			}else{
				res.status(404).json(errJSON("not_found", notFound("Dishes")));
			};
		});
	}catch(err){
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
	};
});

module.exports = router;
// router.put("/test", async(req,res)=>{
// 	try{
// 		res.json(Dish.getAttributes().updatable.defaultValue);
// 	}catch(err){
// 		res.send("ERROR: "+err);
// 	};
// });
