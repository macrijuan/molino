const { Router } = require('express');
const router = Router();
const {Dish, Diet}=require("../../../../db");
const errors = require("../../../error");
const { getMany }=require("../../../routeFormatter");
const {Op}=require("sequelize");

router.get("/get_dishes", async(req,res)=>{
	try{
		res.locals.data = { 
			include:[ 
				{
					model:Diet, 
					attributes:{ exclude:[ "id", "description", "optionId" ] },
					through:{ attributes:[] }
				} 
			],
			distinct:true 
		};
		if(req.query.diets) res.locals.data.include[0].where={ name:{ [Op.in]:eval(req.query.diets) } };
		await getMany(Dish, "Dish", req.query, res, "Dishes");
	}catch(err){
		console.log(err);
		res.status(500).json({errors:{unknown:errors.unknown}});
	};
});

router.get("/get_dishes/test", async(req,res)=>{
	Dish.findAndCountAll({
		limit:12, offset:0,
		include: [{
			model: Diet,
			where: { name:{[Op.in]:["vegetarian", "vegan"]} },
		}],
		where:{
			name:{[Op.substring]:'to'}
		},
		distinct:true
	})
	.then(dishes => {console.log(dishes); res.send(dishes)})
	.catch(err=>res.send(err));
});

router.get("/get_dish/:id", async(req,res)=>{
	try{
		Dish.findByPk(req.params.id)
		.then((dish)=>{
			if(dish){
				res.status(200).json(dish);
			}else{
				res.status(404).json({errors:{not_found:errors.notFound("Dish")}});
			};
		});
	}catch(err){
		console.log(err);
		res.status(500).json({errors:{unknown:errors.unknown}});
	};
});




module.exports = router;