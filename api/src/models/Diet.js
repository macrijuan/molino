const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('diet', {
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
        this.setDataValue("name", value.toLowerCase());
      },
      validate:{
        len:[3, 30]
      }
    },
    description:{
      type:DataTypes.STRING,
      validate:{
        len:[0, 100]
      }
    }
  },{
    timestamps:false
  });
};