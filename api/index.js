const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { User, Admin, Dish, Diet, Inventory, Reservation, Table, Option }=require("./src/db");//
// const models = require("./src/db");

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

const date = new Date();
date.setDate(date.getDate()+1);
const tomorrow = date.toISOString().split("T")[0];

const setForce = true;
// const setForce = false;

conn.sync({ force: setForce }).then(async() => {
  if(setForce){

    async function modelArrDataGetter(model, data){
      return model.findAll({attributes:[data]})
      .then((res)=>{
        // console.log(res);
        return res.map(e=>e.name);
      });
    };
    
    [
      {name:"vegan", description:"non-animal-product dish"},
      {name:"omnivorous", description:"no-restriction dish"},
      {name:"vegetarian", description:"no-meat dish"}
    ].forEach(async data=>{
      Diet.create(data).then(async diet=>{
        Option.findOne({ where:{ model:"Diet" } }).then(async opt=>{
          diet.setOption(opt).then(()=>null);
        });
      });
    });

    [
      {
        "model":"Dishes", 
        "updatable": {
          "name": "string",
          "ingredients": "array",
          "description": "string",
          "image": "string",
          "taste": [
            "salty",
            "sweet",
            "sour",
            "bittersweet",
            "bitter",
            "spicy"
          ],
          "price": "string",
          "available": "string"
          },
        "deleteable": true
      },
      {
        "model":"Admins",
        "updatable": {
          "status": [
            "active",
            "suspended",
            "quitted",
            "fired"
          ]
        }
      },
      {
        
        "model":"Diets",
        "updatable": {
          "name": "string",
          "description": "string"
        },
        "deleteable": true
      },
      {
        "model":"Inventory",
        "updatable": {
          "name": "string",
          "quantity": "string",
          "unit": [
            "Kg",
            "g",
            "oz",
            "ton",
            "lb",
            "u"
          ],
          "class": [
            "Vegetal",
            "Animal",
            "Mixed",
            "Furniture",
            "Tableware",
            "Dinner set",
            "Other"
          ]
        },
        "deleteable": true
      },
      {
        "model":"Tables",
        "updatable": {
          "name": "string",
          "sits": "string",
          "sector": [
            "A",
            "I",
            "F",
            "VIP"
          ]
        },
        "deleteable": true
      }
    ].forEach(async opt=>{
      await Option.create(opt);
    });

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

    [
      {email:"superAdmin@example.com", password:"1adminPassword!", first_name:"JUAN ANDRÉS", last_name:"MACRI IBAÑEZ"},
      {email:"admin0@example.com", password:"1adminbassicPassword!", first_name:"PEPE", last_name:"ARGENTO"},
      {email:"admin1@example.com", password:"2adminbassicPassword!", first_name:"HOMER J.", last_name:"SIMPSON"},
      {email:"admin2@example.com", password:"3adminbassicPassword!", first_name:"EL PAJARO", last_name:"LOCO"},
      {email:"admin3@example.com", password:"4adminbassicPassword!", first_name:"MICKEY", last_name:"MOUSE"},
      {email:"admin4@example.com", password:"5adminbassicPassword!", first_name:"WINNIE", last_name:"POOH"},
    ].forEach(async admin=>{
      Admin.create(admin)
      .then(async _admin=>{
        Option.findOne({where:{model:"Admin"}})
        .then(async option=>{
          _admin.setOption(option);
        });
      });
    });


    [
      {price:123, name:"French toast", ingredients:["bread", "blueberry", "strawberry", "honey", "cream cheese", "sunflower seeds"], diets:["omnivorous", "vegetarian"], description:"This dish is an excellent choice for those who want a healthy but delicious sweet meal.", image:"image", taste:"sweet"},
      {price:456, name:"Avocado toast", ingredients:["bread", "avocado", "olive oil", "red pepper", "cream cheese", "chia seeds", "purple onion", "lemon juice"], diets:["omnivorous", "vegetarian"], description:"This dish is an excellent choice for those who want a healthy meal with nutritive fats.", image:"image", taste:"salty"},
      {price:789, name:"Fruit salad", ingredients:["tangerine", "kiwi", "strawbery", "banana", "plum", "orange juice", "lemon juice"], diets:["vegan", "vegetarian", "omnivorous"], description:"", image:"image2", taste:"sour"},
      {price:321, name:"Special stake", ingredients:["rib eye", "cumin", "hot pepper", "garlic", "lemon juice", "butter", "potato"], diets:["omnivorous"], description:"", image:"image3", taste:"salty"},
      {price:654, name:"Scrambled egg", ingredients:["egg", "onion", "lentils", "tomato", "olive oil", "bread", "oregano", "rice"], diets:["vegetarian", "omnivorous"], description:"", image:"image4", taste:"salty"},
      {price:987, name:"Chickpea stew", ingredients:["chickpea", "olive oil", "onion", "carrot", "garilc", "tomato", "creamy cheese", "thyme"], diets:["omnivorous", "vegetarian"], description:"", image:"image5", taste:"salty"}
    ].forEach(async dish=>{
      Dish.create(dish)
      .then(async _dish=>{
        dish.diets.forEach(async diet=>{
          Diet.findOne({
            where:{name:diet}
          }).then(_diet=>{
            _dish.addDiet(_diet);
          });
        });
        Option.findOne({where:{model:"Dish"}})
        .then(async opt=>{
          await _dish.setOption(opt);
        });
      });
    });
    

    [
      {name:"French Lettuce", quantity:30, unit:"Kg", class:"Vegetal"},
      {name:"Butter Lettuce", quantity:30, unit:"Kg", class:"Vegetal"},
      {name:"Tomate perita", quantity:30, unit:"Kg", class:"Vegetal"},
      {name:"Tomate redondo", quantity:30, unit:"Kg", class:"Vegetal"},
      {name:"Egg", quantity:50, unit:"Kg", class:"Animal"},
      {name:"Bread", quantity:50, unit:"Kg", class:"Mixed"},
      {name:"Stand set", quantity:5, unit:"u", class:"Furniture"},
      {name:"Forks", quantity:100, unit:"u", class:"Tableware"},
      {name:"Span", quantity:100, unit:"u", class:"Dinner set"},
      {name:"Christmas garland", quantity:10, unit:"u", class:"Other"},
    ].forEach(async inventory=>{
      await Inventory.create(inventory)
      .then(async inv=>{
        Option.findOne({where:{model:"Inventory"}})
        .then(async opt=>{
          await inv.setOption(opt);
        });
      });  
    });

    [
      {table:{name:"123", sits:2, sector:"A"},reservation:{tableId:1, userId:1, date:`${tomorrow} 10:00`},},
      {table:{name:"132", sits:2, sector:"A"},reservation:{tableId:2, userId:2, date:`${tomorrow} 10:00`},},
      {table:{name:"213", sits:4, sector:"F"},reservation:{tableId:3, userId:3, date:`${tomorrow} 11:00`},},
      {table:{name:"231", sits:6, sector:"I"},reservation:{tableId:4, userId:2, date:`${tomorrow} 11:15`},},
      {table:{name:"312", sits:6, sector:"I"},reservation:{tableId:5, userId:3, date:`${tomorrow} 12:15`},},
      {table:{name:"321", sits:4, sector:"F"},reservation:{tableId:6, userId:2, date:`${tomorrow} 13:50`},}
    ].forEach(async e=>{
      Table.create(e.table).then(async (table)=>{
        await Reservation.create(e.reservation);
        await Option.findOne({where:{model:"Table"}}).then(async opt=>{ await table.setOption(opt); });
      });
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
    console.log(date.getHours()+":"+date.getMinutes());
    console.log('__________________________________');
  });
});