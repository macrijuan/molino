const errors = {
  userSignIn2:{
    nickname:"example2",
    password:"Example2!",
    email:"email2@example.com",
    first_name:["EXAMPLE", "EXAMPLE"],
    last_name:["EXAMPLE"],
    user_type:"Nutritionist"
  }, 
  wrongUserSignIn:{
    nickname:"user4!",
    password:"PassWord1!",
    email:"email4@example.com",
    first_name:["NOMBR RE"],
    last_name:["APE LLIDO"],
    user_type:"Visitor"
  }
};

const okData = {
  userSignIn: {
    nickname:"example",
    password:"Example1!",
    email:"email1@example.com",
    first_name:["EXAMPLE"],
    last_name:["EXAMPLE"],
    user_type:"Visitor"
  }
};

module.exports = {
  errors,
  okData
};