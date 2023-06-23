const {timeValidator}=require("../models_validations");
const {STRING, INTEGER, UUID, UUIDV4, TIME, BOOLEAN, DATE, ENUM, DATEONLY}=require("sequelize");
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
    table:{
      type: INTEGER,//STRING
      validate:{
        // len:[0,3]
        max:999,
        min:1
      }
    },
    date:{
      type: DATE,
      allowNull:false,
      validate:{
        dateValidation: function(value){dateValidator(value)}
      }
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
    user:{
      type:INTEGER,
      allowNull:false
    },
    expired:{
      type: BOOLEAN,
      defaultValue:false,
      allowNull:false
    },
    deletion_code:{
      type: INTEGER,
      // allowNull:false
    }
  },
  {
    updatedAt:false
  })
};