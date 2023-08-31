const {wrongNumberSize, isMandatory, wrongDataType, wrongLengthBetween}=require("../../error");

function tableValidator (table, errors){
  errors.table = [];
  if(typeof table !== "string"){errors.table.push(wrongDataType);return};
  if(!(table.length<30 && table.length>0)) errors.table.push(wrongLengthBetween("Table ID", 30, 1));
  if(!errors.table.length)delete errors.table;
};

function customersValidator (customers, errors){
  errors.customers = [];
  if(typeof customers !== "number"){errors.customers.push(wrongDataType);return};
  if(!(customers>1&&customers<4)) errors.customers.push(wrongNumberSize("quantity of customers", 1, 4));
  if(!errors.customers.length)delete errors.customers;
};

function dateValidator (date, errors){
  errors.date = [];
  if(typeof date !== "string"){errors.date.push(wrongDataType);return};
  if(!date) errors.date.push(isMandatory("date"));
  const entringDate = new Date(date);
  if(entringDate.toString()==="Invalid Date"){
    errors.date.push("This is not a valid date.")
  }else{
    if(entringDate.getTime()<Date.now()){
      errors.date.push("Is not possible to reserve for a passed day.");
    }else if((entringDate.getTime()-Date.now())>2147483647){
      errors.date.push("Reservations of more than 24 days are not allowed."); 
    };
  };
  if(!errors.date.length)delete errors.date;
};

function userOwnerValidator (user, errors){
  errors.user = [];
  if(!user) errors.user.push(isMandatory("user owner of the ticket"));
  if(!errors.user.length)delete errors.user;
};

module.exports = {
  tableValidator,
  customersValidator,
  dateValidator,
  userOwnerValidator
};