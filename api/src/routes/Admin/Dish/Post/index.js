const { Router } = require('express');
const router = Router();
const {Dish}=require("../../../../db");
const {unknown} = require("../../../error");
const format = require("./Controller/format");
const existing = require("./Controller/existing");

router.post("/post_dish",
format,
existing,
async(req,res)=>{
	try{
		const {name, ingredients, diets, description, image, taste, price}=req.body;
    Dish.create({
      name, ingredients, diets, description, image, taste, price
    }).then((newDish)=>{
      res.status(200).json(newDish);
    });
	}catch(err){
		console.log(err);
		res.status(500).json({errors:{unknown:unknown}});
	};
});

module.exports = router;