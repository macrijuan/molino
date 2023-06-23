const { DataTypes } = require('sequelize');
const {arrayValidator} = require("../models_validations");
const {dobleSpaceEraser, nameFormatter}=require("../formatter");

module.exports = (sequelize) => {
  sequelize.define('dish', {
    // id:{
    //   type: DataTypes.UUID,
    //   primaryKey:true,
    //   allowNull: false,
    //   defaultValue:UUIDV4
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value){
        this.setDataValue("name", value = dobleSpaceEraser(value));
        this.setDataValue("name", value = value.toLowerCase());
      },
      validate:{
        len:[3,30]
      }
    },

    ingredients:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      set(value){
        this.setDataValue("ingredients", value = dobleSpaceEraser(value));
        this.setDataValue("ingredients", value = value.map(i=>i.toLowerCase()));
      },
      validate:{
        arrValidation:function(value){arrayValidator(value, "Ingredient", 3, 30)}
      }
    },

    diets:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      set(value){
        this.setDataValue("diets", value = dobleSpaceEraser(value));
        this.setDataValue("diets", value.map(diet=>diet.toLowerCase()));
      },
      validate:{
        arrValidation:function(value){arrayValidator(value, "Diet", 3, 30)}
      }
    },

    // nutrients:{
    //   type: DataTypes.JSON,
    //   allowNull: false,
    // },
    description:{
      type: DataTypes.STRING,
      set(value){
        this.setDataValue("description", value = dobleSpaceEraser(value));
      },
      validate:{
        len:[0, 500]
      }
    },

    image:{
      type:DataTypes.TEXT,
      validate:{
        len:[0,10000],
        isString:function(value){if(typeof value !== "string") throw new Error("Wrong data type.")}
      }
    },

    taste:{
      type:DataTypes.ENUM("salty", "sweet", "sour", "bittersweet", "bitter", "spicy"),
      allowNull:false
    },

    available:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
  },{
    timestamps:false
  });
};