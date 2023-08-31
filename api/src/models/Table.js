const {INTEGER, STRING, ARRAY} = require("sequelize");

module.exports= (sequelize)=>{
  sequelize.define("table",{
    id:{
      type:STRING,
      primaryKey:true,
      unique:true,
      validate:{
        len:[1,30]
      },
      set(value){
        this.setDataValue("id", value.toUpperCase());
      }
    },
    sits:{
      type: INTEGER,
      allowNull:false,
      validate:{
        max:20,
        min:1
      }
    },
    sector:{
      type:STRING,
      allowNull:false,
      validate:{
        len:[1,30]
      },
      set(value){
        this.setDataValue("sector", value.toUpperCase());
      }
    },
    updatable:{
      type:ARRAY(STRING),
      defaultValue:["id", "sits", "sector"],
      set(value){
        this.setDataValue("updatable", setUpdatable(value, ["id", "sits", "sector"]));
      }
    }
  },
  {
    timestamps:false
  });
};