const {wrongLengthBetween, wrongNumberSize} = require("../../error");

function tableIdValidation(id, errors){
  errors.id=[];
  console.log("id: "+id);
  if(!(id.length>1&&id.length<30))errors.id.push(wrongLengthBetween("table id", 1, 30));
  if(!errors.id.length)delete errors.id;
};

function sitsValidation(sits, errors){
  errors.sits=[];
  console.log("sits: "+sits);
  if(!(sits>=1&&sits<=20))errors.sits.push(wrongNumberSize("sits", 1, 20));
  if(!errors.sits.length)delete errors.sits;
};

function sectotValidation(sector, errors){
  errors.sector=[];
  console.log("sector: "+sector);
  if(!(sector.length>=1&&sector.length<=30))errors.sector.push(wrongLengthBetween("sector", 1, 30));
  if(!errors.sector.length)delete errors.sector;
};

module.exports={
  tableIdValidation,
  sitsValidation,
  sectotValidation
};