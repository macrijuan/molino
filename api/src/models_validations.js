function arrayValidator(array, dataName, minLen, maxLen){
  console.log("hola");
	if(!array.length){throw new Error(`${dataName}'s array must contain at least one element.`);};
	let a = 0;
	while(a<array.length){
		if(typeof array[a] !== "string") {throw new Error(`The array can only have strings`);};
		if(array[a].length>30 || array[a].length<2) {throw new Error(`Array elements must contain between ${minLen} and ${maxLen} characters. Index: ${a}`);};
		if(!(/^.[a-zà-ÿ ]{2,30}$/.test(array[a]))) {throw new Error(`Array elements can only contain lowercase letters and spaces. Index's failed element: ${a}`);};
		a++;
	};
};

function dateValidatror (date){
	if(!Object.prototype.toString.call(date))throw new Error("Wrong data type. Data is not a date object.");
	if(Date.now()>date)throw new Error("Can't post a passed date.");
	if((date.getTime()-Date.now())>2147483647) throw new Error ("Date is too far from today's one. (28 days max).");
}

module.exports={
	arrayValidator,
	dateValidatror
};