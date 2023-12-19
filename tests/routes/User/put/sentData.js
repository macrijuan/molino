//DATA USED TO DO POSTS AND UPDATES WHILE TESTING.

const  postUser = {
  nickname:"example",
  password:"Example1!",
  email:"email1@example.com",
  first_name:["EXAMPLE"],
  last_name:["EXAMPLE"],
  user_type:"Visitor"
};

const errors = {
  spacesUpdate:{
    nickname:"examp le2",
    password:"Exam ple2!",
    email:"email2@e xample.com",
    first_name:["EXAMPLE", "EXAM PLE"],
    last_name:["EXA MPLE"],
    user_type:"Nutritionist"
  },
  badPwordUpdate:{
    nickname:"user4",
    password:"PassWord1!",
    email:"email4@example.com",
    first_name:["NOMBRRE"],
    last_name:["APELLIDO"],
    user_type:"Visitor"
  }
};

const okData = {
  okUpdate : {
    nickname:"example",
    password:"Example2!",
    email:"email1@example.com",
    first_name:["EXAMPLE"],
    last_name:["EXAMPLE"],
    user_type:"Visitor"
  }
};

module.exports = {
  postUser,
  errors,
  okData
};