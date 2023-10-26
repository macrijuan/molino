const obj = {};
const t = "['hola']";
const p = eval(t);

obj.test = p;

console.log(typeof obj.test);