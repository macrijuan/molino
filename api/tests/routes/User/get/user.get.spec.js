/* eslint-disable import/no-extraneous-dependencies */
// const { expect, assert } = require('chai');
const session = require('supertest');
const app = require('../../../../src/app.js');
const { User, conn } = require('../../../../src/db.js');
const agent = session(app);
const GETrecivedData = require("./recivedData.js");
const sentData = require("../post/sentData.js");

function retErr(expected, recived){
  let exp;
  let rec;
  if(expected === NaN){
    exp = "NaN";
  }else if(typeof expected === "string"){
    exp = expected;
  }else{
    exp = JSON.stringify(expected);
  };
  if(recived === NaN){
    rec = "NaN";
  }else if(typeof recived === "string"){
    rec = recived;
  }else{
    rec = JSON.stringify(recived);
  };
  return ("\n"+"Expected: "+exp+"\n"+" Recived: "+rec);
};


describe('/GET USER', () => {
  before((done) => {
    conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
    .then(async res=>{
      await User.sync({ force: true }).catch(err=>{throw new Error(err)});
      console.log("_____________________________________________________");
    })
    .then(res=>agent.post('/public/user/post_user').send(sentData.userSignIn)).catch(err=>{throw new Error(err)})
    .then(res=>agent.post('/public/user/post_user').send(sentData.userSignIn2)).catch(err=>{throw new Error(err)})
    .then(res=>{if(res)done()})
  });
  it("Get users's data when User table contains rows",(done)=>{
    agent.get('/public/user/get_users').expect(GETrecivedData.oKData.gettedUsersData).end((err,res)=>{
      if(err){
        done(new Error(err));
      }else{
        done();
      };
    });
  });
  it(`Get 404 HTTP code and error message when user's table is empty.`,done=>{
    User.destroy({truncate:true})
    .then(()=>agent.get('/public/user/get_users').expect(404, GETrecivedData.errors.notFound)).catch(err=>done(new Error(err)))
    .then((res)=>{if(res)done();});
  });
});