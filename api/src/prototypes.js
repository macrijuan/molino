Array.prototype.errase = function(data){
  for(let a=0;a<this.length;a++){
    for(let b = 0; b<data.length; b++){
      if(this[a]===data[b])this.splice(a, 1);
    };
  };
  console.log(this);
};