const {wrongDataType, wrongLengthBetween, wrongLengthBetweenArr, wrongCharType, isMandatory} = require("../../error");

//nameValidator --> name=string, errors=arr. || fills errors.name with error messeges if format not allowed.
function nameValidator(name, errors){
  errors.name=[];
  if(!name){errors.name.push(isMandatory("name"));return;};
  if(typeof name !== "string") {errors.name=[wrongDataType]; return;};
  if(name.length>30 || name.length<3)  {errors.name=[wrongLengthBetween("name", 3, 30)];};
  if(!errors.name.length)delete errors.name;
};

//ingredientsValidator --> ingrs=array, errors=arr. || fills errors.ingredients with error messeges if format not allowed.
function ingredientsValidator(ingrs, errors){
  errors.ingredients=[];
  if(!Array.isArray(ingrs)) {errors.ingredients.push(wrongDataType); return;};
  if(!ingrs.length) errors.ingredients.push(emptyData("dish", "ingredient"));
  let a = 0;
  while(a<ingrs.length){
    if(typeof ingrs[a] !== "string") {errors.ingredients = [wrongDataType]; return;};
    if(ingrs[a].length>30 || ingrs[a].length<2) errors.ingredients.push(wrongLengthBetweenArr("ingredient", 2, 30, ingrs[a]));
    if(!(/^.[a-zà-ÿ ]{2,30}$/.test(ingrs[a]))) errors.ingredients.push(wrongCharType("ingredient", "letters and spaces", ingrs[a]));
    a++;
  };
  if(!errors.ingredients.length)delete errors.ingredients;
};

//dietsValidator --> diets=array, errors=arr. || fills errors.diets with error messeges if format not allowed.
function dietsValidator(diets, errors){
  errors.diets=[];
  if(!Array.isArray(diets)) {errors.diets.push(wrongDataType); return;};
  if(!diets.length)errors.diets.push(emptyData("dish", "diet"));
  let a = 0;
  while(a<diets.length){
    if(typeof diets[a] !== "string")  {errors.diets.push(wrongDataType); return};
    if(diets[a].length>30 || diets[a].length<2) errors.diets.push(wrongLengthBetweenArr("diet", 2, 30, diets[a]));
    if(!(/^.[a-zà-ÿ]{2,30}$/.test(diets[a]))) errors.diets.push(wrongCharType("diet", "letters", diets[a]));
    a++;
  };
  if(!errors.diets.length)delete errors.diets;
};

//descriptionValidator --> desc=string, errors=arr. || fills errors.description with error messeges if format not allowed.
function descriptionValidator(desc, errors){
  errors.description=[];
  if(typeof desc !== "string") {errors.description.push(wrongDataType); return;};
  if(desc.length>500) errors.description.push("The description is too long. 500 character maximum.");
  if(!errors.description.length)delete errors.description;
};

//imageValidator --> image=string, errors=arr. || fills errors.image with error messeges if format not allowed.
function imageValidator(image, errors){
  errors.image=[];
  if(typeof image !== "string") {errors.image.push(wrongDataType); return;};
  if(image.length>10000)errors.image.push("The length of the image's path (link) is too long.");
  if(!errors.image.length)delete errors.image;
};

module.exports={
  nameValidator,
  ingredientsValidator,
  dietsValidator,
  descriptionValidator,
  imageValidator
};