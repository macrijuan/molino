const { STRING, JSON, BOOLEAN } = require('sequelize');
const { setValue }=require("../formatter");

module.exports = (sequelize) => {
  sequelize.define('diet', {
    // id:{
    //   type: UUID,
    //   primaryKey:true,
    //   allowNull: false,
    //   defaultValue:UUIDV4
    // },
    name: {
      type: STRING,
      allowNull: false,
      set(value){
        this.setDataValue("name", value.toLowerCase());
      },
      validate:{
        len:[3, 30]
      }
    },
    description:{
      type:STRING,
      validate:{
        len:[0, 100]
      }
    },
    options:{
      type:JSON,
      defaultValue: {
        updatable:{"name":"string", "description":"string"},
        deleteable:true
      },
      set(value){
        this.setDataValue("options", setValue(value, this.rawAttributes.options.defaultValue));
      }
    }
  },{
    timestamps:false
  });
};