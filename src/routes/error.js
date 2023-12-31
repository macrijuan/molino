module.exports = {
  errJSON : function (errorName, errorMessage){return {errors:{[errorName]:errorMessage}}},
  unknown: "Oh, no! There was a problem.",
  notFound: function(data){return `${data} not found.`;},
  notFoundWith: function(data){return `${data} with the specified data not found.`;},
  noStock: function(data){return `${data} out of stock.`;},
  wrongDataType: "Wrong datatype.",
  cantContain: function(dataName, data){return `The ${dataName} field can't contain ${data}.`;},
  existing: function(data){return `This ${data} is already registered.`;},
  existingFor: function(data1, data2){return `This ${data1} belongs to another ${data2}.`;},
  copyedData: function(data){return `There are copies of the value "${data}".`;},
  equalToCurent: function(dataName){return `The entered ${dataName} is equal to the current one.`;},
  wrongLengthBetween: function(dataName, minLen, maxLen){return`The ${dataName} field must contain between ${minLen} and ${maxLen} characters.`;},
  wrongLengthBetweenArr: function (model, minLen, maxLen, arrElement){return`Each ${model} must contain between ${minLen} and ${maxLen} characters. ${model.replace(model[0], model[0].toUpperCase())}: ${arrElement}`;},
  maxLength: function(data, max){return `The ${data} can't be longer than ${max} characters.`},
  atLeastOne: function(data, data2){return`The ${data} field must contain at least one ${data2}.`;},
  isMandatory: function(data){return`The ${data} field is mandatory.`;},
  wrongCharType: function(dataName, allowedChars, element){return`The ${dataName} can contain only ${allowedChars}. Element: ${element}`;},
  wrongCharTypeArr: function(dataName, allowedChars, arrElement){return`Each ${dataName} can contain only ${allowedChars}. ${dataName.replace(dataName[0], dataName[0].toUpperCase())}: ${arrElement}`;},
  wrongNumberSize: function(dataName, min, max){return`The ${dataName} field must be bigger than ${min} and smaller than ${max}`;}
};