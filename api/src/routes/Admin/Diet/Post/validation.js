function dietNameValidator(name, errors){
	if(typeof name !== "string"){
		errors.name=["Wrong data type."];
	}else{
		if(name.length<3 || name.length>30){errors.name=["The diet's name must contain between 3 and 30 characters."];return;};
	};
};

function dietDescValidator(description, errors){
	if(typeof description !== "string"){
		errors.description=["Wrong data type."];
	}else{
		if(description&&description.length>100){errors.description=["The description can't be longer than 100 characters."];return;};
	};
};

module.exports={
	dietNameValidator,
	dietDescValidator
};