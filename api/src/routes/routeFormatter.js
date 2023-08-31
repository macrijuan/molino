
function setUpdatables(data, model){
  if(typeof data === "object" && !Array.isArray(data)){
    data.updatable=model.getAttributes().updatable.defaultValue;
  }else{
    throw new Error("The function 'setUpdatables' formats objects only.");
  };
};

module.exports = {
  setUpdatables
};