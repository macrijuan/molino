const {Router}=require("express");
const router = Router();
const {errJSON, notFound} = require("../../../error");
const {existingDiet}=require("../Post/controller");
const {dietNameValidator, dietDescValidator}=require("../Post/validation");
const {updateDiet}=require("./controller");

router.put("/update_diet/:id",async(req,res)=>{
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
					updateDiet(req.params.id, name, description)
					.then(result2=>{
						if(result2){
							res.json({message:result2})
						}else{
							res.status(404).json(errJSON("not_found", notFound("Diet")));
						};
					});
				};
			});
		};
	}catch(err){
		console.log(err);
		res.status(500).json({errors:{unknown:error.unknown}});
	};
});

module.exports = router;