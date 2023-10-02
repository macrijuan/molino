const { Router } = require('express');
const router = Router();
const error = require("../../../error");
const {Dish}=require("../../../../db");
const {getMany}=require("../../../routeFormatter");

//The route /delete_dish/:id recives the dish's id the client wants to delete.
router.delete("/delete_dish/:id", async (req,res)=>{
	try{
		Dish.findByPk(req.params.id)
		.then(dish=>{
			if(dish){
				dish.destroy({force:true})
				.then(async ()=>{
					await getMany(Dish, req.query, res, "Dish");
				});
			}else{
				res.json({errors:{not_found:error.notFound("Dish")}});
			};
		});
	}catch(err){
		console.log(err);
		res.status(500).json({errors:{unknown:error.unknown}});
	};
});

//The route /delete_dishes recives throug body an array that has the id of the dishes the client wants to delete.
router.delete("/delete_dishes", async (req,res)=>{
	try{
		req.body.dishes.forEach(id=>{
			Dish.findByPk(id)
			.then(async dish=>{
				if(dish){
					await dish.destroy({force:true});
				};
			})
		}).then(()=>{res.json({message:"Dishes deleted."})});
	}catch(err){
		console.log(err);
		res.status(500).json({errors:{unknown:error.unknown}});
	};
});


module.exports = router;
// router.delete("/test",async(req,res)=>{
// 	Dish.findAndCountAll({limit:"2", offset:"0"}).then(dishes=>{res.json(dishes);});
// });


