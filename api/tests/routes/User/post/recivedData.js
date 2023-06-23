const  errors={
    first_name: {
        first_name: ["Don't type spaces in the entered first name."]
    },
    last_name: {
        last_name: ["Don't type spaces in the entered last name."]
    },
    nickname: {
        nickname: [
        "The nickname can't contain spaces",
        "The nickname can only contain lowercase letters, numbers, dots and low dashes."
        ]
    },
     password: {
        password: ["The password can't contain spaces."]
    },
     email: {
        email: ["Email can't contain spaces."]
    },
     all_names:{
        first_name: ["Don't type spaces in the entered first name."],
        last_name: ["Don't type spaces in the entered last name."],
        nickname: ["The nickname can only contain lowercase letters, numbers, dots and low dashes."]
    }
};

const okData = {
    postedUserData:{
        banned: false,
        email: 'email1@example.com',
        first_name: ['EXAMPLE'],
        last_name: ['EXAMPLE'],
        nickname: 'example',
        user_type: 'Visitor'
    }
};
 

module.exports={
    errors,
    okData
};