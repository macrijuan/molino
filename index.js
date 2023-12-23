const server = require('./src/app.js');
const router = server.Router();
const serverless = require("serverless-http");
const { conn } = require('./src/db.js');
const { User, Admin, Dish, Diet, Inventory, Reservation, Table, Option }=require('./src/db');

// async function deleteReservations(){
//   try{
//     Reservation.destroy({where:{expired:true}})
//     .then(()=>{
//       console.log('Expired reservations deleted.');
//       // resrs.destroy({force:true})
//       // .then(()=>{clearInterval(reservationsDeleter)})
//       //// UNCOMMENT LINE ABOVE TO STOP THE TIMER AT 24:00:00 OF TODAY.
//     });
//   }catch(err){
//     console.log(err);
//     throw new Error('There   was an error while deleting the expired reservations');
//   };
// };

function fromDataType (Model, data={}){
  Object.keys(Model.rawAttributes).forEach(prop=>{
    if(!['deletion_code', 'tableId', 'userId', 'reservationTicket'].includes(prop)){
      switch(Model.tableAttributes[prop].type.constructor.key){
        case 'INTEGER': data[prop]='number';break;
        case 'BOOLEAN': data[prop]=['true', 'false'];break;
        case 'ENUM': data[prop]=Model.tableAttributes[prop].values;break;
        case 'ARRAY': data[prop]='array';break;
        case 'TIME': data[prop]='time';break;
        default: data[prop]='string';
      };
    };
  });
  return data;
};

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate()+1;

