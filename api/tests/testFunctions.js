function lengthExpansor(maxNumber){
  let str = "eeeeeeeeee";
  while(str.length<maxNumber){
    str = str+str;
  }
  return str;
};

export {lengthExpansor};