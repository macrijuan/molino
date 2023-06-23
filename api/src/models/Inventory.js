const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('inventory', {
    // id:{
    //   type: DataTypes.UUID,
    //   primaryKey:true,
    //   allowNull: false,
    //   defaultValue:UUIDV4
    // },
    name: {
      type: DataTypes.STRING,
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
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        max:100000,
        min:0
      }
    },
    unit:{
      type:DataTypes.ENUM("Kg", "g", "oz", "ton", "lb", "u"),
      allowNull:false
    },
    class:{
      type: DataTypes.ENUM("Vegetable", "Animal", "Mixed", "Furniture", "Tableware", "Dinner set", "Other"),
      allowNull:false,
    }
  },{
    timestamps:false
  });
};