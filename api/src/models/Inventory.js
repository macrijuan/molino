const { STRING, INTEGER, ENUM, ARRAY } = require('sequelize');
const { arrRemover, setUpdatable } = require('../formatter');
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
      type: ENUM("Vegetable", "Animal", "Mixed", "Furniture", "Tableware", "Dinner set", "Other"),
      allowNull:false,
    },
    updatable:{
      type:ARRAY(STRING),
      defaultValue:["name", "quantity", "unit", "class"],
      set(value){
        this.setDataValue("updatable", setUpdatable(value,["name", "quantity", "unit", "class"]));
      }
    }
  },{
    timestamps:false
  });
};

// arrRemover(["id"], Object.keys(this.rawAttributes))