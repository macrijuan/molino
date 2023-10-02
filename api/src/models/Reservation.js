const {timeValidator}=require("../models_validations");
const {STRING, INTEGER, UUID, UUIDV4, TIME, BOOLEAN, DATE, ENUM, DATEONLY, ARRAY}=require("sequelize");
const { dateValidator } = require("../routes/Public/Reservation/validation");
module.exports= (sequelize)=>{
  sequelize.define("reservation",{
    ticket:{
      // type:UUID,
      type:INTEGER,
      autoIncrement:true,
      primaryKey:true,
      allowNull: false,
      // defaultValue:UUIDV4
    },
    date:{
      type: DATE,
      allowNull:false
    },
    day:{
      type: DATEONLY,
      get(){
        return this.date.toISOString().split("T")[0];
      }
    },
    time: {
      type: TIME,
      get(){
        return `${this.date.getHours()}:${this.date.getMinutes()}`
      }
    },
    meridiem_time:{
      type: ENUM("am", "pm"),
      get(){
        if(this.date.getHours()<12){return "am"}else{return "pm"};
      },
    },
    expired:{
      type: BOOLEAN,
      defaultValue:false,
      allowNull:false
    },
    deletion_code:{
      type: INTEGER,
    }
  },
  {
    timestamps:false
  });
};