const {Diet}=require("../../../../db");

async function updateDiet(pk, dietName, description){
	return Diet.findByPk(pk)
	.then(res=>{
		if(res)return res.update({name:dietName, description})
		.then(res2=>res2.save().then(()=>"Diet updated."));
	});
};

module.exports={
	updateDiet
};