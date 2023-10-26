const {Router}=require("express");
const router = Router();
const {existingDiet, postDiet}=require("./controller");
const {dietNameValidator, dietDescValidator}=require("../validation");
const {Diet}=require("../../../../db");
const {getMany}=require("../../../routeFormatter");
const {unknown, errJSON} = require("../../../error");

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
			.then(async (result)=>{
				if(result){
					res.status(409).json({errors:{name:[result]}})
				}else{
					postDiet(name, description).then(async (diet)=>{
						if(req.query.single){
							res.json(diet);
						}else{
							await getMany(Diet, "Diet", req.query, res, "Diets");
						};
					});
				};
			});
		};
	}catch(err){
		console.log(err);
		res.status(500).json(errJSON("unknown", unknown));
	};
});

module.exports = router;