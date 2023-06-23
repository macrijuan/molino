/* eslint-disable import/no-extraneous-dependencies */
const session = require('supertest');
const app = require('../../../../src/app.js');
const { User, conn } = require('../../../../src/db.js');
const agent = session(app);
const sentData = require("./sentData.js");
const recivedData = require("./recivedData.js");


describe('/PUT USER', () => {
    before((done) => {
      conn.authenticate()
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      })
      .then(async res=>{
        await User.sync({ force: true }).catch(err=>{done(new Error(err))});
        console.log("_____________________________________________________");
      })
      .then(res=>agent.post('/public/user/post_user').send(sentData.postUser)).catch(err=>{done(new Error(err))})
      .then(res=>{if(res)done()})
    });
    it("Get update users's data when User table contains rows",(done)=>{
      agent.get('/public/user/get_users').expect(recivedData.okData).end((err,res)=>{
        if(err){
          done(new Error(err));
        }else{
          done();
        };
      });
    });
    it(`Get 404 HTTP code and error message when user's table is empty.`,done=>{
      User.destroy({truncate:true})
      .then(()=>agent.get('/public/user/put_users').expect(404, recivedData.errors.notFound)).catch(err=>done(new Error(err)))
      .then((res)=>{if(res)done();});
    });
  });