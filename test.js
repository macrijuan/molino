const moment = require("moment")();
const date = new Date();

console.log(parseInt(moment.format("YYYY"))+1);
console.log(date.getFullYear()+1);