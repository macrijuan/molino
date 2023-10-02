const {wrongLengthBetween, wrongNumberSize, isMandatory} = require("../../error");

function tableIdValidation(id, errors){
  errors.id=[];
  if(typeof id !== "string"){errors.id.push(isMandatory("id"));return;};
  if(!(id.length>1&&id.length<30))errors.id.push(wrongLengthBetween("table id", 1, 30));
  if(!errors.id.length)delete errors.id;
};

function sitsValidation(sits, errors){
  errors.sits=[];
  if(typeof sits !== "number" || sits===NaN){errors.sits.push(isMandatory("sits"));return;};
  if(sits<1 || sits>20)errors.sits.push(wrongNumberSize("sits", 0, 21));
  if(!errors.sits.length)delete errors.sits;
};

function sectorValidation(sector, errors){
  errors.sector=[];
  if(typeof sector !== "string"){errors.sector.push(isMandatory("sector"));return;};
  if(!(sector.length>=1&&sector.length<=30))errors.sector.push(wrongLengthBetween("sector", 1, 30));
  if(!errors.sector.length)delete errors.sector;
};

module.exports={
  tableIdValidation,
  sitsValidation,
  sectorValidation
};