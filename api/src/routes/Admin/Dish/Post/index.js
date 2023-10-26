const { Router } = require('express');
const router = Router();
const { Dish, Diet }=require("../../../../db")
const { unknown, errJSON } = require("../../../error");
const { getMany }=require("../../../routeFormatter");
const format = require("./Controller/format");
const existing = require("./Controller/existing");

router.post("/post_dish",
format,
existing,
async(req,res)=>{
	try{
		const {name, ingredients, diets, description, image, taste, price, available}=req.body;
    Dish.create({
      name, ingredients, diets, description, image, taste, price, available:eval(available)
    }).then(async (newDish)=>{
			if(req.query.single){
				res.json(newDish);
			}else{
				res.locals.data = {attributes:{include:{model:Diet, exclude:["id"]}}};
				await getMany(Dish, "Dish", req.query, res, "Dishes");
			};
    });
	}catch(err){
		console.log(err);
		res.status(500).json({errors:{unknown:unknown}});
	};
});

// router.post("/test", async(req,res)=>{
// 	Dish.findAndCountAll({limit:3, offset:0, include:Options, attributes:{exclude:["options"]}})
// 	.then(result=>{
// 		res.json(result);
// 	});
// });

module.exports = router;