async function reFillDB(reBuild){
  if(reBuild){
    try{
      Option.findAndCountAll({limit:2, offset:0}).then(async opts=>{
        if(opts && !opts.rows.length){
          console.log("MODEL 'options' re-built");
          [
            {
              'model':'Dishes', 
              'gettable':{ ...fromDataType(Dish), diets:'array' },
              'updatable': {
                'name': 'string',
                'ingredients': 'array',
                'description': 'string',
                'image': 'string',
                'taste': [
                  'salty',
                  'sweet',
                  'sour',
                  'bittersweet',
                  'bitter',
                  'spicy'
                ],
                'diets':'array',
                'price': 'number',
                'available': ['true', 'false']
              },
              'deleteable': true
            },
            {
              'model':'Admins',
              'gettable':fromDataType(Admin),
              'updatable': {
                'status': [
                  'active',
                  'suspended',
                  'quitted',
                  'fired'
                ]
              }
            },
            {
              'model':'Diets',
              'gettable':fromDataType(Diet),
              'updatable': {
                'name': 'string',
                'description': 'string'
              },
              'deleteable': true
            },
            {
              'model':'Inventories',
              'gettable':fromDataType(Inventory),
              'updatable': {
                'name': 'string',
                'quantity': 'number',
                'unit': [
                  'kg',
                  'g',
                  'oz',
                  'ton',
                  'lb',
                  'u'
                ],
                'class': [
                  'vegetal',
                  'animal',
                  'mixed',
                  'furniture',
                  'tableware',
                  'dinner set',
                  'other'
                ]
              },
              'deleteable': true
            },
            {
              'model':'Tables',
              'gettable':fromDataType(Table),
              'updatable': {
                'name': 'string',
                'sits': 'number',
                'sector': [
                  'A',
                  'I',
                  'F',
                  'VIP'
                ]
              },
              'deleteable': true
            }
            ,{
              'model':'Reservations',
              'gettable':fromDataType(Reservation)
            }
          ].forEach(async opt=>{
            await Option.create(opt);
          });
        };
      });
    
      Diet.findAndCountAll({limit:2, offset:0}).then(async diets=>{
        if(diets && !diets.rows.length){
          console.log("MODEL 'diets' re-built");
          [
            {name:'vegan', description:'non-animal-product dish'},
            {name:'omnivorous', description:'no-restriction dish'},
            {name:'vegetarian', description:'no-meat dish'}
          ].forEach(async data=>{
            await Diet.create(data);
          });
        };
      });
      
      User.findAndCountAll({offset:0,limit:2}).then(users=>{
        if(!users||!users.rows.length){
          console.log("MODEL 'users' re-built");
          [
            {email:'email1@example.com', password:'Password1!', first_name:'JUAN ANDRÉS', last_name:'MACRI IBAÑEZ'},
            {email:'email2@example.com', password:'Password2$', first_name:'PEDRO', last_name:'GUTIERREZ'},
            {email:'email3@example.com', password:'Password3@', first_name:'CARLOS', last_name:'FERRO'}
          ].forEach(async userData=>{
            await User.create(userData);
          });
        };
      });
  
      Admin.findAndCountAll({limit:2, offset:0}).then(async admins=>{
        if(admins && !admins.rows.length){
          console.log("MODEL 'admins' re-built");
          [
            {email:'superAdmin@example.com', password:'1adminPassword!', first_name:'juan andrés', last_name:'macri ibañez'},
            {email:'admin0@example.com', password:'1adminbassicPassword!', first_name:'pepe', last_name:'argento'},
            {email:'admin1@example.com', password:'2adminbassicPassword!', first_name:'homer j.', last_name:'simpson'},
            {email:'admin2@example.com', password:'3adminbassicPassword!', first_name:'el pajaro', last_name:'loco'},
            {email:'admin3@example.com', password:'4adminbassicPassword!', first_name:'mickey', last_name:'mouse'},
            {email:'admin4@example.com', password:'5adminbassicPassword!', first_name:'winnie', last_name:'pooh'},
          ].forEach(async admin=>{
            await Admin.create(admin);
          });
        };
      });
  
      Dish.findAndCountAll({limit:2, offset:0}).then(async dishes=>{
        if(dishes && !dishes.rows.length){
          console.log("MODEL 'dishes' re-built");
          [                                                                                                                                //
            {price:123, name:'French toast', ingredients:['bread', 'blueberry', 'strawberry', 'honey', 'cream cheese', 'sunflower seeds'], diets:['omnivorous', 'vegetarian'], description:'This dish is an excellent choice for those who want a healthy but delicious sweet meal.', image:'image', taste:'sweet'},
            {price:456, name:'Avocado toast', ingredients:['bread', 'avocado', 'olive oil', 'red pepper', 'cream cheese', 'chia seeds', 'purple onion', 'lemon juice'], diets:['omnivorous', 'vegetarian'], description:'This dish is an excellent choice for those who want a healthy meal with nutritive fats.', image:'image', taste:'salty'},
            {price:789, name:'Fruit salad', ingredients:['tangerine', 'kiwi', 'strawbery', 'banana', 'plum', 'orange juice', 'lemon juice'], diets:['vegan', 'vegetarian', 'omnivorous'], description:'', image:'image2', taste:'sour'},
            {price:321, name:'Special stake', ingredients:['rib eye', 'cumin', 'hot pepper', 'garlic', 'lemon juice', 'butter', 'potato'], diets:['omnivorous'], description:'', image:'image3', taste:'salty'},
            {price:654, name:'Scrambled egg', ingredients:['egg', 'onion', 'lentils', 'tomato', 'olive oil', 'bread', 'oregano', 'rice'], diets:['vegetarian', 'omnivorous'], description:'', image:'image4', taste:'salty'},
            {price:987, name:'Chickpea stew', ingredients:['chickpea', 'olive oil', 'onion', 'carrot', 'garilc', 'tomato', 'creamy cheese', 'thyme'], diets:['omnivorous', 'vegetarian'], description:'', image:'image5', taste:'salty'}
          ].forEach(async dish=>{
            Dish.create(dish)
            .then(async _dish=>{
              for(const diet of dish.diets){
                Diet.findOne({
                  where:{name:diet}
                }).then(async _diet=>{
                  await _dish.addDiet(_diet);
                });
              };
            });
          });
        };
      });
      
      Inventory.findAndCountAll({limit:2, offset:0}).then(async items=>{
        if(items && !items.rows.length){
          console.log("MODEL 'inventories' re-built");
          [
            {name:'French Lettuce', quantity:30, unit:'kg', class:'vegetal'},
            {name:'Butter Lettuce', quantity:30, unit:'kg', class:'vegetal'},
            {name:'Tomate perita', quantity:30, unit:'kg', class:'vegetal'},
            {name:'Tomate redondo', quantity:30, unit:'kg', class:'vegetal'},
            {name:'Egg', quantity:50, unit:'kg', class:'animal'},
            {name:'Bread', quantity:50, unit:'kg', class:'mixed'},
            {name:'Stand set', quantity:5, unit:'u', class:'furniture'},
            {name:'Forks', quantity:100, unit:'u', class:'tableware'},
            {name:'Span', quantity:100, unit:'u', class:'dinner set'},
            {name:'Christmas garland', quantity:10, unit:'u', class:'other'},
          ].forEach(async inventory=>{
            await Inventory.create(inventory)
          });
        };
      });

  
      Table.findAndCountAll({limit:2, offset:0}).then(async tables=>{
        if(tables && !tables.rows.length){
          console.log("MODEL 'reservations' re-built");
          [
            {table:{name:'123', sits:2, sector:'A'},reservation:{tableId:1, userId:1, year, month, day, time:'10:00'}},
            {table:{name:'132', sits:2, sector:'I'},reservation:{tableId:2, userId:2, year, month, day, time:'11:00'}},
            {table:{name:'213', sits:2, sector:'F'},reservation:{tableId:3, userId:3, year, month, day, time:'12:00'}},
            {table:{name:'231', sits:2, sector:'VIP'},reservation:{tableId:4, userId:3, year, month, day, time:'13:00'}},
            {table:{name:'312', sits:2, sector:'A'},reservation:{tableId:4, userId:2, year, month, day, time:'14:00'}},
            {table:{name:'321', sits:2, sector:'I'},reservation:{tableId:3, userId:1, year, month, day, time:'15:00'}},
            {table:{name:'456', sits:2, sector:'F'},reservation:{tableId:2, userId:1, year, month, day, time:'16:00'}},
            {table:{name:'465', sits:2, sector:'VIP'},reservation:{tableId:1, userId:2, year, month, day, time:'17:00'}},
            {table:{name:'546', sits:2, sector:'A'},reservation:{tableId:1, userId:3, year, month, day, time:'18:00'}},
            {table:{name:'564', sits:2, sector:'I'},reservation:{tableId:2, userId:3, year, month, day, time:'19:00'}},
            {table:{name:'645', sits:2, sector:'F'},reservation:{tableId:3, userId:2, year, month, day, time:'20:00'}},
            {table:{name:'654', sits:2, sector:'VIP'},reservation:{tableId:4, userId:1, year, month, day, time:'21:00'}},
          ].forEach(async e=>{
            Table.create(e.table).then(async ()=>{
              await Reservation.create(e.reservation);
            });
          });
        };
      });
    }catch(err){
      console.log(err);
    };
  };
};

