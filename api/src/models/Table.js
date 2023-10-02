const { INTEGER, STRING, ENUM, JSON, BOOLEAN } = require("sequelize");
const {setValue}=require("../formatter")

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
      type:ENUM("A", "I", "F", "VIP"),
      allowNull:false,
      validate:{
        len:[1,30]
      },
      set(value){
        this.setDataValue("sector", value.toUpperCase());
      }
    },
    options:{
      type:JSON,
      defaultValue:{updatable:{"id":"string", "sits":"string", "sector":["A", "I", "F", "VIP"]}, deleteable:true},
      set(value){
        this.setDataValue("options", setValue(value, this.rawAttributes.options.defaultValue));
      }
    }
  },
  {
    timestamps:false
  });
};