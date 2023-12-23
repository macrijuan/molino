const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { Console } = require('console');
require("dotenv").config();
const {
  LOCAL_DB_USER, LOCAL_DB_PASSWORD, LOCAL_DB_HOST, LOCAL_DB_NAME, 
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME,
  ENVIORMENT
}=process.env;

console.log( "enviorment:", ENVIORMENT );

let sequelize = ENVIORMENT === "live"
? new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false,//set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
})
: new Sequelize(`postgres://${LOCAL_DB_USER}:${LOCAL_DB_PASSWORD}@${LOCAL_DB_HOST}/${LOCAL_DB_NAME}`, {
  logging: false, //set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs
.readdirSync(path.join(__dirname, '/models'))
.filter((file) => (
  file.indexOf('.') !== 0) &&
  (file !== basename) &&
  (file.slice(-3) === '.js')
)
.forEach((file) => {
  modelDefiners.push(require(path.join(__dirname, '/models', file)));
});


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Diet, Dish, User, Reservation, Table } = sequelize.models;

Reservation.hasOne( User );


User.hasMany( Reservation );
Table.hasMany( Reservation );


Reservation.hasOne( Table, { foreignKey:"ticket reserve", as:"ticket reserve" } );


Diet.belongsToMany( Dish, { through:"dish_diets", timestamps:false } );
Dish.belongsToMany( Diet, { through:"dish_diets", timestamps:false } );

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};