const { errJSON, notFound } = require("./error");
const {Option}=require("../db");
const {Op}=require("sequelize");

async function setOptions(data, model){
  if(typeof data === "object" && !Array.isArray(data)){
    return Option.findOne({where:{model:model}, attributes:{exclude:["id", "model"]}})
    .then(opt=>{
      data.options=opt;
    });
  }else{
    throw new Error("routeFormatter --> setOptions --> the function formats objects only.");
  };
};

async function getMany(Model, modelName, query, res, notFoundData){
  ///update_.../:id?perPage=...&index=...&...
  const keys = Object.keys(query);
  if(!res.locals.data)res.locals.data={};
  res.locals.data={
    ...res.locals.data,
    attributes:{...res.locals.data.attributes, exclude:["optionId"]},
    limit:(query.perPage || 12),
    offset:(query.index || 0)
  };
  const dataToSearch = keys.filter(prop=>(prop!=="perPage" && prop!=="index"));
  if(dataToSearch.length){
    res.locals.data.where={};
    dataToSearch.forEach(prop=>{
      const qryVal = eval(query[prop]);
      if(typeof qryVal === "string"){
        res.locals.data.where[prop] = { [Op.substring]: qryVal };
      }else if( Array.isArray(qryVal) && prop !== "diets" ){
        res.locals.data.where[prop] = { [Op.contains]: qryVal };
      }else if(typeof qryVal === "number"){
        res.locals.data.where[prop] = qryVal;
      };
    });
  };
  console.log(res.locals.data);
  Model.findAndCountAll(res.locals.data)
  .then(async _data=>{
    if(_data&&_data.rows.length){
      if(modelName==="Dish"){
        for(let a = 0; a<_data.rows.length; a++){
          _data.rows[a] = _data.rows[a].get({plain:true});
          _data.rows[a].diets = _data.rows[a].diets.map(diet=>diet.name);
        };
      };
      res.json(_data); 
    }else{
      res.status(404).json(errJSON("not_found", notFound(notFoundData)));
    };
  });
};

module.exports = {
  setOptions,
  getMany
};