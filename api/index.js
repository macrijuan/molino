const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {User, Admin, Dish, Diet, Inventory, Reservation, Table}=require("./src/db");

async function deleteReservations(){
  try{
    Reservation.destroy({where:{expired:true}})
    .then(()=>{
      console.log("Expired reservations deleted.");
      // resrs.destroy({force:true})
      // .then(()=>{clearInterval(reservationsDeleter)})
      //// UNCOMMENT LINE ABOVE TO STOP THE TIMER AT 24:00:00 OF TODAY.
    });
  }catch(err){
    console.log(err);
    throw new Error("There   was an error while deleting the expired reservations");
  };
};

const setForce = true;
// const setForce = false;

conn.sync({ force: setForce }).then(async() => {
  if(setForce){
    User.findAndCountAll({offset:0,limit:2})
    .then(users=>{
      if(!users||!users.rows.length){
        [
          {email:"email1@example.com", password:"Password1!", first_name:"JUAN ANDRÉS", last_name:"MACRI IBAÑEZ"},
          {email:"email2@example.com", password:"Password2$", first_name:"PEDRO", last_name:"GUTIERREZ"},
          {email:"email3@example.com", password:"Password3@", first_name:"CARLOS", last_name:"FERRO"}
        ].forEach(async userData=>{
          await User.create(userData);
        });
      };
    });

    await Admin.bulkCreate([
      {email:"superAdmin@example.com", password:"1adminPassword!", first_name:"JUAN ANDRÉS", last_name:"MACRI IBAÑEZ"},
      {email:"admin0@example.com", password:"1adminbassicPassword!", first_name:"PEPE", last_name:"ARGENTO"},
      {email:"admin1@example.com", password:"2adminbassicPassword!", first_name:"HOMER J.", last_name:"SIMPSON"},
      {email:"admin2@example.com", password:"3adminbassicPassword!", first_name:"EL PAJARO", last_name:"LOCO"},
      {email:"admin3@example.com", password:"4adminbassicPassword!", first_name:"MICKEY", last_name:"MOUSE"},
      {email:"admin4@example.com", password:"5adminbassicPassword!", first_name:"WINNIE", last_name:"POOH"},
    ]);

    await Dish.bulkCreate([
      {name:"French toast", ingredients:["bread", "blueberry", "strawberry", "honey", "cream cheese", "sunflower seeds"], diets:["omnivorous", "vegetarian"], description:"This dish is an excellent choice for those who want a healthy but delicious sweet meal.", image:"image", taste:"sweet"},
      {name:"Avocado toast", ingredients:["bread", "avocado", "olive oil", "red pepper", "cream cheese", "chia seeds", "purple onion", "lemon juice"], diets:["omnivorous", "vegetarian"], description:"This dish is an excellent choice for those who want a healthy meal with nutritive fats.", image:"image", taste:"salty"},
      {name:"Fruit salad", ingredients:["tangerine", "kiwi", "strawbery", "banana", "plum", "orange juice", "lemon juice"], diets:["vegan", "vegetarian", "omnivorous"], description:"", image:"image2", taste:"sour"},
      {name:"Special stake", ingredients:["rib eye", "cumin", "hot pepper", "garlic", "lemon juice", "butter", "potato"], diets:["omnivorous"], description:"", image:"image3", taste:"salty"},
      {name:"Scrambled egg", ingredients:["egg", "onion", "lentils", "tomato", "olive oil", "bread", "oregano", "rice"], diets:["vegetarian", "omnivorous"], description:"", image:"image4", taste:"salty"},
      {name:"Chickpea stew", ingredients:["chickpea", "olive oil", "onion", "carrot", "garilc", "tomato", "creamy cheese", "thyme"], diets:["omnivorous", "vegetarian"], description:"", image:"image5", taste:"salty"}
    ]);
    
    await Diet.bulkCreate([
      {name:"vegan", description:"non-animal-product dish"},
      {name:"omnivorous", description:"no-restriction dish"},
      {name:"vegetarian", description:"no-meat dish"}
    ]);

    await Inventory.bulkCreate([
      {name:"French Lettuce", quantity:30, unit:"Kg", class:"Vegetable"},
      {name:"Butter Lettuce", quantity:30, unit:"Kg", class:"Vegetable"},
      {name:"Tomate perita", quantity:30, unit:"Kg", class:"Vegetable"},
      {name:"Tomate redondo", quantity:30, unit:"Kg", class:"Vegetable"},
      {name:"Egg", quantity:50, unit:"Kg", class:"Animal"},
      {name:"Bread", quantity:50, unit:"Kg", class:"Mixed"},
      {name:"Stand set", quantity:5, unit:"u", class:"Furniture"},
      {name:"Forks", quantity:100, unit:"u", class:"Tableware"},
      {name:"Span", quantity:100, unit:"u", class:"Dinner set"},
      {name:"Christmas garland", quantity:10, unit:"u", class:"Other"},
    ]);

    const date = new Date();
    date.setDate(date.getDate()+1);
    const tomorrow = date.toISOString().split("T")[0];

    [
      {table:{id:"123", sits:2, sector:"a"},reservation:{tableId:"123", userId:1, date:`${tomorrow} 10:00`},},
      {table:{id:"132", sits:2, sector:"a"},reservation:{tableId:"132", userId:2, date:`${tomorrow} 10:00`},},
      {table:{id:"213", sits:4, sector:"f"},reservation:{tableId:"213", userId:3, date:`${tomorrow} 11:00`},},
      {table:{id:"231", sits:6, sector:"i"},reservation:{tableId:"231", userId:2, date:`${tomorrow} 11:15`},},
      {table:{id:"312", sits:6, sector:"i"},reservation:{tableId:"312", userId:3, date:`${tomorrow} 12:15`},},
      {table:{id:"321", sits:4, sector:"f"},reservation:{tableId:"321", userId:2, date:`${tomorrow} 13:50`},}
    ].forEach(async e=>{
      Table.create(e.table).then(()=>{Reservation.create(e.reservation)});
    });
  };
  server.listen(3001, () => {
    // const closeTime = new Date();
    // closeTime.setHours(21);
    // setTimeout(()=>{
    //   console.log("Deleter clock for expired reservations activaded.");
    //   const reservationsDeleter = setInterval(async ()=>{
    //     await deleteReservations();
    //   }, 86400000);
    // },closeTime.getTime()-Date.now());
    console.log('listening at port 3001'); // eslint-disable-line no-console
    console.log('__________________________________');
    console.log('__________________________________');
  });
});