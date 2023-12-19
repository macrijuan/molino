/* eslint-disable import/no-extraneous-dependencies */
const session = require('supertest');
const app = require('../../../../src/app.js');
const { User, conn } = require('../../../../src/db.js');
const agent = session(app);
const recivedData = require("./recivedData.js");
const sentData = require("./sentData.js");


describe('/POST USER', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(async() => {
    await User.sync({ force: true });
    console.log("_____________________________________________________");
  });
    it('Get the 400 HTTP code and a error message.', done=>{
      agent.post('/public/user/post_user').send(sentData.wrongUserSignIn)
      .expect(400, recivedData.errors.all_names)
      .end((err,res)=>{
        if(err){
          done(new Error(err))
        }else{
          done();
        };
      });
    });
  it("When the user is posted succesfully, 200 HTTP code and the user data is returned.",(done)=>{
    agent.post('/public/user/post_user').send(sentData.userSignIn)
    .expect(200,recivedData.okData.postedUserData)
    .end((err,res)=>{
      if(err){
        done(new Error(err))
      }else{
        done();
      };
    });
  });
});