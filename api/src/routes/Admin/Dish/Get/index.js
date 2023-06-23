const { Router } = require('express');
const router = Router();
const {getDishes, getDish}=require("./controller");
const errors = require("../../../error");

router.get("/get_dishes", async(req,res)=>{
	try{
		await getDishes().then((result)=>{
			if(result&&result.length){
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

router.get("/get_dish/:id", async(req,res)=>{
	try{
		getDish(req.params.id).then((result)=>{
			if(result&&result.available){
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