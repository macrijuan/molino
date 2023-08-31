const { STRING, ARRAY, BOOLEAN, TEXT, INTEGER, ENUM } = require('sequelize');
const {arrayValidator} = require("../models_validations");
const {dobleSpaceEraser, setUpdatable, arrRemover}=require("../formatter");

module.exports = (sequelize) => {
  sequelize.define('dish', {
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
        this.setDataValue("name", value = dobleSpaceEraser(value));
        this.setDataValue("name", value = value.toLowerCase());
      },
      validate:{
        len:[3,30]
      }
    },

    ingredients:{
      type: ARRAY(STRING),
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
      type: ARRAY(STRING),
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
    //   type: JSON,
    //   allowNull: false,
    // },
    description:{
      type: STRING,
      set(value){
        this.setDataValue("description", value = dobleSpaceEraser(value));
      },
      validate:{
        len:[0, 500]
      }
    },

    image:{
      type:TEXT,
      validate:{
        len:[0,10000],
        isString:function(value){if(typeof value !== "string") throw new Error("Wrong data type.")}
      }
    },

    taste:{
      type:ENUM("salty", "sweet", "sour", "bittersweet", "bitter", "spicy"),
      allowNull:false
    },
    price:{
      type:INTEGER,
      validate:{
        max:100000,
        min:0
      }
    },
    available:{
      type:BOOLEAN,
      allowNull:false,
      defaultValue:true
    },
    updatable:{
      type:ARRAY(STRING),
      defaultValue:["name", "ingredients", "diets", "description", "image", "taste", "price", "available"],
      set(value){
        // const props = Object.keys(this.rawAttributes);
        this.setDataValue("updatable", setUpdatable(value, arrRemover(["id"], Object.keys(this.rawAttributes))));
      }
    }
  },{
    timestamps:false
  });
};