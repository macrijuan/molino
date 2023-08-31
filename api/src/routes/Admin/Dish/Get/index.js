const { Router } = require('express');
const router = Router();
const {Dish}=require("../../../../db");
const errors = require("../../../error");
const { setUpdatables }=require("../../../routeFormatter");

router.get("/get_dishes", async(req,res)=>{
	try{
		Dish.findAndCountAll({offset:req.query.index, limit:req.query.perPage, attributes:{exclude:["updatable"]}})
		.then((result)=>{
			if(result.rows&&result.rows.length){
				setUpdatables(result, Dish);res.status(200).json(result);
			}else{
				res.status(404).json({errors:{not_found:errors.notFound("Dish")}});
			};
		});
	}catch(err){
		console.log(err);
		res.status(500).json({errors:{unknown:errors.unknown}});
	};
});

router.get("/get_dish/:id", async(req,res)=>{
	try{
		Dish.findByPk(req.params.id)
		.then((result)=>{
			if(result){
				res.status(200).json(result);
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