const { Router } = require('express');
const router = Router();
const datatype = require("./Controller/dataType");
const clauseSetter = require("./Controller/clauseSetter");
const {Op}=require("sequelize");
const {Dish}=require("../../../../db");
const {notFound, unknown, notFoundWith, errJSON} = require("../../../error");

router.get("/get_dishes", async(req,res)=>{
	try{
		Dish.findAndCountAll({limit:req.query.perPage, offset:req.query.index})
		.then((result)=>{
			if(result&&result.rows.length){
				res.status(200).json(result);
			}else{
				res.status(404).json(errJSON("not_found", notFound("Dish")));
			};
		});
	}catch(err){
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
	};
});

router.get("/get_dish/:id", async(req,res)=>{
	try{
		Dish.findByPk(req.params.id)
		.then((result)=>{
			if(result){
				res.json(result);
			}else{
				res.status(404).json(errJSON("not_found", notFound("Dish")));
			};
		});
	}catch(err){
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
	};
});

router.get("/get_by_filter",
datatype,
clauseSetter,
async(req,res)=>{
	try{
		console.log(req.body);
		Dish.findAndCountAll({
			where:res.locals.dataToMatch,
			limit:req.query.perPage,
			offset:req.query.index
		})
		.then((result)=>{
			res.status(200).json(result);
		}).catch(()=>{
			res.status(404).json(errJSON("not_found", notFound("Dish")));
		});
	}catch(err){
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
	};
});

module.exports = router;