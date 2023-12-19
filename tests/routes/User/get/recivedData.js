const errors={
  notFound:{error:"User/s not found"}
};

const oKData = {
  gettedUsersData:[
      {
        email: 'email1@example.com',
        nickname: 'example',
        first_name: [ 'EXAMPLE' ],
        last_name: [ 'EXAMPLE' ],
        user_type: 'Visitor'
      },
      {
        email: 'email2@example.com',
        nickname: 'example2',
        first_name: [ 'EXAMPLE', 'EXAMPLE' ],
        last_name: [ 'EXAMPLE' ],
        user_type: 'Nutritionist'
      }
  ]
};

module.exports={
    errors,
    oKData
};