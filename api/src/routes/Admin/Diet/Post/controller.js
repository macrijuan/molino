const {Diet}=require("../../../../db");
const error = require("../../../error");

async function existingDiet(dietName){
    return Diet.findOne({where:{name:dietName}})
    .then(res=>{
        if(res)return error.existing("diet");
    });
};

async function postDiet(dietName, description){
    return Diet.create({name:dietName, description})
    .then(res=>res);
};

module.exports = {
    existingDiet,
    postDiet
};