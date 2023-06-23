const {Dish}=require("../../../../db");

async function getDishes(){
	return await Dish.findAll({
		where:{available:true}
	});
};

async function getDish(pk){
	return await Dish.findByPk(pk);
};

module.exports = {
	getDishes,
	getDish
};