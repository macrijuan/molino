const errors={
    spaces:{
        first_name: ["Don't type spaces in the entered first name."],
        last_name: ["Don't type spaces in the entered last name."],
        nickname: [
        "The nickname can't contain spaces",
        "The nickname can only contain lowercase letters, numbers, dots and low dashes."
        ],
        password: ["The password can't contain spaces."],
        email: ["Email can't contain spaces."]
    },
    notFound:"User not found.",
    notUpdated:{
        "error":"User not updated. There was an error."
    },
};

const okData = {
    
};

module.exports = {
    errors,
    okData
};