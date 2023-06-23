import {lengthExpansor} from "../../../testFunctions";
var failingData ={
  wrong_datatype:{
    name:{},
    ingredients:"",
    diets:"",
    description:13242,
    image:true
  },
  too_long:{
    name:lengthExpansor(31),
    ingredients:[lengthExpansor(50),lengthExpansor(30)],
    diets:[lengthExpansor(50),"dddddd ddd"],
    description:lengthExpansor(510),
    image:lengthExpansor(10100)
  },
  too_short:{
    name:"a",
    ingredients:["a","a"],
    diets:["2","dddddd ddd"]
  },
  not_allowed_chars:{
    name:"!123@",
    ingredients:["1!'"],
    diets:["1!+'"],
  },
  empty:{
    name:"",
    ingredients:[],
    diets:[]
  }
};

var okData={
  name:"Avocado toast",
  ingredients:["egg", "bread", "tomato", "onion", "pepper", "avocado", "lemon juice", "parsley"],
  diets:["vegetarian","omnivorous"],
  description:"This toas is the my favourite.",
  image:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.thespruceeats.com%2Fthmb%2Fdfa8Uq14SlF33FCAsPbDZVHp9bE%3D%2F1500x0%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2Favocado-toast-4174244-hero-03-d9d005dc633f44889ba5385fe4ebe633.jpg&tbnid=dQCIVSW5a0KyrM&vet=12ahUKEwin3rT2lYz_AhXOqZUCHaJVDUcQMygHegUIARD_AQ..i&imgrefurl=https%3A%2F%2Fwww.thespruceeats.com%2Favocado-toast-4174244&docid=F-GwXNtHXrIjSM&w=1500&h=1000&q=avocado%20toast&ved=2ahUKEwin3rT2lYz_AhXOqZUCHaJVDUcQMygHegUIARD_AQ",
  taste:"salty"
};

export {failingData, okData};