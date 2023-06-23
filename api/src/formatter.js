//dobleSpaceEraser recives a string, turns any doble spaces into single one and returns the new string.
function dobleSpaceEraser (str){
  let string = str;
  if(Array.isArray(str)){
    string.forEach(e=>{
      while(e.split("  ").length>1){
        e = e.replace("  ", " ");
      };
    });
  }else{
    while(string.split("  ").length>1){
      string = string.replace("  ", " ");
    };
  };
  return string;
};

function nameFormatter (string){
  let str = string;
  str = str.toLowerCase();
  str = str.replace(str[0], str[0].toUpperCase());
  return str;
};

module.exports = {
  dobleSpaceEraser,
  nameFormatter
};