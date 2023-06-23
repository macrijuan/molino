const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('admin_deleted', {
    // id:{
    //   type: DataTypes.UUID,
    //   primaryKey:true,
    //   allowNull: false,
    //   defaultValue:DataTypes.UUIDV4
    // },
    email:{
      type:DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{
        isEmail:true,
        len:[7,254]
      }
    },
    password:{
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[8,35]
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value){
        this.setDataValue("first_name", value.toUpperCase());
      },
      validate:{
        len:[2,35]
      }
    },
    last_name:{
      type:DataTypes.STRING,
      allowNull: false,
      set(value){
        this.setDataValue("last_name", value.toUpperCase());
      },
      validate:{
        len:[2,35]
      }
    },
    status:{
      type:DataTypes.ENUM("active", "suspended", "quitted", "fired"),
      allowNull:false,
      defaultValue:"active"
    }
  },{
    timestamps:false
  });
};