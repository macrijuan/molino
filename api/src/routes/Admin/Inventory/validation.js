const {wrongLengthBetween, wrongNumberSize, wrongDataType}=require("../../error");

function nameValidator(name, errors){
  if(typeof name !== "string"){
    errors.name.push(wrongDataType)
  }else{
    console.log(errors);
    if(name.length>30 || name.length<1) errors.push(wrongLengthBetween("name", 1, 30));
  };
};

function quantityValidator(quantity, errors){
  if(typeof quantity !== "number"){
    errors.name.push(wrongDataType)
  }else{
    if(quantity>100000 || quantity<0) errors.push(wrongNumberSize("quantity", 100000, 0));
  };
};

module.exports = {
  nameValidator,
  quantityValidator
};