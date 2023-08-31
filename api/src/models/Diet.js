const { STRING, ARRAY } = require('sequelize');
const { setUpdatable }=require("../formatter");

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
    updatable:{
      type:ARRAY(STRING),
      defaultValue:["name", "description"],
      set(value){
        this.setDataValue("updatable", setUpdatable(value, ["name", "description"]));
      }
    }
  },{
    timestamps:false
  });
};