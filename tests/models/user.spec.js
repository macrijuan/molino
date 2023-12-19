const { User, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('User model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(async () => await User.sync({ force: true }));
  describe('Validations', () => {
    it('should throw an error if any data is null', (done) => {
      User.create({
        nickname:"example",
        password:"PassWord1!",
        email:"email0@example.com",
        //first_name:null
        last_name:["EXAMPLE"],
        user_type:"Visitor"
      })
      .then(() => done(new Error('It requires a valid first_name')))
      .catch(() => done());
    });
    it('should work when data is valid', (done) => {
      User.create({
        nickname:"example",
        password:"PassWord1!",
        email:"email0@example.com",
        first_name:["EXAMPLENAME"],
        last_name:["EXAMPLESURNAME"],
        user_type:"Visitor"
      })
      .then(() => done())
      .catch(() => done(new Error('Something went wrong.')));
    });
  });
});
