const { errJSON, unknown } = require("./error");

function setOptions(data){
  if(typeof data === "object" && !Array.isArray(data)){
    if(data.rows[0].rawAttributes.options){
      data.options= data.rows[0].rawAttributes.options.defaultValue;
    };
  }else{
    throw new Error("The function 'setOptions' formats objects only.");
  };
};



async function getMany(Model, query, res, notFoundData, defaultValue){
  ///update_data/:id?filters...&perPage=...&index=...
  defaultValue=Model.getAttributes().options.defaultValue;
  res.locals.filter = {attributes:{exclude:["options"]}};
  if(Object.keys(defaultValue.updatable).length){
    Object.keys(query).forEach(prop=>{
      if(typeof query[prop]==="string" && Object.keys(defaultValue.updatable).includes(prop)){
        res.locals.filter[prop]=query[prop];
      };
    });
  };
  res.locals.filter.limit=(query.perPage||12);
  res.locals.filter.offset=(query.index||0);
  Model.findAndCountAll(res.locals.filter)
  .then(data=>{
    if(data&&data.rows.length){
      if(defaultValue)setOptions(data);
      res.json(data);
    }else{
      res.json(errJSON("not_found", notFound(notFoundData)));
    };
  });
};

module.exports = {
  setOptions,
  getMany
};