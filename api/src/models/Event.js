const { STRING, INTEGER, TIME, DATEONLY, DATE, UUID, UUIDV4 } = require("sequelize");
module.exports = sequelize=>{
  sequelize.define("event", {
    name:{
      type:STRING
    },
    user:{
      type:INTEGER
      // type:UUID
      
    },
    customers:{
      type:INTEGER
      
    },
    requests:{
      type:STRING
      
    },
    date:{
      type:DATE
      
    },
    day:{
      type:DATEONLY
      
    },
    time:{
      type:TIME

    }
  },{
    timestamps:false
  });
};