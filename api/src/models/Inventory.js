const { STRING, INTEGER, ENUM, JSON, BOOLEAN } = require('sequelize');
const { arrRemover, setValue } = require('../formatter');
module.exports = (sequelize) => {
  sequelize.define('inventory', {
    // id:{
    //   type: UUID,
    //   primaryKey:true,
    //   allowNull: false,
    //   defaultValue:UUIDV4
    // },
    name: {
      type: STRING,
      allowNull: false,
      unique:true,
      set(value){
        this.setDataValue("name", value.toLowerCase());
      },
      validate:{
        len:[1, 30]
      }
    },
    quantity:{
      type: INTEGER,
      allowNull:false,
      validate:{
        max:100000,
        min:0
      }
    },
    unit:{
      type:ENUM("Kg", "g", "oz", "ton", "lb", "u"),
      allowNull:false
    },
    class:{
      type: ENUM("Vegetal", "Animal", "Mixed", "Furniture", "Tableware", "Dinner set", "Other"),
      allowNull:false,
    },
    options:{
      type:JSON,
      defaultValue:{
        updatable:{
        "name":"string",
        "quantity":"string",
        "unit":["Kg", "g", "oz", "ton", "lb", "u"],
        "class":["Vegetal", "Animal", "Mixed", "Furniture", "Tableware", "Dinner set", "Other"]
        },
        deleteable:true
      },
      set(value){
        this.setDataValue("options", setValue(value,this.rawAttributes.options.defaultValue));
      }
    }
  },{
    timestamps:false
  });
};

// arrRemover(["id"], Object.keys(this.rawAttributes))