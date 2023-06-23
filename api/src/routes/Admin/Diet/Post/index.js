const {Router}=require("express");
const router = Router();
const error = require("../../../error");
const {existingDiet, postDiet}=require("./controller");
const {dietNameValidator, dietDescValidator}=require("./validation");

router.post("/post_diet",async(req,res)=>{
	try{
		const {name, description}=req.body;
		const errors = {};
		dietDescValidator(description, errors);
		dietNameValidator(name, errors);
		if(Object.keys(errors).length){
			res.status(403).json({errors:errors});
		}else{
			existingDiet(name)
			.then((result)=>{
				if(result){
					res.status(409).json({errors:{name:[result]}})
				}else{
					postDiet(name, description)
					.then(result=>{res.json({message:`Diet "${result.name}" saved.`})});
				};
			});
		};
	}catch(err){
		console.log(err);
		res.status(500).json({errors:{unknown:error.unknown}});
	};
});

module.exports = router;