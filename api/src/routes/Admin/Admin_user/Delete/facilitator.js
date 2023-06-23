const {Admin, Admin_deleted}=require("../../../../db");

async function deleteAdmin(pk){
  try{
    Admin_deleted.findOne({
      where:{prev_id:pk}
    })
    .then(async res=>{
      await res.destroy({force:true});
    });
  }catch(err){
    console.log(err);
  };
};

async function setAdminAsDeleted(pk){
  try{
    return Admin.findByPk(pk)
    .then(admin=>{
      if(admin){
        const {id, email, password, first_name, last_name, status}=admin;
        Admin_deleted.create({prev_id:id, email, password, first_name, last_name, status})
        .then(async ()=>{
          await admin.destroy({force:true});
        }).then(()=>{
          let endDay=0;      
          const deletionProcess = setInterval(async()=>{
            if(endDay===0){console.log("Deletion process activated.");};
            if(endDay<14){
              endDay++;
              // console.log(endDay);
            }else{
              deleteAdmin(pk)
              .then(()=>{console.log("Administrator deleted.");clearInterval(deletionProcess);});
            };
          },86400000);//
        });
        return true;
      }else{
        return false;
      };
    });
  }catch(err){
    console.log(err);
    return false;
  };
};

module.exports={
  setAdminAsDeleted,
  deleteAdmin
};