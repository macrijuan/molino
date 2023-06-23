const {wrongNumberSize, isMandatory, wrongDataType}=require("../../error");

function tableValidator (table, errors){
  errors.table = [];
  if(typeof table !== "number"){errors.table.push(wrongDataType);return};
  if(!(table>0 && table<1000)) errors.table.push(wrongNumberSize("Table number", 999, 1));
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
  const enteringDate = new Date(date);
  if(enteringDate.toString()==="Invalid Date"){
    errors.date.push("This is not a valid date.")
  }else if(enteringDate.getTime()<Date.now()){
    errors.date.push("Is not possible to reserve for a passed day.");
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