if(process.env.ENVIORMENT==="live"){
  conn.authenticate().then(async() => {
    //set reFillDB argument true to fill database if there's missing info.
    //REMEMBER TO RESTART users_id_seq, tables_id_seq and reservations_id_seq or it wil fail re-built.
    //ALTER SEQUENCE name_<constrain>_seq RESTART;
    reFillDB(true).then(()=>{
      server.listen(3001, () => {
        // const closeTime = new Date();
        // closeTime.setHours(21);
        // setTimeout(()=>{
        //   console.log('Deleter clock for expired reservations activaded.');
        //   const reservationsDeleter = setInterval(async ()=>{
        //     await deleteReservations();
        //   }, 86400000);
        // },closeTime.getTime()-Date.now());
        console.log('listening at port 3001'); // eslint-disable-line no-console
        console.log('__________________________________');
        console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
        console.log('__________________________________');
      });
    });
  }).catch(err=>{console.log(err)});
}else{
  // const setForce = true;
  const setForce = false;
  conn.sync({ force: setForce }).then(async() => {
    reFillDB(setForce).then(()=>{
      server.listen(3001, () => {
        // const closeTime = new Date();
        // closeTime.setHours(21);
        // setTimeout(()=>{
        //   console.log('Deleter clock for expired reservations activaded.');
        //   const reservationsDeleter = setInterval(async ()=>{
        //     await deleteReservations();
        //   }, 86400000);
        // },closeTime.getTime()-Date.now());
        console.log('listening at port 3001'); // eslint-disable-line no-console
        console.log('__________________________________');
        console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
        console.log('__________________________________');
      });
    });
  }).catch(err=>{console.log(err)});
};

module.exports.handler = serverless(server);